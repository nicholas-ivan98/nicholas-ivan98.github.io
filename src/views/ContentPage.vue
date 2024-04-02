<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>{{ route.query.title !== undefined ? route.query.title : "Home" }}</ion-title>
        <ion-buttons slot="end">
          <ion-button v-if="(currentPage === 'histories-page' || currentPage === 'favorites-page') ? true : false"
            @click="deleteAll">
            <ion-icon :ios="trash" :md="trash" color="primary"></ion-icon>
          </ion-button>
          <ion-button @click="navigateSetting()">
            <ion-icon :ios="cog" :md="settingsSharp" color="primary"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="contentPage">
      <ion-searchbar v-if="(currentPage === undefined || currentPage === 'home-page') ? true : false"
        placeholder="Search..." v-model="searchValue" @ionChange="handleSearch"></ion-searchbar>
      <ion-refresher slot="fixed" :pull-factor="0.5" :pull-min="100" :pull-max="200"
        @ionRefresh="handleRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <!-- Home Page -->
      <ion-list v-if="(currentPage === undefined || currentPage === 'home-page') ? true : false">
        <h4 style="margin: 4px 18px 18px 18px;">Popular</h4>
        <ContentHorizontalView :contentList="popularContentList"></ContentHorizontalView>
        <h4 style="margin: 18px;">Latest Manga</h4>
        <ContentGridVerticalView :contentList="genreContentList"></ContentGridVerticalView>
      </ion-list>
      <!-- Genre Page -->
      <ion-list
        v-if="currentPage && currentPage !== 'home-page' && currentPage !== 'histories-page' && currentPage !== 'favorites-page' ? true : false">
        <ContentGridVerticalView :contentList="genreContentList"></ContentGridVerticalView>
      </ion-list>
      <!-- Histories Page -->
      <ion-list v-if="currentPage === 'histories-page' ? true : false">
        <ContentGridVerticalView :contentList="genreContentList"></ContentGridVerticalView>
      </ion-list>
      <!-- Favorites Page -->
      <ion-list v-if="currentPage === 'favorites-page' ? true : false">
        <ContentGridVerticalView :contentList="genreContentList"></ContentGridVerticalView>
      </ion-list>
      <ion-infinite-scroll @ionInfinite="ionInfinite"
        v-if="(currentPage === 'histories-page' || currentPage === 'favorites-page') ? false : true">
        <ion-infinite-scroll-content></ion-infinite-scroll-content>
      </ion-infinite-scroll>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { useIonRouter, isPlatform, IonRefresher, IonRefresherContent, IonSearchbar, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonIcon, IonButton, IonList, IonInfiniteScroll, IonInfiniteScrollContent, InfiniteScrollCustomEvent, alertController, onIonViewWillEnter, onIonViewDidEnter } from '@ionic/vue';
import { trash, cog, settingsSharp } from 'ionicons/icons';
import { ref, watch, onMounted, computed, onBeforeUnmount, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { URL, app } from '@/utils/Constant';
import ContentHorizontalView from './components/content-components/ContentHorizontalView.vue';
import ContentGridVerticalView from './components/content-components/ContentGridVerticalView.vue';
import Content from '@/models/Content';
import { useStore } from 'vuex';

const store = useStore();
const route = useRoute()
const router = useIonRouter()
const popularContentList = ref<Content[]>([])
const genreContentList = ref<Content[]>([])
let infiniteScroll: HTMLIonInfiniteScrollElement
let pageNumber = 1
let isScrollToTop = false
const currentPage = ref<any>(undefined)
const searchValue = ref("")
const account = computed(() => store.getters['account/getAccount'])
const favorites = computed(() => store.getters['favorites/getFavorites'])
const histories = computed(() => store.getters['histories/getHistories'])

function handleRefresh(event: any) {
  setTimeout(async () => {
    pageNumber = 1
    await fetchContentPage(currentPage.value)
    event.target?.complete()
  }, 1000)
}

async function deleteAll() {
  const alert = await alertController.create({
    header: 'Do you want to delete all manga?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Delete',
        role: 'confirm',
        handler: handleDeleteAllContent,
      },
    ]
  });
  await alert.present();
}

