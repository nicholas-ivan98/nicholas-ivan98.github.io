<template>
    <ion-card @click="navigateContentDetail()">
        <ion-img class="content-thumbnail" :src="props.content.thumbnail"></ion-img>
        <ion-label class="content-title">{{ props.content.title }}</ion-label>
    </ion-card>
</template>

<script setup lang="ts">
import { IonCard, IonLabel, IonImg } from '@ionic/vue';
import { PropType } from 'vue';
import Content from '@/models/Content'
import { useRouter } from 'vue-router';
import Crypto from '@/utils/Crypto';

const props = defineProps({
    content: {
        type: Object as PropType<Content>,
        required: true
    }
});
const router = useRouter()

function navigateContentDetail() {
    const contentEncrypted = Crypto.encrypt(JSON.stringify(props.content))
    router.push({ path: '/detail', query: { content: contentEncrypted } })
}
</script>

<style scoped>
/* @media only screen and (min-width: 430px) {
    ion-card {
        width: 110px;
        height: 212px;
        margin: 12px auto;
    }

    .content-thumbnail {
        width: 100%;
        height: 156px;
        object-fit: cover;
    }
}

@media only screen and (min-width: 768px) {
    ion-card {
        width: 158px;
        height: 286px;
        margin: 12px auto;
    }

    .content-thumbnail {
        width: 100%;
        height: 226px;
        object-fit: cover;
    }
}

@media only screen and (min-width: 820px) {
    ion-card {
        width: 172px;
        height: 304px;
        margin: 12px auto;
    }

    .content-thumbnail {
        width: 100%;
        height: 246px;
        object-fit: cover;
    }
}

@media only screen and (min-width: 1024px) {
    ion-card {
        width: 152px;
        height: 280px;
        margin: 12px auto;
    }

    .content-thumbnail {
        width: 100%;
        height: 218px;
        object-fit: cover;
    }
}

@media only screen and (min-width: 1400px) {
    ion-card {
        width: 174px;
        height: 310px;
        margin: 12px auto;
    }

    .content-thumbnail {
        width: 100%;
        height: 248px;
        object-fit: cover;
    }
}

@media only screen and (max-width: 415px) {
    ion-card {
        width: 104px;
        height: 200px;
        margin: 12px auto;
    }

    .content-thumbnail {
        width: 100%;
        height: 148px;
        object-fit: cover;
    }
}

@media only screen and (max-width: 390px) {
    ion-card {
        width: 98px;
        height: 200px;
        margin: 12px auto;
    }

    .content-thumbnail {
        width: 100%;
        height: 140px;
        object-fit: cover;
    }
}

@media only screen and (max-width: 375px) {
    ion-card {
        width: 92px;
        height: 186px;
        margin: 12px auto;
    }

    .content-thumbnail {
        width: 100%;
        height: 132px;
        object-fit: cover;
    }
}

@media only screen and (max-width: 360px) {
    ion-card {
        width: 88px;
        height: 184px;
        margin: 12px auto;
    }

    .content-thumbnail {
        width: 100%;
        height: 126px;
        object-fit: cover;
    }
}

@media only screen and (max-width: 320px) {
    ion-card {
        width: 74px;
        height: 160px;
        margin: 12px auto;
    }

    .content-thumbnail {
        width: 100%;
        height: 106px;
        object-fit: cover;
    }
} */

ion-card {
    width: 110px;
    height: 212px;
    margin: 12px auto;
}

ion-img.content-thumbnail {
    width: 100%;
    height: 156px;
    object-fit: cover;
}

.content-title {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin: 8px;
    font-weight: medium;
    font-size: small;
}
</style>