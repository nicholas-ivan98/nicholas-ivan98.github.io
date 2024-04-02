<template>
    <ion-page class="can-go-back" id="main-content" style="z-index: 2000;">
        <ion-menu side="end" content-id="main-content" :swipeGesture="false">
            <ion-header>
                <ion-toolbar>
                    <ion-title>Chapters</ion-title>
                    <ion-buttons slot="end">
                        <ion-icon :icon="close" @click="closeEndMenu" style="width: 24px; height: 24px;"></ion-icon>
                    </ion-buttons>
                </ion-toolbar>
            </ion-header>
            <ion-content class="ion-padding">
                <ChaptersView :content="content" :callback="handleClickChapterCallback"></ChaptersView>
            </ion-content>
        </ion-menu>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start" @click="() => router.back()">
                    <ion-icon :ios="chevronBack" :md="arrowBack" style="width: 24px; height: 24px; margin-left: 4px;"
                        color="primary"></ion-icon>
                    <ion-label style="margin-left: 4px; font-size: medium;" color="primary">Back</ion-label>
                </ion-buttons>
                <ion-title class="title-header" style="text-align: center;">Chapter {{ content?.currentChapter
                    }}</ion-title>
                <ion-buttons slot="end" @click="openEndMenu()">
                    <ion-icon :icon="menu" style="width: 24px; height: 24px;"></ion-icon>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true" class="content-reading">
            <!-- <div>
                <img v-for="imageUrl in chapterDetailImages" :key="imageUrl" v-lazy="imageUrl" />
            </div> -->
            <ion-refresher slot="fixed" :pull-factor="0.5" :pull-min="100" :pull-max="200"
                @ionRefresh="handleRefresh($event)">
                <ion-refresher-content></ion-refresher-content>
            </ion-refresher>
            <div class="spinner-container">
                <ion-spinner v-if="isLoading"></ion-spinner>
            </div>
            <div class="image-container">
                <!-- <img v-for="imageUrl in chapterDetailImages" :key="imageUrl" v-lazy="imageUrl" /> -->
            </div>
            <!-- <div class="image-container" v-for="imageUrl in chapterDetailImages" :key="imageUrl"> -->
            <!-- <ion-img :srcset="imageUrl" :src="imageUrl" loading="lazy" @load="calculateImageHeight"></ion-img> -->
            <!-- </div> -->
            <ion-modal id="ads-modal" :is-open="isOpenModal" :can-dismiss="canDismissModal">
                <ion-card>
                    <ion-card-header>
                        <ion-card-title>Upgrade to Premium</ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                        Please upgrade to Premium to remove ads
                    </ion-card-content>
                    <ion-buttons style="margin: 0 18px 18px 12px; justify-content: flex-end">
                        <ion-button @click="navigatePaymentPage" style="margin-right: 18px;">Upgrade Now</ion-button>
                        <ion-button @click="closePopupUpgrade" :disabled="countDown > 0">Close {{ countDown > 0 ?
            `(${countDown})` :
            '' }}</ion-button>
                    </ion-buttons>
                </ion-card>
            </ion-modal>
        </ion-content>
        <ion-footer>
            <ion-toolbar>
                <div slot="start" class="navigate-chapter" :class="{ 'disabled': content?.currentChapter === 1 }"
                    @click="navigateChapter(false)">
                    <ion-icon :icon="chevronBack"></ion-icon>
                    <ion-label>Previous</ion-label>
                </div>
                <div slot="end" class="navigate-chapter"
                    :class="{ 'disabled': content?.currentChapter === content?.chapters.length }"
                    @click="navigateChapter(true)">
                    <ion-label>Next</ion-label>
                    <ion-icon :icon="chevronForward"></ion-icon>
                </div>
            </ion-toolbar>
        </ion-footer>
    </ion-page>
</template>

<script setup lang="ts">
import { IonSpinner, alertController, loadingController, toastController, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonButton, IonModal, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon, IonMenu, IonImg, IonFooter, IonRefresher, IonRefresherContent, IonLabel, menuController, onIonViewWillEnter } from '@ionic/vue';
import Content from '@/models/Content'
import Crypto from '@/utils/Crypto';
import axios from 'axios';
import { URL, app } from '@/utils/Constant';
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { chevronBack, chevronForward, arrowBack, close, menu } from 'ionicons/icons';
import { useStore } from 'vuex';
import ChaptersView from '../components/content-detail-components/ChaptersView.vue';
// import { convertToWebp } from '@/service/img_service';
import { Globals } from '@/utils/Globals';

