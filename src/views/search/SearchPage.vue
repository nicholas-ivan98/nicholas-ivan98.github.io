<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start" @click="() => router.back()">
                    <ion-icon :ios="chevronBack" :md="arrowBack" style="width: 24px; height: 24px; margin-left: 4px;"
                        color="primary"></ion-icon>
                    <ion-label style="margin-left: 4px; font-size: medium;" color="primary">Back</ion-label>
                </ion-buttons>
                <ion-title style="text-align: center;">{{ route.query.keyword }}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ContentGridVerticalView :contentList="searchContentList"></ContentGridVerticalView>
            <ion-infinite-scroll @ionInfinite="ionInfinite">
                <ion-infinite-scroll-content></ion-infinite-scroll-content>
            </ion-infinite-scroll>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonContent, IonButtons, IonIcon, IonLabel, IonTitle, IonInfiniteScroll, IonInfiniteScrollContent, InfiniteScrollCustomEvent } from '@ionic/vue'
import ContentGridVerticalView from '@/views/components/content-components/ContentGridVerticalView.vue';
import Content from '@/models/Content';
import axios from 'axios';
import { URL, app } from '@/utils/Constant';
import { useRoute, useRouter } from 'vue-router';
import { chevronBack, arrowBack } from 'ionicons/icons';
import { ref, onMounted } from 'vue';

const searchContentList = ref<Content[]>([])
const route = useRoute()
const router = useRouter()
let pageNumber = 1

async function fetchContentBySearch(page: number) {
    try {
        const response = await axios.get(URL.CONTENT_SEARCH, { headers: { app }, params: { keyword: route.query.keyword, page } })
        const result = response.data
        // console.log('Search >>>>', result)
        pageNumber++
        searchContentList.value = [...searchContentList.value, ...result.data.map((item: any) => new Content(item.url, item.title, item.thumbnail))]
    } catch (err) {
        console.log('Search failed: ', err)
    }
}

async function ionInfinite(ev: InfiniteScrollCustomEvent) {
    await fetchContentBySearch(pageNumber)
    ev.target.complete()
}

onMounted(async () => {
    await fetchContentBySearch(pageNumber)
    fetchContentBySearch(pageNumber)
})
</script>

<style scoped>
.md .dark ion-infinite-scroll-content {
    background-color: #1e1e1e;
}

.md .dark ion-content {
  --background: #1e1e1e;
}
</style>