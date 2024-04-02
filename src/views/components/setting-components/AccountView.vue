<template>
    <ion-list :inset="true">
        <ion-item v-if="!account.licenses || (account.licenses && account.licenses.length === 0) || isExpired()">
            <ion-label @click="navigateUpgradePage">Upgrade to Premium</ion-label>
        </ion-item>
        <ion-item v-if="(account.licenses && account.licenses.length !== 0)" id="open-modal">
            <ion-label @click="displayAlertLicenses">Premium {{ showTextExpired() }}</ion-label>
        </ion-item>
        <ion-item v-if="!account.apikey">
            <ion-label @click="displayAlertLogin">Login by Email</ion-label>
        </ion-item>
        <ion-item v-if="account.apikey" id="open-action-sheet" @click="displayLogoutActionSheet">
            <ion-label>Logout</ion-label>
        </ion-item>
    </ion-list>
    <ion-modal id="license-modal" :is-open="isOpen" @didDismiss="didDismissModal">
        <h3>Licenses</h3>
        <ion-content>
            <ion-item v-for="item in account.licenses" :key="item">
                <ion-grid>
                    <ion-row>
                        <ion-col>
                            <ion-label class="license-info">
                                Purchase Date: {{ moment(item['created_at']).format('YYYY-MM-DD HH:mm:ss') }}
                            </ion-label>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col>
                            <ion-label class="expired-info">
                                Expired Date: {{ moment(item['expired_at']).format('YYYY-MM-DD HH:mm:ss') }}
                            </ion-label>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </ion-item>
        </ion-content>
        <ion-button @click="dismissModal">OK</ion-button>
    </ion-modal>
    <!-- <ion-action-sheet
        trigger="open-action-sheet"
        class="my-custom-class"
        :buttons="actionSheetButtons"
    ></ion-action-sheet> -->
</template>

<script setup lang="ts">
import { IonGrid, IonCol, IonRow, IonButton, IonContent, IonModal, IonList, IonItem, IonLabel, alertController, toastController, loadingController, actionSheetController, IonAccordion } from '@ionic/vue';
import axios from 'axios';
import { URL, app } from '@/utils/Constant';
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import Content from '@/models/Content';
import moment from 'moment';

const store = useStore();
const account = computed(() => store.getters['account/getAccount'])
const emailInputValue = ref('');
const isOpen = ref(false)
// const isSignedIn = ref(false)
// const isUpgradedLicense = ref(false)
const router = useRouter();
let loading: HTMLIonLoadingElement;

async function bindViewAccount() {
    const apikey = account.value.apikey
    try {
        if (apikey) {
            console.log('apikey: ', apikey)
            // isSignedIn.value = true
            const response = await axios.get(URL.USER_INFO, { headers: { apikey } })
            console.log('User info: ', response.data)
            account.value.licenses = response.data.data.licenses
            store.dispatch('account/setAccount', account.value)
        }
    } catch (err: any) {
        console.error('Error:', err);
        if (err.response.status === 403 && err.response.data.success === false && err.response.data.msg === 'Your apikey not existed') {
            handleLogoutThisDevice()
        }
    }
    // if (account.value.apikey) {
    //     isSignedIn.value = true
    //     if(account.value.licenses.length > 0) {
    //         isUpgradedLicense.value = true
    //     }
    // } else {
    //     isSignedIn.value = false
    //     isUpgradedLicense.value = false
    // }
}

function dismissModal() {
    (document.querySelector('#license-modal') as HTMLIonModalElement).dismiss()
    isOpen.value = false
}

function didDismissModal() {
    isOpen.value = false
}

function isExpired() {
    const currentDate = new Date()
    const isExpired = account.value.licenses.find((license: any) => new Date(license['expired_at']) < currentDate && license['app'] === app)
    console.log(isExpired)
    if (isExpired) {
        return true
    }
    return false
}

function showTextExpired() {
    if (isExpired()) {
        return "Expired"
    }
    return "License"
}