const route = useRoute()
const router = useRouter()
const store = useStore();
const content = ref<Content>();
const timeToShowAds = 25 * 1000;
// const idChapter = ref(1);
const emailInputValue = ref('')
const chapterDetailImages = ref<string[]>()
const history = computed(() => store.getters['histories/getHistory'](content.value?.url || ""))
const account = computed(() => store.getters['account/getAccount'])
const timeCountDown = 15
let countDown = ref(timeCountDown)
const isOpenModal = ref(false)
const canDismissModal = ref(false)
const isLoading = ref(false)
var loading: HTMLIonLoadingElement;

// const handleScroll = () => {
//     const container = document.querySelector('.content-reading') as HTMLIonContentElement
//     const containerHeight = container.offsetHeight;
//     const scrollTop = container.scrollTop;
//     const scrollHeight = container.scrollHeight;

//     if (scrollHeight - scrollTop === containerHeight) {

//     }
// };

function appendItemImg(item: any) {
    const container = document.querySelector('.image-container') as HTMLElement
    var img = document.createElement('img');
    img.classList.add('img-chapter')
    img.src = item
    container.appendChild(img)
}

async function fetchChapterDetail(url: string) {
    try {
        const response = await axios.post(URL.CHAPTER_DETAIL, { url }, { headers: { app } })
        const result = response.data
        // console.log('Chapter detail: ', result.data.images)
        // chapterDetailImages.value = result.data.images

        result.data.images.forEach((item: any, index: any) => {
            let i = index > 4 ? 5 : (index + 1)
            setTimeout(() => {
                isLoading.value = false
                appendItemImg(item);
            }, i * 2000);
        })
        // const convertedImages = await Promise.all(result.data.images.map(url => convertToWebp(url)));
        // chapterDetailImages.value = convertedImages;
    } catch (err) {
        console.log('Chapter detail error: ', err)
    }
}

function navigateChapterById(currentChapter: number) {
    isLoading.value = true
    const timeCurrent = new Date().getTime()
    console.log(account.value.licenses)
    if ((timeCurrent - Globals.timestamp) >= timeToShowAds && checkLicense()) {
        countDownAds()
        openModal()
    }
    if (content.value) {
        content.value.currentChapter = currentChapter
        const chapter = content.value.chapters.find(item => item['_id'] === content.value?.currentChapter)
        const contentPage = document.querySelector('.content-reading') as HTMLIonContentElement
        if (contentPage) {
            contentPage.scrollToTop(0)
        }
        chapterDetailImages.value = []
        const imgContainer = document.querySelector('.image-container') as HTMLElement
        while (imgContainer.firstChild) {
            imgContainer.removeChild(imgContainer.firstChild)
        }
        saveHistory()
        setTimeout(() => {
            fetchChapterDetail(chapter?.['url'] || '')
        }, 200)
    }
}

async function navigateChapter(isNext: boolean) {
    if (content.value) {
        let currentChapter = content.value.currentChapter
        if (isNext) {
            currentChapter += 1
        } else {
            currentChapter -= 1
        }
        if (currentChapter >= 1 && currentChapter <= content.value.chapters.length) {
            // idChapter.value = currenChapter
            navigateChapterById(currentChapter)
        }
    }
}

function handleRefresh(event: any) {
    setTimeout(async () => {
        const chapter = content.value?.chapters.find(item => item['_id'] === content.value?.currentChapter)
        await fetchChapterDetail(chapter?.['url'] || '')
        event.target?.complete()
    }, 1000)
}

function saveHistory() {
    store.dispatch('histories/setHistory', content.value)
}

// function calculateImageHeight(event) {
//     console.log('ahihi')
// }

// function observeImages() {
//     const images = document.querySelectorAll('ion-img');
//     const observer = new IntersectionObserver(calculateImageHeight, {
//         root: document.querySelector('.content-reading'),
//     });

//     images.forEach((image) => {
//         observer.observe(image);
//     });
// }
async function openEndMenu() {
    await menuController.open('end');
};

