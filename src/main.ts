import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';
import store from './store';
import VueLazyload from 'vue-lazyload';
// import './registerServiceWorker';
// import { registerSW } from 'virtual:pwa-register'

// const updateSW = registerSW({
//   onOfflineReady() {
//     console.log('offline ahihi')
//   },
// })
// if (navigator.userAgent.match(/(iPad|iPhone|iPod)/g)) {
//   document.body.classList.add('ios-swipe-back-disabled');
// }

// const handleTouchMove = (event: any) => {
//   event.preventDefault();
// };

// document.addEventListener('touchmove', handleTouchMove, { passive: false });

// document.addEventListener('touchmove', function(event: any) {
//   if (event.target.classList.contains('ion-page')) {
//       event.preventDefault();
//   }
// });
// import HammerPlugin from './utils/preventSwipe';
// import { registerSW } from 'virtual:pwa-register'
// registerSW({ immediate: true })
const app = createApp(App)
  .use(IonicVue, {
    hardwareBackButton: false,
    swipeBackEnabled: false,
    innerHTMLTemplatesEnabled: true,
    animated: false
  })
  .use(router)
  .use(store)
  .use(VueLazyload);
  // .use(HammerPlugin);

router.isReady().then(() => {
  app.mount('#app');
});