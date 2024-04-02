<template>
    <ion-list :inset="true">
        <ion-item>
            <ion-label>Dark Mode</ion-label>
            <ion-toggle slot="end" :checked="themeToggle" @ionChange="toggleChange($event)"></ion-toggle>
        </ion-item>
        <ion-item>
            <ion-label @click="openEmail()">Contact support</ion-label>
        </ion-item>
        <ion-item>
            <ion-label @click="openWebsite()">Website</ion-label>
        </ion-item>
        <ion-item>
            <ion-label @click="openTwitter()">Twitter</ion-label>
            <!-- <a :href="URL.TWITTER" target="_blank">Twitter</a> -->
        </ion-item>
    </ion-list>
</template>

<script setup lang="ts">
import { IonContent, IonTitle, IonList, IonItem, IonLabel, IonToggle, ToggleCustomEvent } from '@ionic/vue';
import { ref } from 'vue';
import ThemeHelper from '@/utils/ThemeHelper'
import { URL } from '@/utils/Constant';

const themeToggle = ref(ThemeHelper.isEnableDarkMode());

ThemeHelper.initializeTheme();

function toggleChange(ev: ToggleCustomEvent) {
    ThemeHelper.toggleDarkTheme(ev.detail.checked);
};

function openEmail() {
    // window.location.href = URL.CONTACT_SUPPORT;
    window.open(URL.CONTACT_SUPPORT, '_blank');
}

function openWebsite() {
    // window.location.href = URL.APPS_BLACK;
    window.open(URL.APPS_BLACK, '_blank');
}

function openTwitter() {
    window.open(URL.TWITTER, '_blank');
}

</script>

<style scoped>
ion-label {
    /* font-weight: bold; */
}

ion-content {
    height: 150px;
}
</style>