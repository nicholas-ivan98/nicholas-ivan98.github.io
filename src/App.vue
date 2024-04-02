<template>
  <ion-app>
    <InstructionIntall v-if="isInstructionInstall"></InstructionIntall>
    <NoInternetPage v-if="!isInternetConnection" :callback="tryConnection"></NoInternetPage>
    <ion-split-pane content-id="main-content" v-if="isInternetConnection">
      <ion-menu content-id="main-content" type="overlay" :swipeGesture="false">
        <ion-content>
          <ion-list id="inbox-list">
            <ion-list-header>Manga Reader</ion-list-header>
            <ion-note id="infoEmail" v-text="getEmailInfo()"></ion-note>

            <ion-menu-toggle :auto-hide="false" v-for="(p, i) in genres" :key="i">
              <ion-list-header v-if="i === 3" id="labels-list">Genres</ion-list-header>
              <ion-item @click="handleClickMenu(i, p)" router-direction="root" lines="none" :detail="false"
                class="hydrated" :class="{ selected: selectedIndex === i }">
                <ion-icon v-if="i < 3" aria-hidden="true" slot="start" :ios="p.iosIcon" :md="p.mdIcon"></ion-icon>
                <ion-label>{{ p.name }}</ion-label>
              </ion-item>
            </ion-menu-toggle>
          </ion-list>

          <!-- <ion-list id="labels-list">
            <ion-list-header>Genres</ion-list-header>

            <ion-item v-for="genre in genres" lines="none" :key="genre._id">
              <ion-icon aria-hidden="true" slot="start" :ios="bookmarkOutline" :md="bookmarkSharp" @click="selectedIndex = i" router-direction="root" :router-link="p.url" lines="none"
                :detail="false" class="hydrated" :class="{ selected: selectedIndex === i }"></ion-icon>
              <ion-label>{{ genre.name }}</ion-label>
            </ion-item>
          </ion-list> -->
        </ion-content>
      </ion-menu>
      <!-- <ion-router-outlet id="main-content" :swipeBackEnabled="false" :swipeGesture="false"
        @ionSwipeGesture="onSwipeGesture"></ion-router-outlet> -->
      <ion-router-outlet id="main-content"></ion-router-outlet>
    </ion-split-pane>
  </ion-app>
</template>

<script setup lang="ts">
import {
  IonApp,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonRouterOutlet,
  IonSplitPane,
  onIonViewWillEnter,
  isPlatform
} from '@ionic/vue';
import {
  heartOutline,
  heartSharp,
  timeOutline,
  timeSharp,
  homeSharp,
  homeOutline
} from 'ionicons/icons';
import ThemeHelper from '@/utils/ThemeHelper'
import axios from 'axios';
import { URL, app } from './utils/Constant';
import { useRouter } from 'vue-router';
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';
import Content from '@/models/Content';
import NoInternetPage from './views/no-internet/NoInternetPage.vue';
import InstructionIntall from './views/instruction-install/InstructionIntall.vue';

const store = useStore();
const account = computed(() => store.getters['account/getAccount'])
const router = useRouter();
const selectedIndex = ref(0);
const isInternetConnection = ref(true);
const isInstructionInstall = ref(false);
type Genre = {
  _id: string,
  name: string,
  iosIcon: string,
  mdIcon: string
}
const genres = ref<Genre[]>([
  {
    _id: 'home-page',
    name: 'Home',
    iosIcon: homeOutline,
    mdIcon: homeSharp,
  },
  {
    _id: 'histories-page',
    name: 'Histories',
    iosIcon: timeOutline,
    mdIcon: timeSharp,
  },
  {
    _id: 'favorites-page',
    name: 'Favorites',
    iosIcon: heartOutline,
    mdIcon: heartSharp,
  }
]);

const path = window.location.pathname.split('content/')[1];
if (path !== undefined) {
  selectedIndex.value = genres.value.findIndex((page: Genre) => page.name.toLowerCase() === path.toLowerCase());
}

ThemeHelper.initializeTheme()

// Viet lại cac ham callback theo style async/await
async function checkUserInfo() {
  // const apiKey = localStorage.getItem('apikey')
  const apikey = account.value.apikey
  try {
    if (apikey) {
      const response = await axios.get(URL.USER_INFO, { headers: { apikey } })
      account.value.licenses = response.data.data.licenses
      store.dispatch('account/setAccount', account.value)
    }
  } catch (err: any) {
    if (err.response.status === 403 && err.response.data.success === false && err.response.data.msg === 'Your apikey not existed') {
      // localStorage.removeItem('apikey')
      // localStorage.removeItem('infoEmail')
      store.dispatch('account/clearAccount')
      // const infoEmail = document.getElementById('infoEmail')
      // if (infoEmail) infoEmail.textContent = ''
    }
  }
}

function getEmailInfo() {
  // return localStorage.getItem('infoEmail')
  if (account.value) {
    return account.value.email
  }
  return ""
}

async function getGenres() {
  try {
    const response = await axios.get(URL.GENRES, { headers: { app } })
    const result = response.data
    const genresMapped = result.data.genres.map((item: any) => {
      return {
        _id: item._id,
        name: item.name,
        iosIcon: '',
        mdIcon: '',
      }
    })
    genres.value = [...genres.value, ...genresMapped]
  } catch (err) {
    console.error(err)
  }
}

async function getFavorites() {
  const apikey = account.value.apikey
  try {
    const response = await axios.get(URL.FAVORITES, { headers: { apikey } })
    const result = response.data
    // console.log("Get favorites: ", result.data)
    store.dispatch('favorites/setFavorites', result.data.map((item: any) => new Content(item.url, item.title, item.thumbnail, new Date(item.created_at), item['_id'])))
  } catch (err) {
    console.log("Get favorites failed", err)
  }
}

