<template>
    <ion-page style="z-index: 999;">
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start" @click="navigateAppsBlack()">
                    <ion-icon :ios="chevronBack" :md="arrowBack" style="width: 24px; height: 24px; margin-left: 8px;"
                        color="primary"></ion-icon>
                    <ion-label style="margin-left: 4px; font-size: medium;" color="primary">Back</ion-label>
                </ion-buttons>
                <ion-title style="text-align: center; margin-right: 80px;">Install</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true" color="light">
            <div class="segment-container">
                <ion-segment v-model="activeSegment">
                    <ion-segment-button value="ios">
                        <ion-label>iPhone/iPad</ion-label>
                    </ion-segment-button>
                    <ion-segment-button value="android">
                        <ion-label>Android</ion-label>
                    </ion-segment-button>
                    <ion-segment-button value="desktop">
                        <ion-label>Windows PC/Macbook</ion-label>
                    </ion-segment-button>
                </ion-segment>
                <InstalliOSView v-if="activeSegment === 'ios'"></InstalliOSView>
                <InstallAndroidView v-else-if="activeSegment === 'android'"></InstallAndroidView>
                <InstallDesktopView v-else></InstallDesktopView>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonList, IonPage, IonHeader, IonToolbar, IonButtons, IonIcon, IonLabel, IonTitle, IonSegment, IonSegmentButton } from '@ionic/vue';
import { chevronBack, arrowBack } from 'ionicons/icons';
import { ref } from 'vue';
import InstalliOSView from '@/views/components/install-components/InstalliOSView.vue'
import InstallAndroidView from '@/views/components/install-components/InstallAndroidView.vue'
import InstallDesktopView from '@/views/components/install-components/InstallDesktopView.vue'
import ThemeHelper from '@/utils/ThemeHelper'
import { URL } from '@/utils/Constant';

const activeSegment = ref('ios');

function navigateAppsBlack() {
    window.location.href = URL.APPS_BLACK
}

ThemeHelper.setLightModeInInstallPage()
</script>

<style scoped>
.segment-container {
    margin: 8px;
}
</style>