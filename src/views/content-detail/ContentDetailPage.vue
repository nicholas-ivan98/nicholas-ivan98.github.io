<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start" @click="() => router.back()">
                    <ion-icon :ios="chevronBack" :md="arrowBack" style="width: 24px; height: 24px; margin-left: 4px;"
                        color="primary"></ion-icon>
                    <ion-label style="margin-left: 4px; font-size: medium;" color="primary">Back</ion-label>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <div class="thumbnail-container">
                <ion-img class="thumbnail-content" :src="content?.thumbnail"></ion-img>
            </div>
            <h4 class="title-content">{{ content?.title }}</h4>
            <div class="reading-button-container">
                <ion-button shape="round" :color="isFavorited ? 'danger' : 'success'" @click="toggleFavorite"
                    v-if="account.apikey">
                    <ion-icon :icon="close" slot="start" v-if="isFavorited"></ion-icon>
                    <ion-icon :icon="heart" slot="start" v-else></ion-icon>
                    <span v-text="isFavorited ? 'Unlike' : 'Like'"></span>
                </ion-button>
                <ion-button shape="round" @click="navigateChapterDetail">Reading</ion-button>
            </div>
            <div class="segment-container">
                <ion-segment value="Detail" class="segment-content" v-model="activeSegment">
                    <ion-segment-button v-for="segment in slides" :key="segment" :value="segment">
                        <ion-label>{{ segment }}</ion-label>
                    </ion-segment-button>
                </ion-segment>
                <DetailView v-if="activeSegment === 'Detail'" :content="content"></DetailView>
                <ChaptersView :content="content" v-else-if="activeSegment === 'Chapters'"></ChaptersView>
            </div>
            <!-- <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div v-for="(slide, index) in slides" :key="index" class="swiper-slide">
                        <DetailView v-if="activeSegment === slides[0]" :content="content"></DetailView>
                        <ChaptersView :content="content" v-else></ChaptersView>
                    </div>
                </div>
                <div class="swiper-pagination"></div>
            </div> -->
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import {
    IonButtons,
    IonContent,
    IonHeader,
    IonPage,
    IonToolbar,
    IonIcon,
    IonButton,
    IonLabel,
    IonSegment,
    IonSegmentButton,
    IonImg,
    onIonViewWillEnter,
    onIonViewWillLeave,
    onIonViewDidLeave
} from '@ionic/vue';
import { heart, close, chevronBack, arrowBack, contract } from 'ionicons/icons';
import { useRoute, useRouter } from 'vue-router';
import { ref, PropType, onMounted, computed, onBeforeUnmount, onBeforeMount, onUnmounted, onActivated } from 'vue';
import Content from '@/models/Content'
import Crypto from '@/utils/Crypto';
import axios from 'axios';
import { URL, app } from '@/utils/Constant';
import Swiper from 'swiper';
import DetailView from '@/views/components/content-detail-components/DetailView.vue'
import ChaptersView from '@/views/components/content-detail-components/ChaptersView.vue'
import { useStore } from 'vuex';

const content = ref<Content>();
const isFavorited = ref(false);
const activeSegment = ref('Chapters');
const store = useStore();
const route = useRoute()
const router = useRouter()
const slides = ['Chapters', 'Detail'];
const account = computed(() => store.getters['account/getAccount'])
const favorite = computed(() => store.getters['favorites/getFavorite'](content.value?.title, content.value?.url, content.value?.thumbnail))
const history = computed(() => store.getters['histories/getHistory'](content.value?.url))
// let startX: 0
// let startY: 0
// let swiperInstance: Swiper;

function setupDataContent(data: any) {
    const contentTemp = content.value
    if (contentTemp) {
        contentTemp.alternative = data.alternative
        contentTemp.author = data.author
        contentTemp.description = data.description
        contentTemp.lastUpdate = data.lastUpdate
        contentTemp.status = data.status
        contentTemp.view = data.view
        contentTemp.chapters = data.chapters
        contentTemp.genres = data.genres.map((item: any) => item.name).join(', ')
        content.value = contentTemp
    }
}

async function fetchContentDetail(url: string) {
    try {
        const response = await axios.post(URL.CONTENT_DETAIL, { url }, { headers: { app } })
        const result = response.data
        // console.log('Content detail: ', result)
        setupDataContent(result.data)
    } catch (err) {
        console.log('Content detail error: ', err)
    }
}

// function onSegmentChange() {
//     const slideIndex = slides.indexOf(activeSegment.value);
//     if (slideIndex !== -1) {
//         swiperInstance.slideTo(slideIndex);
//     }
// };

function navigateChapterDetail() {
    if (content.value) {
        if (content.value.currentChapter === 0) {
            content.value.currentChapter = 1
        }
        store.dispatch('histories/setHistory', content.value)
        const contentEncrypted = Crypto.encrypt(JSON.stringify(content.value))
        router.push({ path: '/reading', query: { content: contentEncrypted } })
    }
}

function toggleFavorite() {
    if (isFavorited.value) {
        removeFavorite()
    } else {
        addFavorite()
    }
}

async function addFavorite() {
    const apikey = account.value.apikey
    try {
        const response = await axios.post(URL.FAVORITES, {
            url: content.value?.url,
            title: content.value?.title,
            thumbnail: content.value?.thumbnail
        }, { headers: { apikey } })
        const result = response.data
        store.dispatch('favorites/setFavorites', result.data)
        isFavorited.value = true
        console.log("Add favorite success", result)
    } catch (err) {
        console.log("Add favorite success", err)
    }
}

