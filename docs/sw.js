if(!self.define){let s,e={};const l=(l,i)=>(l=new URL(l+".js",i).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(i,n)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let t={};const u=s=>l(s,r),a={module:{uri:r},exports:t,require:u};e[r]=Promise.all(i.map((s=>a[s]||u(s)))).then((s=>(n(...s),t)))}}define(["./workbox-3e911b1d"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/ChaptersView-BkTgx3hw.css",revision:null},{url:"assets/ChaptersView-DJKDEmmM.js",revision:null},{url:"assets/ChaptersView-legacy-BSdNv864.js",revision:null},{url:"assets/ContentDetailPage-BUuwLUy9.js",revision:null},{url:"assets/ContentDetailPage-CbOZw55y.css",revision:null},{url:"assets/ContentDetailPage-legacy-9o1xVKjN.js",revision:null},{url:"assets/ContentGridVerticalView-CgiFBgzA.js",revision:null},{url:"assets/ContentGridVerticalView-legacy-BzoBRxto.js",revision:null},{url:"assets/ContentGridVerticalView-xi0SlSfo.css",revision:null},{url:"assets/ContentPage-BwGqH-r1.js",revision:null},{url:"assets/ContentPage-DVKhMET_.css",revision:null},{url:"assets/ContentPage-legacy-4u4Mqpbn.js",revision:null},{url:"assets/Crypto-B5v7eY2x.js",revision:null},{url:"assets/Crypto-legacy-GZs-V5AX.js",revision:null},{url:"assets/focus-visible-legacy-CdO5cX4I.js",revision:null},{url:"assets/focus-visible-supuXXMI.js",revision:null},{url:"assets/index-BuRO-P3j.css",revision:null},{url:"assets/index-C_Vg7UDb.js",revision:null},{url:"assets/index-legacy-Bu7o8hGU.js",revision:null},{url:"assets/index9-BXX2S5On.js",revision:null},{url:"assets/index9-legacy-BbyAOfo1.js",revision:null},{url:"assets/input-shims-DRIWbwLn.js",revision:null},{url:"assets/input-shims-legacy-D80gYNMv.js",revision:null},{url:"assets/ios.transition-CogPRtQt.js",revision:null},{url:"assets/ios.transition-legacy-Cda08fX4.js",revision:null},{url:"assets/md.transition-BvxyBLA-.js",revision:null},{url:"assets/md.transition-legacy-D420E9c1.js",revision:null},{url:"assets/PaymentPage-BVMlnrF0.css",revision:null},{url:"assets/PaymentPage-CUirH8WX.js",revision:null},{url:"assets/PaymentPage-legacy-Bo1FBpIN.js",revision:null},{url:"assets/polyfills-legacy-BbvjeT0l.js",revision:null},{url:"assets/ReadingPage-ad_P6glv.js",revision:null},{url:"assets/ReadingPage-D4iBcH2E.css",revision:null},{url:"assets/ReadingPage-legacy-COFK_GuD.js",revision:null},{url:"assets/SearchPage-C7-EB_SY.js",revision:null},{url:"assets/SearchPage-Clt5uvpU.css",revision:null},{url:"assets/SearchPage-legacy-CndNFyFU.js",revision:null},{url:"assets/SettingPage-CTdShgaZ.css",revision:null},{url:"assets/SettingPage-DozO7RuW.js",revision:null},{url:"assets/SettingPage-legacy-DQY15sPB.js",revision:null},{url:"assets/status-tap-BB1nVbsc.js",revision:null},{url:"assets/status-tap-legacy-ww6L5tNu.js",revision:null},{url:"assets/swipe-back-DC1-vwSu.js",revision:null},{url:"assets/swipe-back-legacy-M3v7YuBU.js",revision:null},{url:"assets/web-Bk5ge1gP.js",revision:null},{url:"assets/web-legacy-BFlpqFF7.js",revision:null},{url:"index.html",revision:"d63fbb763752256b0d0fc99bb795b135"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"./img/icons/icon_square.png",revision:"62152a6fa998d694c8c386fb9ddad7dd"},{url:"manifest.webmanifest",revision:"94e3550b5df11fffa7dcce7483f30523"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