async function closeEndMenu() {
    await menuController.close('end')
}

function handleClickChapterCallback(chapter: number) {
    navigateChapterById(chapter)
    closeEndMenu()
}

// onMounted(async () => {
// content.value = JSON.parse(Crypto.decrypt(route.query.content as string))
// // idChapter.value = parseInt(route.query.id_chapter as string)
// // console.log(content.value)
// // console.log('ahihi', content.value)
// if(history && content.value && content.value.currentChapter !== history.value.currentChapter) { // fix case navigate chapter and refresh page
//     content.value.currentChapter = history.value.currentChapter
//     content.value.recentlyRead = history.value.recentlyRead
// }
// const chapter = content.value?.chapters.find(item => item['_id'] === content.value?.currentChapter)
// // saveHistory()
// await fetchChapterDetail(chapter?.['url'] || '')
// // observeImages()
// })

function countDownAds() {
    let time = timeCountDown
    const interval = setInterval(() => {
        time--;
        countDown.value = time
        if (time === 0) {
            clearInterval(interval);
        }
    }, 1000);
}

function closeModal() {
    canDismissModal.value = true
    isOpenModal.value = false
    countDown.value = timeCountDown
}

function closePopupUpgrade() {
    closeModal()
    localStorage.setItem('isShowPopupUpgrade', false.toString())
    Globals.timestamp = new Date().getTime()
}

function openModal() {
    canDismissModal.value = false
    isOpenModal.value = true
}

function navigatePaymentPage() {
    if (countDown.value !== 0) {
        localStorage.setItem('isShowPopupUpgrade', true.toString())
    } else {
        localStorage.setItem('isShowPopupUpgrade', false.toString())
        Globals.timestamp = new Date().getTime()
    }
    if (account.value.apikey) {
        closeModal()
        router.push('/payment')
    } else {
        displayAlertLogin()
    }
}

async function displayAlertLogin() {
    const alert = await alertController.create({
        header: 'Please enter your email',
        buttons: [
            {
                text: 'Cancel',
                role: 'cancel'
            },
            {
                text: 'Get code',
                role: 'confirm',
                handler: handleGetCode,
            },
        ],
        inputs: [
            {
                placeholder: 'Email',
                id: 'email-input',
                value: ''
            }
        ],
        backdropDismiss: false
    });
    await alert.present();
}

async function displayAlertConfirmLogin(msg: string) {
    const alert = await alertController.create({
        header: msg,
        buttons: [
            {
                text: 'Cancel',
                role: 'cancel'
            },
            {
                text: 'Verify email',
                role: 'confirm',
                handler: confirmLogin,
            },
        ],
        inputs: [
            {
                placeholder: 'OTP Code',
                id: 'otp-code-input',
                value: ''
            }
        ],
        backdropDismiss: false
    });
    await alert.present();
}

async function handleGetCode() {
    try {
        await showLoading()
        const inputElement = document.getElementById('email-input') as HTMLIonInputElement;
        const emailString = inputElement.value
        console.log('Email:', emailString);
        if (emailString) {
            emailInputValue.value = emailString as string
            const response = await axios.post(URL.GET_OTP_CODE, { email: emailString }, { headers: { app } })
            const result = response.data
            console.log('Get otp data: ', result.data)
            displayAlertConfirmLogin(result.data.msg)
        } else {
            showToast("Email is null or empty")
        }
        dismissLoading()
    } catch (err) {
        console.error('Error:', err);
        showToast("An error occurred. Please try again later!")
        dismissLoading()
    }
}

async function confirmLogin() {
    try {
        const inputElement = document.getElementById('otp-code-input') as HTMLIonInputElement;
        const otpCodeString = inputElement.value
        await showLoading()
        if (otpCodeString) {
            const response = await axios.post(URL.CONFIRM_LOGIN, { email: emailInputValue.value, code: otpCodeString }, { headers: { app } })
            const result = response.data
            // console.log('Account: ', result.data)
            store.dispatch('account/setAccount', result.data)

            const apikey = result.data.apikey
            const responseUserInfo = await axios.get(URL.USER_INFO, { headers: { apikey } })
            const resultUserInfo = responseUserInfo.data
            // console.log('User info: ', resultUserInfo)
            if (resultUserInfo.data.licenses.length > 0) {
                account.value.licenses = resultUserInfo.data.licenses
                store.dispatch('account/setAccount', account.value)
                closePopupUpgrade()
            }
            getFavorites(apikey)
        } else {
            showToast("OTP code is null or empty")
        }
        dismissLoading()
    } catch (err) {
        console.error('Error:', err);
        showToast("An error occurred. Please try again later!")
        dismissLoading()
    }
}

