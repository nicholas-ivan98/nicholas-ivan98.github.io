if(!self.define){let s,e={};const l=(l,i)=>(l=new URL(l+".js",i).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(i,n)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let t={};const u=s=>l(s,r),a={module:{uri:r},exports:t,require:u};e[r]=Promise.all(i.map((s=>a[s]||u(s)))).then((s=>(n(...s),t)))}}define(["./workbox-3e911b1d"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/ChaptersView-BkTgx3hw.css",revision:null},{url:"assets/ChaptersView-gum78SZA.js",revision:null},{url:"assets/ChaptersView-legacy-BOnHvOsh.js",revision:null},{url:"assets/ContentDetailPage-B7k8Y37X.js",revision:null},{url:"assets/ContentDetailPage-CbOZw55y.css",revision:null},{url:"assets/ContentDetailPage-legacy-Dr1HQ6d9.js",revision:null},{url:"assets/ContentGridVerticalView-legacy-CIWkKLyc.js",revision:null},{url:"assets/ContentGridVerticalView-t3ccOOPW.js",revision:null},{url:"assets/ContentGridVerticalView-xi0SlSfo.css",revision:null},{url:"assets/ContentPage-DVKhMET_.css",revision:null},{url:"assets/ContentPage-Dwpi9q_e.js",revision:null},{url:"assets/ContentPage-legacy-lrntH2HY.js",revision:null},{url:"assets/Crypto-DzXeDmVc.js",revision:null},{url:"assets/Crypto-legacy-RuhEVLwM.js",revision:null},{url:"assets/focus-visible-legacy-CdO5cX4I.js",revision:null},{url:"assets/focus-visible-supuXXMI.js",revision:null},{url:"assets/index-BuRO-P3j.css",revision:null},{url:"assets/index-DrheO35R.js",revision:null},{url:"assets/index-legacy-CStsiYGi.js",revision:null},{url:"assets/index9-CesKFRSi.js",revision:null},{url:"assets/index9-legacy-CS5Qsjmb.js",revision:null},{url:"assets/input-shims-DZ1k3BEA.js",revision:null},{url:"assets/input-shims-legacy-CpzwB5fs.js",revision:null},{url:"assets/ios.transition-Cfqki2Bq.js",revision:null},{url:"assets/ios.transition-legacy-Df_r8zyR.js",revision:null},{url:"assets/md.transition-CFbIi5Kn.js",revision:null},{url:"assets/md.transition-legacy-efPI6Mwf.js",revision:null},{url:"assets/PaymentPage-BVMlnrF0.css",revision:null},{url:"assets/PaymentPage-legacy-C7-HXEOE.js",revision:null},{url:"assets/PaymentPage-LPvmJIEz.js",revision:null},{url:"assets/polyfills-legacy-Z_mw-4ew.js",revision:null},{url:"assets/ReadingPage-D4iBcH2E.css",revision:null},{url:"assets/ReadingPage-DKjeMeFW.js",revision:null},{url:"assets/ReadingPage-legacy-B6U3jcmH.js",revision:null},{url:"assets/SearchPage-BUW90nuM.js",revision:null},{url:"assets/SearchPage-Clt5uvpU.css",revision:null},{url:"assets/SearchPage-legacy-DYMAInpN.js",revision:null},{url:"assets/SettingPage-BErNpBvt.js",revision:null},{url:"assets/SettingPage-CTdShgaZ.css",revision:null},{url:"assets/SettingPage-legacy-DuIG9O4k.js",revision:null},{url:"assets/status-tap-CIxm0axz.js",revision:null},{url:"assets/status-tap-legacy-BYbBtQ4U.js",revision:null},{url:"assets/swipe-back-C63Kir94.js",revision:null},{url:"assets/swipe-back-legacy-BZiI7-AZ.js",revision:null},{url:"assets/web-CmHgTJ-3.js",revision:null},{url:"assets/web-legacy-2_ucuX-U.js",revision:null},{url:"assets/workbox-window.prod.es5-Czr5uBqZ.js",revision:null},{url:"assets/workbox-window.prod.es5-legacy-V4IhE9Vo.js",revision:null},{url:"index.html",revision:"0703698e0617d073b878dc383653fe39"},{url:"./img/icons/icon_square.png",revision:"62152a6fa998d694c8c386fb9ddad7dd"},{url:"manifest.webmanifest",revision:"69e3abd0f03b7c70fe2d15f1fd0327b3"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