async function handleDeleteAllContent() {
  if (currentPage.value === 'histories-page') {
    store.dispatch('histories/clearHistories')
    genreContentList.value = histories.value
  } else if (currentPage.value === 'favorites-page') {
    const apikey = account.value.apikey
    try {
      const ids = favorites.value.map((item: any) => item['id'])
      const response = await axios.delete(URL.FAVORITES, { headers: { apikey }, data: { ids } })
      const result = response.data
      store.dispatch('favorites/setFavorites', result.data)
      genreContentList.value = favorites.value
      // console.log("Remove favorite success", result)
    } catch (err) {
      console.log("Remove favorite failed", err)
    }
  }
}

async function fetchContentPopular() {
  try {
    const response = await axios.get(URL.CONTENT_POPULAR, { headers: { app } })
    const result = response.data
    // console.log('Content Popular: ', result.data)
    popularContentList.value = result.data.map((item: any) => new Content(item.url, item.title, item.thumbnail))
  } catch (err) {
    console.log('Content Popular: ', err)
  }
}

async function fetchContentGenre(id: any, page: number) {
  console.log('Page: ', page)
  try {
    const response = await axios.get(URL.CONTENT_LIST, { headers: { app }, params: { type: 'latest', category: id, state: 'all', page } })
    const result = response.data
    // console.log('Content list: ', result.data)
    if (infiniteScroll) {
      infiniteScroll.complete()
    }
    pageNumber++
    genreContentList.value = [...genreContentList.value, ...result.data.map((item: any) => new Content(item.url, item.title, item.thumbnail))]
  } catch (err) {
    console.log('Content list: ', err)
    if (infiniteScroll) {
      infiniteScroll.complete()
    }
  }
}

async function fetchContentPage(id?: any) {
  // console.log('fetch content page')
  async function fetchHomePage() {
    fetchContentPopular()
    const array = [1, 2, 3]
    array.forEach(async (element) => {
      await fetchContentGenre('all', element)
    });
  }
  if (id) {
    if (id === 'home-page') {
      fetchHomePage()
    } else if (id === 'histories-page') {
      // console.log('ahihi', histories.value)
      genreContentList.value = histories.value
    } else if (id === 'favorites-page') {
      genreContentList.value = favorites.value
    } else {
      await fetchContentGenre(id, pageNumber)
      // Fixed desktop screen can't scroll
      fetchContentGenre(id, pageNumber)
    }
  } else {
    fetchHomePage()
  }
}

function ionInfinite(ev: InfiniteScrollCustomEvent) {
  // if (route.query.id && route.query.id !== 'home-page' && route.query.id !== 'histories-page' && route.query.id !== 'favorites-page') {
  //   console.log("ionInfinite 1 >>>>>>>>>>>>")
  //   fetchContentGenre(route.query.id, pageNumber)
  //   infiniteScroll = ev.target
  // } else if ((route.query.id === undefined && currentPage === undefined) || (route.query.id === 'home-page' && currentPage === 'home-page')) {
  //   console.log("ionInfinite 2 >>>>>>>>>>>>", route.query.id)
  //   fetchContentGenre('all', pageNumber)
  //   infiniteScroll = ev.target
  // } else {
  //   ev.target.complete()
  // }
  // console.log("ahuhuhuhuhuh>>>>>>>", route.query.id, currentPage.value)
  if (route.query.id === currentPage.value) {
    // console.log("ahuhuhuhuhuh>>>>>>>1", route.query.id, currentPage.value)
    if (!isScrollToTop) {
      // console.log("ahuhuhuhuhuh>>>>>>>", route.query.id, currentPage.value)
      fetchContentGenre(currentPage.value, pageNumber)
      infiniteScroll = ev.target
    } else {
      isScrollToTop = false
    }
  }
}

function handleSearch() {
  console.log("Search >>>>>>>>>", searchValue.value)
  if (searchValue.value) {
    router.push({ path: '/search', query: { keyword: searchValue.value } })
    searchValue.value = ''
  }
}