async function removeFavorite() {
    const apikey = account.value.apikey
    try {
        const response = await axios.delete(URL.FAVORITES, {
            headers: { apikey }, data: {
                "ids": [favorite.value['_id']]
            }
        })
        const result = response.data
        store.dispatch('favorites/setFavorites', result.data)
        isFavorited.value = false
        // console.log("Remove favorite success", result)
    } catch (err) {
        console.log("Remove favorite failed", err)
    }
}

onMounted(() => {
    // content.value = JSON.parse(Crypto.decrypt(route.query.content as string));
    // if(content.value) {
    //     if (favorite.value) { // Triggers computation of the computed property 'favorite'
    //         isFavorited.value = true
    //     }
    //     if(history.value) {
    //         content.value.currentChapter = history.value.currentChapter
    //     }
    //     fetchContentDetail(content.value.url)
    // }
    // swiperInstance = new Swiper('.swiper-container', {
    //     pagination: {
    //         el: '.swiper-pagination',
    //     },
    //     on: {
    //         slideChange: () => {
    //             const activeSlideIndex = swiperInstance.activeIndex;
    //             activeSegment.value = slides[activeSlideIndex];
    //         },
    //     },
    // });
    // document.addEventListener('touchstart', handleTouchStart, { passive: false });
    // document.addEventListener('touchmove', handleTouchMove, { passive: false });
    // const a = document.querySelector(".page")
    // if(a) {
    //     a.addEventListener('touchmove', (event: any) => { event.preventDefault() }, { passive: false });
    // }
    // window.addEventListener('load', () => {
    //     if (window.history && window.history.pushState) {
    //         window.history.pushState(null, '', window.location.href);
    //         window.addEventListener('popstate', () => { window.history.pushState(null, '', window.location.href) });
    //     }
    // });
    // window.addEventListener('popstate', function (event) {
        // Chặn sự kiện swipe back của trình duyệt
        // event.preventDefault();
    // });
    content.value = JSON.parse(Crypto.decrypt(route.query.content as string));
    if (content.value) {
        if (favorite.value) { // Triggers computation of the computed property 'favorite'
            isFavorited.value = true
        }
        if (history.value) {
            content.value.currentChapter = history.value.currentChapter
        }
        fetchContentDetail(content.value.url)
    }
})

// function handleTouchStart(event: any) {
//     startX = event.touches[0].clientX;
//     startY = event.touches[0].clientY;
// }
// function handleTouchMove(event: any) {
//     const deltaX = event.touches[0].clientX - startX;
//     const deltaY = event.touches[0].clientY - startY;

//     if (Math.abs(deltaX) > Math.abs(deltaY)) {
//         router.back()
//         event.preventDefault();
//     }
// }

onIonViewWillEnter(() => {
    // content.value = JSON.parse(Crypto.decrypt(route.query.content as string));
    // if (content.value) {
    //     if (favorite.value) { // Triggers computation of the computed property 'favorite'
    //         isFavorited.value = true
    //     }
    //     if (history.value) {
    //         content.value.currentChapter = history.value.currentChapter
    //     }
    //     fetchContentDetail(content.value.url)
    // }

    // document.addEventListener('touchstart', handleTouchStart, { passive: false });
    // document.addEventListener('touchmove', handleTouchMove, { passive: false });
})

onIonViewWillLeave(() => {
    // document.removeEventListener('touchstart', handleTouchStart);
    // document.removeEventListener('touchmove', handleTouchMove);
})

onIonViewDidLeave(() => {
    // document.removeEventListener('touchstart', handleTouchStart);
    // document.removeEventListener('touchmove', handleTouchMove);
})

// const preventSwipeBack = () => {
//     window.history.pushState(null, '', window.location.href);
// };

onBeforeUnmount(() => {
    // window.removeEventListener('popstate', preventSwipeBack);
    // document.removeEventListener('touchstart', handleTouchStart);
    // document.removeEventListener('touchmove', handleTouchMove);
})

onUnmounted(() => {
    // document.removeEventListener('touchstart', handleTouchStart);
    // document.removeEventListener('touchmove', handleTouchMove);
})

// function onSwipe(event: any) {
//     // Ngăn chặn hành vi swipe back
//     event.detail.complete();
// }
// function onTouchStart(event: any) {
//     startX = event.touches[0].clientX;
// }
// function onTouchMove(event: any) {
//     const currentX = event.touches[0].clientX;
//     const deltaX = currentX - startX;

//     if (deltaX < 0) {
//         event.preventDefault();
//         event.stopPropagation();
//     }
// }
</script>

<style scoped>
h4.title-content {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-align: center;
    margin-left: 32px;
    margin-right: 32px;
}

.thumbnail-container {
    display: flex;
    justify-content: center;
    margin-top: 32px;
    margin-bottom: 18px;
}

ion-img.thumbnail-content {
    width: 150px;
    height: 214px;
}

.segment-container {
    margin: 18px;
}

.reading-button-container {
    margin: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
}

ion-button {
    /* width: 150px; */
    height: 50px;
    text-transform: none;
    font-size: medium;
    margin: 4px;
    color: white;
}

ion-icon.icon-favorite {
    width: 24px;
    height: 24px;
    margin-right: 12px;
}
</style>