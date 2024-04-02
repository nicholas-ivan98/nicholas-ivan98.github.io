<template>
    <div>
        <h4>Info</h4>
        <ion-label v-html="renderInfoContent()"></ion-label>
        <h4>Description</h4>
        <ion-label>{{ props.content?.description }}</ion-label>
    </div>
</template>

<script setup lang="ts">
import { IonContent, IonLabel } from '@ionic/vue';
import Content from '@/models/Content'
import { ref, PropType } from 'vue';

const props = defineProps({
    content: {
        type: Object as PropType<Content | null>,
        required: true,
        default: null
    }
});

function renderInfoContent() {
    let infoString = ''
    if(props.content?.alternative) {
        infoString += props.content.alternative
    }
    if(props.content?.author) {
        infoString += `<br><br> Author: ${props.content.author}`
    }
    if(props.content?.genres) {
        infoString += `<br><br> Genres: ${props.content.genres}`
    }
    if(props.content?.status) {
        infoString += `<br><br> Status: ${props.content.status}`
    }
    if(props.content?.view) {
        infoString += `<br><br> View: ${props.content.view}`
    }
    if(props.content?.lastUpdate) {
        infoString += `<br><br> Last update: ${props.content.lastUpdate}`
    }
    return infoString
}
</script>

<style scoped>
/* ion-content {
    --overflow: hidden;
    --overscroll-behavior-y: none;
} */

h4 {
    margin: 18px 8px 18px 8px
}

ion-label {
    margin-left: 8px;
    margin-right: 8px;
    display: flex;
    margin-top: 8px;
}
</style>