watch(() => route.query.id, async (id) => {
  if (id && id !== currentPage.value) {
    // console.log("ahihihihihihi>>>>>>>", id, currentPage)
    const contentPage = document.querySelector('.contentPage') as HTMLIonContentElement
    if (contentPage) {
      const scrollContentPage = (await contentPage.getScrollElement()).scrollTop
      // console.log(scrollContentPage)
      if (scrollContentPage > 0) {
        isScrollToTop = true
      } else {
        isScrollToTop = false
      }
      contentPage.scrollToTop(0)
    }
    pageNumber = 1
    currentPage.value = id
    genreContentList.value = []
    popularContentList.value = []
    setTimeout(() => {
      fetchContentPage(currentPage.value)
    }, 200)
  }
})

// let startX: 0
// let startY: 0

// function handleTouchStart(event: any) {
//   startX = event.touches[0].clientX;
//   startY = event.touches[0].clientY;
// }
// function handleTouchMove(event: any) {
//   const deltaX = event.touches[0].clientX - startX;
//   const deltaY = event.touches[0].clientY - startY;

//   if (Math.abs(deltaX) > Math.abs(deltaY)) {
//     event.preventDefault();
//   }
// }

onMounted(() => {
  // console.log("onMounted >>>>>>>>>>>>>>>>>>")
  currentPage.value = route.query.id
  fetchContentPage(route.query.id)
  // document.addEventListener('touchstart', handleTouchStart, { passive: false });
  // document.addEventListener('touchmove', handleTouchMove, { passive: false });
  // window.addEventListener('load', () => {
  //   if (window.history && window.history.pushState) {
  //     window.history.pushState(null, '', window.location.href);
  //     window.addEventListener('popstate', () => { window.history.pushState(null, '', window.location.href); });
  //   }
  // });
})

onUnmounted(() => {
  // document.removeEventListener('touchstart', handleTouchStart);
  // document.removeEventListener('touchmove', handleTouchMove);
})

function navigateSetting() {
  // const transition = {
  //   name: 'slide-in-left-enter',
  //   duration: 300,
  //   enterAnimation: 'slide-in-left-enter-active',
  //   leaveAnimation: ''
  // };
  // router.push({ path: '/setting', transition });
  router.push('/setting')
}

onIonViewWillEnter(() => {
  
})
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}

ion-icon {
  font-size: 30px;
}

/* .md .dark ion-infinite-scroll-content {
  background-color: #1e1e1e;
}

.md .dark ion-searchbar {
  background-color: #1e1e1e;
} */

.md .dark ion-content.contentPage {
  --background: #1e1e1e;
}

ion-searchbar {
  padding: 14px;
}

/* .custom-transition-left-to-right-enter {
  --ion-navview-background: var(--ion-color-primary);
  --ion-navview-in-background: var(--ion-color-primary);
  transform: translateX(-100%);
}

.custom-transition-left-to-right-enter-active {
  transition: transform 300ms ease-out;
  transform: translateX(0);
}

.custom-transition-left-to-right-leave {
  --ion-navview-background: var(--ion-color-primary);
  --ion-navview-in-background: var(--ion-color-primary);
  transform: translateX(0);
}

.custom-transition-left-to-right-leave-active {
  transition: transform 300ms ease-out;
  transform: translateX(100%);
}

.custom-transition-right-to-left-enter {
  --ion-navview-background: var(--ion-color-primary);
  --ion-navview-in-background: var(--ion-color-primary);
  transform: translateX(100%);
}

.custom-transition-right-to-left-enter-active {
  transition: transform 300ms ease-out;
  transform: translateX(0);
}

.custom-transition-right-to-left-leave {
  --ion-navview-background: var(--ion-color-primary);
  --ion-navview-in-background: var(--ion-color-primary);
  transform: translateX(0);
}

.custom-transition-right-to-left-leave-active {
  transition: transform 300ms ease-out;
  transform: translateX(-100%);
}

.slide-in-left-enter-active {
  animation: slide-in-left-enter 300ms forwards;
}

@keyframes slide-in-left-enter {
  from {
    transform: translateX(-100%);
  }

  to {
    transform: translateX(0);
  }
}

.slide-in-right-enter-active {
  animation: slide-in-right-enter 300ms forwards;
}

@keyframes slide-in-right-enter {
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(0);
  }
} */
</style>