async function showToast(msg: string) {
    const toast = await toastController.create({
        message: msg,
        duration: 1500,
        position: 'bottom',
    });
    await toast.present();
}

async function getFavorites(apikey: string) {
    try {
        const response = await axios.get(URL.FAVORITES, { headers: { apikey } })
        const result = response.data
        // console.log("Get favorites: ", result.data)
        store.dispatch('favorites/setFavorites', result.data.map((item: any) => new Content(item.url, item.title, item.thumbnail, new Date(item.created_at), item['_id'])))
    } catch (err) {
        console.log("Get favorites failed", err)
    }
}

async function showLoading() {
    loading = await loadingController.create({
        duration: 0
    });
    loading.present()
}

async function dismissLoading() {
    loading.dismiss()
}

function checkLicense() {
    if (!account.value.licenses || (account.value.licenses && account.value.licenses.length === 0) || isExpired()) {
        return true
    }
    return false
}

function isExpired() {
    const currentDate = new Date()
    const isExpired = account.value.licenses.find((license: any) => new Date(license['expired_at']) < currentDate && license['app'] === app)
    if (isExpired) {
        return true
    }
    return false
}

content.value = JSON.parse(Crypto.decrypt(route.query.content as string))

if(Globals.urlManga !== content.value?.url) {
    Globals.timestamp = new Date().getTime()
    Globals.urlManga = content.value?.url || ""
}

// fix show ad vào trang đọc truyện
const timeCurrent = new Date().getTime()
if ((timeCurrent - Globals.timestamp) >= timeToShowAds && checkLicense()) {
    countDownAds()
    openModal()
}

onIonViewWillEnter(async () => {
    // idChapter.value = parseInt(route.query.id_chapter as string)
    // console.log(content.value)
    // console.log('ahihi', content.value)
    if (history && content.value && content.value.currentChapter !== history.value.currentChapter) { // fix case navigate chapter and refresh page
        content.value.currentChapter = history.value.currentChapter
        content.value.recentlyRead = history.value.recentlyRead
    }
    const chapter = content.value?.chapters.find(item => item['_id'] === content.value?.currentChapter)
    // saveHistory()
    isLoading.value = true
    await fetchChapterDetail(chapter?.['url'] || '')
    // observeImages()

    // fix trường hợp hiển thị popup upgrade nhưng chưa countdown show ads xong
    const isShowPopupUpgrade = localStorage.getItem('isShowPopupUpgrade') || 'false'
    if (isShowPopupUpgrade == 'true' && checkLicense()) {
        openModal()
    }
})
</script>

<style scoped>
.image-container {
    width: 100%;
    position: relative;
}

.image-container::before {
    content: "";
    display: block;
    /* Tạo một khoảng trống để tính toán chiều cao dựa trên tỉ lệ gốc */
}

.img-chapter {
    width: 100%;
    height: auto;
    object-fit: contain;
}

ion-icon {
    display: flex;
    align-items: center;
    margin-top: 2px;
}

.navigate-chapter {
    display: flex;
    align-items: center;
    margin-left: 8px;
    margin-right: 8px;
}

/* .img-chapter {
    width: 100%;
    height: auto;
    object-fit: contain;
}

@media (min-width: 768px) {
    .img-chapter {
        max-width: 40%;
        height: auto;
        display: block;
        -webkit-user-select: none;
        margin: auto;
        background-color: hsl(0, 0%, 90%);
        transition: background-color 300ms;
    }
} */

.disabled {
    pointer-events: none;
    opacity: 0.5;
}

ion-menu {
    pointer-events: auto !important;
}

ion-modal#ads-modal {
    --width: fit-content;
    --min-width: 250px;
    --height: fit-content;
    --border-radius: 6px;
    --box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
}

ion-card {
    margin: 0 !important;
}

.spinner-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

ion-spinner {
    margin-top: 12px;
}

.md ion-title.title-header {
    margin-right: 30px;
}
</style>