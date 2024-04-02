<template>
    <div>
        <div class="ion-button-container">
            <!-- <div class="icon-container">
                <ion-icon :ios="swapVertical" :md="swapVerticalSharp"></ion-icon>
            </div> -->
            <!-- <ion-select interface="popover" placeholder="Sort Chapters" v-model="selectedOrder"
                @ionChange="handleSelectChange">
                <ion-select-option value="asc">Ascending</ion-select-option>
                <ion-select-option value="desc">Descending</ion-select-option>
            </ion-select> -->
            <ion-button color="light" @click="handleSelectChange">
                <div class="icon-container">
                    <ion-icon :ios="swapVertical" :md="swapVerticalSharp"></ion-icon>
                </div>
                {{ selectedOrder === 'asc' ? 'Ascending' : 'Descending' }}
            </ion-button>
        </div>
        <div class="chapter-container">
            <ion-chip v-for="item in orderedChapters" :key="item['_id']" @click="navigateChapterDetail(item['_id'])"
                :color="hasHistory(item['_id']) ? 'secondary' : ''">
                <ion-label :class="{ 'bold-label': hasHistory(item['_id']) }" style="font-size: 14px;">{{ item['_id']
                    }}</ion-label>
            </ion-chip>
        </div>
    </div>
</template>

<script setup lang="ts">
import { IonChip, IonLabel, IonSelect, IonSelectOption, IonIcon, IonButton, IonButtons } from '@ionic/vue';
import { swapVertical, swapVerticalSharp } from 'ionicons/icons';
import Content from '@/models/Content'
import { useRouter } from 'vue-router'
import { PropType, computed } from 'vue';
import { useStore } from 'vuex';
import Crypto from '@/utils/Crypto';

const props = defineProps({
    content: {
        type: Object as PropType<Content | null>,
        required: true,
        default: null
    },
    callback: {
        type: Function as PropType<(id: number) => void>,
        required: false,
        default: undefined
    }
});
const router = useRouter()
const store = useStore();
const selectedOrder = computed(() => store.getters['settings/getOrderChapters'])
const history = computed(() => store.getters['histories/getHistory'](props.content?.url))

const orderedChapters = computed(() => {
    if (selectedOrder.value === 'desc') {
        return props.content?.chapters.slice().reverse();
    } else {
        return props.content?.chapters;
    }
});

function handleSelectChange() {
    let order = selectedOrder.value
    if(order === 'asc') {
        order = 'desc'
    } else {
        order = 'asc'
    }
    store.dispatch('settings/setOrderChapters', order)
}

function hasHistory(id: string) {
    return history.value && history.value.currentChapter === id
}

function navigateChapterDetail(idChapter: string) {
    if (props.callback) {
        props.callback(Number(idChapter))
    } else {
        if (props.content) {
            props.content.currentChapter = Number(idChapter)
            store.dispatch('histories/setHistory', props.content)
            const contentEncrypted = Crypto.encrypt(JSON.stringify(props.content))
            router.push({ path: '/reading', query: { content: contentEncrypted } })
        }
    }
}
</script>

<style scoped>
/* ion-content {
    --overflow: hidden;
    --overscroll-behavior-y: none;
} */

ion-chip {
    min-width: 55px;
    /* min-height: 50px; */
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 0 !important;
}

.ion-button-container {
    margin: 12px 0px 12px 0px;
    display: flex;
    justify-content: flex-end;
}

/* ion-icon.label-select {
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    margin: 0;
} */

.icon-container {
    display: flex;
    width: 100%;
    align-items: flex-end;
    flex-direction: column;
    margin: 0px 4px;
}

ion-button {
    /* display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: end;
    flex: 1; */
}

.chapter-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(55px, 1fr));
    justify-items: center;
    grid-gap: 6px;
    margin: 0 2px;
}

.bold-label {
    font-weight: bold;
}
</style>