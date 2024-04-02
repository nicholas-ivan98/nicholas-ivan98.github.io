import { createRouter, createWebHistory, createWebHashHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import { onBeforeMount } from 'vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/content'
  },
  {
    path: '/content',
    name: 'ContentPage',
    component: () => import('@/views/ContentPage.vue')
  },
  {
    path: '/setting',
    name: 'SettingPage',
    component: () => import('@/views/setting/SettingPage.vue')
  },
  {
    path: '/payment',
    name: 'PaymentPage',
    component: () => import('@/views/payment/PaymentPage.vue')
  },
  {
    path: '/detail',
    name: 'DetailPage',
    component: () => import('@/views/content-detail/ContentDetailPage.vue')
  },
  {
    path: '/reading',
    name: 'ReadingPage',
    component: () => import('@/views/reading/ReadingPage.vue')
  },
  {
    path: '/search',
    name: 'SearchPage',
    component: () => import('@/views/search/SearchPage.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// onBeforeMount(() => {
//   router.beforeEach((to, from, next) => {
//     // Ngăn chặn sự kiện swipe back ở đây
//     if (from.name === null) {
//       window.history.pushState(null, '', window.location.href);
//     }
//     next();
//   });
// });


export default router