function handleClickMenu(i: any, p: any) {
  selectedIndex.value = i
  const query = { id: p._id, title: p.name }
  router.replace({ path: '/content', query });
}

function tryConnection() {
  getGenres()
  isInternetConnection.value = true
}

function checkPWAInstall() {
  // if (window.matchMedia('(display-mode: standalone)').matches) {
  //   console.log('Accessing by PWA');
  //   isInstructionInstall.value = false
  // } else {
  //   console.log('Accessing by browser');
  //   isInstructionInstall.value = true
  // }
  if (isPlatform('pwa')) {
    console.log('Accessing by PWA')
    isInstructionInstall.value = false
  } else {
    console.log('Accessing by browser')
    isInstructionInstall.value = true
  }

  // window.addEventListener('beforeinstallprompt', (e) => {
  //   console.log('beforinstall')
  //   isInstructionInstall.value = true
  //   e.preventDefault();
  // });

  window.addEventListener('appinstalled', (e) => {
    console.log('appinstalled')
    ThemeHelper.initializeTheme() // fix trường hợp cài app trên desktop chưa chuyển theme
    isInstructionInstall.value = false
  });
}

// onIonViewWillEnter(() => {
//   console.log('onIonViewWillEnter')
// })

// onMounted(() => {
//   console.log('onMounted')
// })
checkPWAInstall()
checkUserInfo()
getGenres()
getFavorites()
window.addEventListener('offline', function () {
  console.log('offline');
  isInternetConnection.value = false
});
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
  // document.addEventListener('touchstart', handleTouchStart, { passive: false });
  // document.addEventListener('touchmove', handleTouchMove, { passive: false });
  // window.addEventListener('load', () => {
  //   if (window.history && window.history.pushState) {
  //     window.history.pushState(null, '', window.location.href);
  //     window.addEventListener('popstate', () => { window.history.pushState(null, '', window.location.href); });
  //   }
  // });
  // const routerOutlet = document.querySelector('ion-router-outlet') as HTMLIonRouterOutletElement;
  // Chặn sự kiện swipe back của Ionic PWA
  // if (routerOutlet) {
  //   routerOutlet.swipeHandler = undefined
  // }
})

// function onSwipeGesture(event: any) {
//   event.detail.preventDefault();
//   event.detail.stopPropagation();
// }

// function onNavWillChange(transition: any) {
//   if (transition.direction === 'forward') {
//     transition.enteringEl.style.animationName = 'slide-in-left-enter';
//   } else if (transition.direction === 'back') {
//     transition.enteringEl.style.animationName = 'slide-in-right-enter';
//   }
// }
</script>

<style scoped>
ion-menu ion-content {
  --background: var(--ion-item-background, var(--ion-background-color, #fff));
}

ion-menu.md ion-content {
  --padding-start: 8px;
  --padding-end: 8px;
  --padding-top: 20px;
  --padding-bottom: 20px;
}

ion-menu.md ion-list {
  padding: 20px 0;
}

ion-menu.md ion-note {
  margin-bottom: 30px;
}

ion-menu.md ion-list-header,
ion-menu.md ion-note {
  padding-left: 10px;
}

ion-menu.md ion-list#inbox-list {
  border-bottom: 1px solid var(--ion-color-step-150, #d7d8da);
}

ion-menu.md ion-list#inbox-list ion-list-header {
  font-size: 22px;
  font-weight: 600;
  min-height: 20px;
}

ion-menu.md ion-list#inbox-list ion-list-header#labels-list {
  font-size: 18px;
  margin-bottom: 8px;
  color: #757575;
  min-height: 26px;
  margin-top: 18px;
}

ion-menu.md ion-item {
  --padding-start: 10px;
  --padding-end: 10px;
  border-radius: 4px;
}

ion-menu.md ion-item.selected {
  --background: rgba(var(--ion-color-primary-rgb), 0.14);
}

ion-menu.md ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.md ion-item ion-icon {
  color: #616e7e;
}

ion-menu.md ion-item ion-label {
  font-weight: 500;
}

ion-menu.ios ion-content {
  --padding-bottom: 20px;
}

ion-menu.ios ion-list {
  padding: 20px 0 0 0;
}

ion-menu.ios ion-note {
  line-height: 24px;
  margin-bottom: 20px;
}

ion-menu.ios ion-item {
  --padding-start: 16px;
  --padding-end: 16px;
  --min-height: 50px;
}

ion-menu.ios ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.ios ion-item ion-icon {
  font-size: 24px;
  color: #73849a;
}

ion-menu.ios ion-list-header#labels-list {
  margin-bottom: 8px;
  font-size: 18px;
}

ion-menu.ios ion-list-header,
ion-menu.ios ion-note {
  padding-left: 16px;
  padding-right: 16px;
}

ion-menu.ios ion-note {
  margin-bottom: 8px;
}

ion-note {
  display: inline-block;
  font-size: 16px;

  color: var(--ion-color-medium-shade);
}

ion-item.selected {
  --color: var(--ion-color-primary);
}

/* ion-router-outlet { */
/* --back-transition-duration: 0ms; */
/* } */

/* ion-router-outlet.swipe-back-enabled {
  --transition-duration: 0s !important;
}

ion-router-outlet.swipe-back-enabled,
ion-header.swipe-back-enabled,
ion-content.swipe-back-enabled,
ion-footer.swipe-back-enabled {
  backface-visibility: hidden;
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
