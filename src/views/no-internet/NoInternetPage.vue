<template>
    <ion-page style="z-index: 999;">
        <ion-content :fullscreen="true">
            <div class="container">
                <div class="label-container">
                    Please check internet connection
                </div>
                <div class="button-container">
                    <ion-button @click="closePage">Try again</ion-button>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonButton, IonPage } from '@ionic/vue';
import { useRouter } from 'vue-router';
import { Network } from '@capacitor/network';
import { PropType, computed } from 'vue';

const props = defineProps({
    callback: {
        type: Function as PropType<() => void>,
        required: false,
        default: undefined
    }
});

async function closePage() {
    const isInternet = await checkInternetConnection()
    if (isInternet && props.callback) {
        props.callback()
    }
}

async function checkInternetConnection() {
    const status = await Network.getStatus();
    if (status.connected) {
        console.log('Device is connected to the internet.');
        return true
    } else {
        console.log('No internet connection found.');
        return false
    }
};
</script>

<style scoped>
.label-container {
    font-size: large;
}

.container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
}

.button-container {
    margin-top: 12px;
}
</style>