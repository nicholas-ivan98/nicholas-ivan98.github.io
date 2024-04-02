<template>
    <ion-page class="can-go-back">
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start" @click="() => router.back()">
                    <ion-icon :ios="chevronBack" :md="arrowBack" style="width: 24px; height: 24px; margin-left: 8px;" color="primary"></ion-icon>
                    <ion-label style="margin-left: 4px; font-size: medium;" color="primary">Back</ion-label>
                </ion-buttons>
                <ion-title style="text-align: center; margin-right: 80px;">Upgrade to Premium</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content @ionChange="planChange" :fullscreen="true" color="light" class="ion-padding">
            <ion-segment value="year">
                <ion-segment-button value="year">
                    <ion-label>One Year</ion-label>
                </ion-segment-button>
                <ion-segment-button value="lifetime">
                    <ion-label>Lifetime</ion-label>
                </ion-segment-button>
            </ion-segment>
            <div class="payment-panel">
                <h1>{{ plan.price }} USD</h1>
                <p class="plan-description">{{ plan.description }}</p>
                <div id="paypal-button-container"></div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
    import { IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonLabel, onIonViewDidEnter, onIonViewWillLeave, IonIcon, IonSegment, IonSegmentButton } from '@ionic/vue'
    import { chevronBack, arrowBack } from 'ionicons/icons';
    import { ref, computed } from 'vue'
    import axios from 'axios'
    import { URL } from '@/utils/Constant'
    import { useRouter } from 'vue-router';
    import { useStore } from 'vuex';

    const store = useStore();
    const router = useRouter()
    const account = computed(() => store.getters['account/getAccount'])

    // const apikey = localStorage.getItem('apiKey')
    const apikey = account.value.apikey
    const plans = {
        year: {
            price: '39.99',
            description: 'Manga one year premium license'
        },
        lifetime: {
            price: '59.99',
            description: 'Manga lifetime premium license'
        }
    }

    let plan = ref(plans.year)

    function clearPaypal() {
        document.getElementById('paypal-button-container').innerHTML = ''
    }

    function initPaypal() {
        const unit = {
            amount: { currency_code: 'USD', value: plan.value.price },
            description: plan.value.description
        }
        paypal.Buttons({
            style: { layout: 'vertical', color: 'gold', shape: 'rect', label: 'paypal'},
            createOrder: (data, actions) => {
                return actions.order.create({
                    purchase_units: [unit],
                    application_context: {
                        brand_name: 'AppsBlack - Manga Reader',
                        shipping_preference: 'NO_SHIPPING',
                        return_url: 'https://apps.black'
                    }
                })
            },
            onApprove: async (data, actions) => {
                const result = await axios.post(URL.LICENSE_SUBMIT, {
                    order_id: data.orderID
                }, { headers: { apikey }})
                // Tai day, sau khi thanh toan thanh cong
                // thi back ra man hinh setting
                // goi lai api getinfo de lay danh sach license
                // console.log('payment: ', result)
                const response = await axios.get(URL.USER_INFO, { headers: { apikey } })
                if(response.data.data.licenses.length > 0) {
                    account.value.licenses = response.data.data.licenses
                    store.dispatch('account/setAccount', account.value)
                }
                router.back()
            }
         }).render('#paypal-button-container')
    }

    function planChange(event) {
        plan.value = plans[event.detail.value]
        clearPaypal()
        initPaypal()
    }

    onIonViewDidEnter(() => {
        initPaypal()
    })
    onIonViewWillLeave(() => clearPaypal)
</script>

<style scoped>
    .payment-panel {
        text-align: center;
        padding-top: 20px;
    }
    #paypal-button-container {
        width: auto;
        max-width: 400px;
        margin: auto;
    }
    h1 {
        font-size: 40px;
        margin-bottom: 0;
    }
    .plan-description {
        margin-top: 5px;
        margin-bottom: 40px;
    }
</style>