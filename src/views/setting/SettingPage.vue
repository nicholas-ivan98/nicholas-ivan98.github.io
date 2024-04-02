<template>
    <ion-page style="z-index: 999;">
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start" @click="() => router.back()">
                    <ion-icon :ios="chevronBack" :md="arrowBack" style="width: 24px; height: 24px; margin-left: 8px;"
                        color="primary"></ion-icon>
                    <ion-label style="margin-left: 4px; font-size: medium;" color="primary">Back</ion-label>
                </ion-buttons>
                <ion-title style="text-align: center; margin-right: 80px;">Setting...</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content class="test-swipe" :fullscreen="true" color="light">
            <h4 style="margin-left: 18px;">Account</h4>
            <Account></Account>
            <h4 style="margin-left: 18px; margin-top: 18px;">Appearance</h4>
            <Appearance></Appearance>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { isPlatform, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon, createGesture, useIonRouter } from '@ionic/vue';
import { chevronBack, arrowBack } from 'ionicons/icons';
import Appearance from '@/views/components/setting-components/ApperanceView.vue';
import Account from '@/views/components/setting-components/AccountView.vue';
import { useRouter } from 'vue-router';
import { onMounted, onBeforeUnmount } from 'vue';
// import Hammer from 'hammerjs';

// function setupSwipeBack() {
//     const contentElement = document.querySelector('.a');

//     const hammer = new Hammer(contentElement);
//     hammer.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL });

//     hammer.on('swipe', (event: any) => {
//         if (event.direction === Hammer.DIRECTION_RIGHT) {
//             // Ngăn chặn swipe back khi swipe sang phải
//             event.preventDefault();
//         }
//     });
// }

const router = useRouter()

// function onSwipe(event: any) {
//     // if (event.detail.direction === 'back' && isPlatform('ios')) {
//     //     event.preventDefault();
//     // }
//     event.preventDefault();
// }

// let startX: 0
// let startY: 0

// function handleTouchStart(event: any) {
//     startX = event.touches[0].clientX;
//     startY = event.touches[0].clientY;
// }
// function handleTouchMove(event: any) {
//     // const deltaX = event.touches[0].clientX - startX;
//     // const deltaY = event.touches[0].clientY - startY;

//     // if (Math.abs(deltaX) > Math.abs(deltaY)) {
//     //     router.back()
//     //     event.preventDefault();
//     // }
//     if (window.history && window.history.state) {
//         event.preventDefault();
//     }
// }

// function preventSwipeBack() {
//     window.history.pushState(null, '', window.location.href);
// };

// const handlePopstate = (event: any) => {
//     router.back()
//     event.preventDefault()
// };

onMounted(() => {
    // document.addEventListener('touchstart', handleTouchStart, { passive: false });
    // document.addEventListener('touchmove', handleTouchMove, { passive: false });
    // window.addEventListener('load', () => {
    //     if (window.history && window.history.pushState) {
    //         window.history.pushState(null, '', window.location.href);
    //         window.addEventListener('popstate', preventSwipeBack);
    //     }
    // });
    // router.beforeResolve((to, from, next) => {
    // next(false)
    // })
    // window.addEventListener('popstate', handlePopstate);
    // setupSwipeBack()
    // const contentElement = document.querySelector('.test-swipe');
    // const hammer = new Hammer(contentElement);
    // let startX = 0;
    // let threshold = 100; // Ngưỡng cần vượt qua để xem là swipe thành công

    // hammer.on('panstart', (event: any) => {
    //   startX = event.center.x;
    // });

    // hammer.on('panend', (event: any) => {
    //   const endX = event.center.x;
    //   const deltaX = endX - startX;
    //   if (deltaX > threshold) {
    //     // Xử lý sự kiện swipe thành công (swipe từ trái sang phải)
    //     // router.back()
    //     event.preventDefault()
    //   }
    // });
})

onBeforeUnmount(() => {
    // document.removeEventListener('touchstart', handleTouchStart);
    // document.removeEventListener('touchmove', handleTouchMove);
    // window.removeEventListener('popstate', preventSwipeBack);
    // window.removeEventListener('popstate', handlePopstate)
})
</script>

<style scoped></style>