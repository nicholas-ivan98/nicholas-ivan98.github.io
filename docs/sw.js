if(!self.define){let s,e={};const l=(l,i)=>(l=new URL(l+".js",i).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(i,n)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let t={};const u=s=>l(s,r),a={module:{uri:r},exports:t,require:u};e[r]=Promise.all(i.map((s=>a[s]||u(s)))).then((s=>(n(...s),t)))}}define(["./workbox-7cfec069"],(function(s){"use strict";self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"assets/ChaptersView-BkTgx3hw.css",revision:null},{url:"assets/ChaptersView-C7Plqtlw.js",revision:null},{url:"assets/ChaptersView-legacy-tYCoJccv.js",revision:null},{url:"assets/ContentDetailPage-BRfn59vS.js",revision:null},{url:"assets/ContentDetailPage-CbOZw55y.css",revision:null},{url:"assets/ContentDetailPage-legacy-DXYeRLvv.js",revision:null},{url:"assets/ContentGridVerticalView-CJsQBZTe.js",revision:null},{url:"assets/ContentGridVerticalView-legacy-CgxBtfJ9.js",revision:null},{url:"assets/ContentGridVerticalView-xi0SlSfo.css",revision:null},{url:"assets/ContentPage-BP9J-P9n.js",revision:null},{url:"assets/ContentPage-DVKhMET_.css",revision:null},{url:"assets/ContentPage-legacy-BCuvR0Bm.js",revision:null},{url:"assets/Crypto-legacy-BKmGYARu.js",revision:null},{url:"assets/Crypto-PNX7tcRl.js",revision:null},{url:"assets/focus-visible-legacy-CdO5cX4I.js",revision:null},{url:"assets/focus-visible-supuXXMI.js",revision:null},{url:"assets/index-BuRO-P3j.css",revision:null},{url:"assets/index-CmxvV9YJ.js",revision:null},{url:"assets/index-legacy-Q6l2cFTG.js",revision:null},{url:"assets/index9-CyxTZXjN.js",revision:null},{url:"assets/index9-legacy-ec7eibrV.js",revision:null},{url:"assets/input-shims-CN0Pw24P.js",revision:null},{url:"assets/input-shims-legacy-BDUnKIea.js",revision:null},{url:"assets/ios.transition-legacy-pMni67tl.js",revision:null},{url:"assets/ios.transition-TjMc6wfx.js",revision:null},{url:"assets/md.transition-CWLXS9xu.js",revision:null},{url:"assets/md.transition-legacy-CuJxjhDS.js",revision:null},{url:"assets/PaymentPage-BVMlnrF0.css",revision:null},{url:"assets/PaymentPage-D9vwYbay.js",revision:null},{url:"assets/PaymentPage-legacy-DrzCGLXh.js",revision:null},{url:"assets/polyfills-legacy-C0gCTIhC.js",revision:null},{url:"assets/ReadingPage-CuMyBAo3.js",revision:null},{url:"assets/ReadingPage-D4iBcH2E.css",revision:null},{url:"assets/ReadingPage-legacy-DPAHr6nE.js",revision:null},{url:"assets/SearchPage-Clt5uvpU.css",revision:null},{url:"assets/SearchPage-CVdWSRBI.js",revision:null},{url:"assets/SearchPage-legacy-CFbD44kr.js",revision:null},{url:"assets/SettingPage-CTdShgaZ.css",revision:null},{url:"assets/SettingPage-D1Iwf3PU.js",revision:null},{url:"assets/SettingPage-legacy-CAypD6B5.js",revision:null},{url:"assets/status-tap-legacy-DpSQwMjR.js",revision:null},{url:"assets/status-tap-vW6OjRU0.js",revision:null},{url:"assets/swipe-back-5EthNw1p.js",revision:null},{url:"assets/swipe-back-legacy-DrpcgGyA.js",revision:null},{url:"assets/web-cudDBFLO.js",revision:null},{url:"assets/web-legacy-CnkDPX91.js",revision:null},{url:"assets/workbox-window.prod.es5-Czr5uBqZ.js",revision:null},{url:"assets/workbox-window.prod.es5-legacy-V4IhE9Vo.js",revision:null},{url:"index.html",revision:"56b94bcf6ad6e2ae5f9dac682d90d435"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"./img/icons/icon_square.png",revision:"62152a6fa998d694c8c386fb9ddad7dd"},{url:"manifest.webmanifest",revision:"94e3550b5df11fffa7dcce7483f30523"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
