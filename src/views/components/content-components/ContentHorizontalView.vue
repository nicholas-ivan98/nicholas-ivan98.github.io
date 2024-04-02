<template>
  <div class="horizontal-scroll" v-if="isWeb">
    <ion-item class="item-horizontal-scroll" v-for="item in props.contentList" :key="item.url">
      <ContentView :content="item"></ContentView>
    </ion-item>
  </div>
  <Swiper :slidesPerView="4" :freeMode="true" :loop="true" v-else>
    <SwiperSlide class="swiper-slide-custom" v-for="item in props.contentList" :key="item.url">
      <ContentView :content="item" style="margin: 16px;"></ContentView>
    </SwiperSlide>
  </Swiper>
</template>


<script setup lang="ts">
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonIcon, IonButton, IonLabel, IonList, IonItem, isPlatform } from '@ionic/vue';
import { ref, PropType, computed } from 'vue';
import Content from '@/models/Content'
import ContentView from './ContentView.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css/free-mode';
import 'swiper/css';

const props = defineProps({
  contentList: {
    type: Array as PropType<Content[]>,
    required: true
  }
});

const isWeb = computed(() => isPlatform('desktop'));

</script>

<style scoped>
.swiper-slide-custom {
  flex-shrink: 1;
  margin-right: 18px;
}

.horizontal-scroll {
  overflow-x: scroll;
  white-space: nowrap;
  width: 100%;
  display: flex;
}

.item-horizontal-scroll {
  flex-shrink: 0;
}
</style>