function navigateUpgradePage() {
    if (account.value.apikey) {
        router.push('/payment')
    } else {
        displayAlertNotLogin()
    }
}

async function displayAlertLicenses() {
    // let messageLicenses = ""
    // account.value.licenses.forEach((item: any) => {
    //     const templateMessage = `
    //     Purchase Date:
    //     ${item['created_at']}
    //     Expired Date:
    //     ${item['expired_at']}
    //     ---------------------`;
    //     messageLicenses += templateMessage
    // })
    // console.log(messageLicenses)
    // const alert = await alertController.create({
    //     header: 'Licenses',
    //     message: messageLicenses,
    //     buttons: [
    //       {
    //         text: 'OK',
    //         handler: () => {
    //           alert.dismiss();
    //         },
    //       },
    //     ]
    // })
    // await alert.present()
    isOpen.value = true
}

async function displayAlertNotLogin() {
    const alert = await alertController.create({
        header: 'Please login before upgrading to Premium',
        buttons: [
            {
                text: 'Cancel',
                role: 'cancel'
            },
            {
                text: 'Login',
                role: 'confirm',
                handler: displayAlertLogin,
            },
        ]
    });
    await alert.present();
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
            // isSignedIn.value = true

            const apikey = result.data.apikey
            const responseUserInfo = await axios.get(URL.USER_INFO, { headers: { apikey } })
            const resultUserInfo = responseUserInfo.data
            // console.log('User info: ', resultUserInfo)
            if (resultUserInfo.data.licenses.length > 0) {
                account.value.licenses = resultUserInfo.data.licenses
                store.dispatch('account/setAccount', account.value)
                // isUpgradedLicense.value = true
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

async function showToast(msg: string) {
    const toast = await toastController.create({
        message: msg,
        duration: 1500,
        position: 'bottom',
    });
    await toast.present();
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

async function displayLogoutActionSheet() {
    const actionSheet = await actionSheetController.create({
        buttons: [
            {
                text: 'Logout for this device',
                role: 'destructive',
                cssClass: 'custom-sheet-button',
                handler: handleLogoutThisDevice
            },
            {
                text: 'Logout all devices',
                role: 'destructive',
                cssClass: 'custom-sheet-button',
                handler: handleLogoutAllDevices
            }
        ],
    });
    await actionSheet.present();
}

function handleLogoutThisDevice() {
    store.dispatch('account/clearAccount')
    store.dispatch('favorites/clearFavorites')
    // isSignedIn.value = false
}

async function handleLogoutAllDevices() {
    // const apiKey = localStorage.getItem('apikey')
    const apikey = account.value.apikey
    try {
        if (apikey) {
            await showLoading()
            const response = await axios.get(URL.LOGOUT_ALL_DEVICES, { headers: { apikey } })
            dismissLoading()
            handleLogoutThisDevice()
        }
    } catch (err) {
        console.error('Error:', err);
        showToast("An error occurred. Please try again later!")
        dismissLoading()
    }
}

// watch(account, (newValue, oldValue) => {
//     console.log('new value: ', newValue)
//     bindViewAccount()
// })

bindViewAccount()

</script>

<style scoped>
ion-label {
    /* font-weight: bold; */
}

ion-content {
    height: 150px;
}

ion-action-sheet.md button {
    color: red;
}

.custom-sheet-button {
    --color: red;
}

ion-modal#license-modal {
    --width: fit-content;
    --min-width: 350px;
    --height: 350px;
    --border-radius: 6px;
    --box-shadow: 0 28px 48px rgba(83, 22, 22, 0.4);
}

ion-modal#license-modal h3 {
    margin: 20px 20px 20px 20px;
}

ion-modal ion-button {
    margin: 8px 8px 12px 8px;
}

/* .license-info {
    margin: 8px 8px 2px 8px;
}

.expired-info {
    margin: 2px 8px 8px 8px;
} */
</style>