<template>
  <div class="content-container">
    <ContentView v-for="item in props.contentList" :key="item.url" :content="item" class="item-content"></ContentView>
  </div>
</template>

<script setup lang="ts">
import { IonGrid, IonRow, IonCol, IonItem, IonContent } from '@ionic/vue';
import { PropType, onMounted, onBeforeUnmount, watch } from 'vue';
import Content from '@/models/Content'
import ContentView from './ContentView.vue';

const props = defineProps({
  contentList: {
    type: Array as PropType<Content[]>,
    required: true
  }
});

// function updateGridColumns() {
//   const gridContainer = document.querySelector('.content-container');
//   if (gridContainer) {
//     const gridItems = document.querySelectorAll('.item-content');
//     if (gridItems.length > 0) {
//       const itemWidth = (gridItems[0] as HTMLElement).offsetWidth;
//       const containerWidth = (gridContainer as HTMLElement).offsetWidth;
//       let columns = Math.floor(containerWidth / itemWidth);
//       if (containerWidth > 768) {
//         columns -= 1
//       }
//       (gridContainer as HTMLElement).style.gridTemplateColumns = `repeat(${columns}, minmax(110px, 1fr))`;
//     }
//   }
// }

// onMounted(() => {
  // window.addEventListener('resize', updateGridColumns)
// })

// onBeforeUnmount(() => {
  // window.removeEventListener('resize', updateGridColumns)
// })

// watch(() => props.contentList, (newData) => {
//   if (newData.length > 0) {
//     setTimeout(() => updateGridColumns(), 1)
//   }
// }, { immediate: true })
</script>

<style scoped>
.content-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
  justify-items: center;
  justify-content: center;
  grid-gap: 8px;
  margin: 0 8px;
}
</style>