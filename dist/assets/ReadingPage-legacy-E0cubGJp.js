System.register(["./index-legacy-Y-D5Stn5.js","./Crypto-legacy-BbzbjVY4.js","./ChaptersView-legacy-CMgjcmSA.js"],(function(e,a){"use strict";var t,n,l,i,o,r,d,c,u,s,p,v,m,f,g,h,y,w,_,x,C,b,k,T,S,E,P,I,D,O,A,R,U,G,j,q,N,M,B,F,V,z,H,L,J,$,W,X,Y,Z,K,Q,ee,ae;return{setters:[e=>{t=e.e,n=e.s,l=e.a5,i=e.q,o=e.r,r=e.d,d=e.x,c=e.k,u=e.l,s=e.u,p=e.W,v=e.X,m=e.Y,f=e.f,g=e.m,h=e.M,y=e.y,w=e.B,_=e.C,x=e.z,C=e.G,b=e.am,k=e.T,T=e.ao,S=e.ae,E=e.af,P=e.a3,I=e.D,D=e.ap,O=e.O,A=e.P,R=e.a1,U=e.aq,G=e.J,j=e.a6,q=e.ar,N=e.as,M=e.at,B=e.au,F=e.E,V=e.av,z=e.aw,H=e.ax,L=e.U,J=e.ay,$=e.V,W=e.a7,X=e.a8,Y=e.$,Z=e.a0,K=e.Z,Q=e._},e=>{ee=e.C},e=>{ae=e.C}],execute:function(){var a,te,ne=document.createElement("style");ne.textContent='.image-container[data-v-9ad4d43b]{width:100%;position:relative}.image-container[data-v-9ad4d43b]:before{content:"";display:block}.img-chapter[data-v-9ad4d43b]{width:100%;height:auto;object-fit:contain}ion-icon[data-v-9ad4d43b]{display:flex;align-items:center;margin-top:2px}.navigate-chapter[data-v-9ad4d43b]{display:flex;align-items:center;margin-left:8px;margin-right:8px}.disabled[data-v-9ad4d43b]{pointer-events:none;opacity:.5}ion-menu[data-v-9ad4d43b]{pointer-events:auto!important}ion-modal#ads-modal[data-v-9ad4d43b]{--width: fit-content;--min-width: 250px;--height: fit-content;--border-radius: 6px;--box-shadow: 0 28px 48px rgba(0, 0, 0, .4)}ion-card[data-v-9ad4d43b]{margin:0!important}.spinner-container[data-v-9ad4d43b]{display:flex;justify-content:center;align-items:center}ion-spinner[data-v-9ad4d43b]{margin-top:12px}.md ion-title.title-header[data-v-9ad4d43b]{margin-right:30px}\n',document.head.appendChild(ne),(te=a||(a={})).timestamp=(new Date).getTime(),te.urlManga="";const le={class:"spinner-container"},ie=(e=>(Y("data-v-9ad4d43b"),e=e(),Z(),e))((()=>R("div",{class:"image-container"},null,-1)));e("default",Q(t({__name:"ReadingPage",setup(e){var t;const Y=n(),Z=l(),Q=i(),te=o(),ne=o(""),oe=o(),re=r((()=>{var e;return Q.getters["histories/getHistory"]((null===(e=te.value)||void 0===e?void 0:e.url)||"")})),de=r((()=>Q.getters["account/getAccount"]));let ce=o(15);const ue=o(!1),se=o(!1),pe=o(!1);var ve,me;async function fe(e){try{const a=await p.post(v.CHAPTER_DETAIL,{url:e},{headers:{app:m}});a.data.data.images.forEach(((e,a)=>{setTimeout((()=>{pe.value=!1,function(e){const a=document.querySelector(".image-container");var t=document.createElement("img");t.classList.add("img-chapter"),t.src=e,a.appendChild(t)}(e)}),2e3*(a>4?5:a+1))}))}catch(a){console.log("Chapter detail error: ",a)}}function ge(e){pe.value=!0;const t=(new Date).getTime();if(console.log(de.value.licenses),t-a.timestamp>=25e3&&De()&&(_e(),be()),te.value){te.value.currentChapter=e;const a=te.value.chapters.find((e=>{var a;return e._id===(null===(a=te.value)||void 0===a?void 0:a.currentChapter)})),t=document.querySelector(".content-reading");t&&t.scrollToTop(0),oe.value=[];const n=document.querySelector(".image-container");for(;n.firstChild;)n.removeChild(n.firstChild);Q.dispatch("histories/setHistory",te.value),setTimeout((()=>{fe((null==a?void 0:a.url)||"")}),200)}}async function he(e){if(te.value){let a=te.value.currentChapter;e?a+=1:a-=1,a>=1&&a<=te.value.chapters.length&&ge(a)}}async function ye(){await J.close("end")}function we(e){ge(e),ye()}function _e(){let e=15;const a=setInterval((()=>{e--,ce.value=e,0===e&&clearInterval(a)}),1e3)}function xe(){se.value=!0,ue.value=!1,ce.value=15}function Ce(){xe(),localStorage.setItem("isShowPopupUpgrade",(!1).toString()),a.timestamp=(new Date).getTime()}function be(){se.value=!1,ue.value=!0}function ke(){0!==ce.value?localStorage.setItem("isShowPopupUpgrade",(!0).toString()):(localStorage.setItem("isShowPopupUpgrade",(!1).toString()),a.timestamp=(new Date).getTime()),de.value.apikey?(xe(),Z.push("/payment")):async function(){const e=await $.create({header:"Please enter your email",buttons:[{text:"Cancel",role:"cancel"},{text:"Get code",role:"confirm",handler:Te}],inputs:[{placeholder:"Email",id:"email-input",value:""}],backdropDismiss:!1});await e.present()}()}async function Te(){try{await Pe();const e=document.getElementById("email-input").value;if(console.log("Email:",e),e){ne.value=e;const a=(await p.post(v.GET_OTP_CODE,{email:e},{headers:{app:m}})).data;console.log("Get otp data: ",a.data),async function(e){const a=await $.create({header:e,buttons:[{text:"Cancel",role:"cancel"},{text:"Verify email",role:"confirm",handler:Se}],inputs:[{placeholder:"OTP Code",id:"otp-code-input",value:""}],backdropDismiss:!1});await a.present()}(a.data.msg)}else Ee("Email is null or empty");Ie()}catch(e){console.error("Error:",e),Ee("An error occurred. Please try again later!"),Ie()}}async function Se(){try{const e=document.getElementById("otp-code-input").value;if(await Pe(),e){const a=(await p.post(v.CONFIRM_LOGIN,{email:ne.value,code:e},{headers:{app:m}})).data;Q.dispatch("account/setAccount",a.data);const t=a.data.apikey,n=(await p.get(v.USER_INFO,{headers:{apikey:t}})).data;n.data.licenses.length>0&&(de.value.licenses=n.data.licenses,Q.dispatch("account/setAccount",de.value),Ce()),async function(e){try{const a=(await p.get(v.FAVORITES,{headers:{apikey:e}})).data;Q.dispatch("favorites/setFavorites",a.data.map((e=>new K(e.url,e.title,e.thumbnail,new Date(e.created_at),e._id))))}catch(a){console.log("Get favorites failed",a)}}(t)}else Ee("OTP code is null or empty");Ie()}catch(e){console.error("Error:",e),Ee("An error occurred. Please try again later!"),Ie()}}async function Ee(e){const a=await W.create({message:e,duration:1500,position:"bottom"});await a.present()}async function Pe(){(ve=await X.create({duration:0})).present()}async function Ie(){ve.dismiss()}function De(){return!!(!de.value.licenses||de.value.licenses&&0===de.value.licenses.length||function(){const e=new Date;return!!de.value.licenses.find((a=>new Date(a.expired_at)<e&&a.app===m))}())}return te.value=JSON.parse(ee.decrypt(Y.query.content)),a.urlManga!==(null===(t=te.value)||void 0===t?void 0:t.url)&&(a.timestamp=(new Date).getTime(),a.urlManga=(null===(me=te.value)||void 0===me?void 0:me.url)||""),(new Date).getTime()-a.timestamp>=25e3&&De()&&(_e(),be()),d((async()=>{var e;re&&te.value&&te.value.currentChapter!==re.value.currentChapter&&(te.value.currentChapter=re.value.currentChapter,te.value.recentlyRead=re.value.recentlyRead);const a=null===(e=te.value)||void 0===e?void 0:e.chapters.find((e=>{var a;return e._id===(null===(a=te.value)||void 0===a?void 0:a.currentChapter)}));pe.value=!0,await fe((null==a?void 0:a.url)||""),"true"==(localStorage.getItem("isShowPopupUpgrade")||"false")&&De()&&be()})),(e,a)=>(f(),c(s(L),{class:"can-go-back",id:"main-content",style:{"z-index":"2000"}},{default:u((()=>[g(s(T),{side:"end","content-id":"main-content",swipeGesture:!1},{default:u((()=>[g(s(h),null,{default:u((()=>[g(s(y),null,{default:u((()=>[g(s(w),null,{default:u((()=>[_("Chapters")])),_:1}),g(s(x),{slot:"end"},{default:u((()=>[g(s(C),{icon:s(b),onClick:ye,style:{width:"24px",height:"24px"}},null,8,["icon"])])),_:1})])),_:1})])),_:1}),g(s(k),{class:"ion-padding"},{default:u((()=>[g(ae,{content:te.value,callback:we},null,8,["content"])])),_:1})])),_:1}),g(s(h),{translucent:!0},{default:u((()=>[g(s(y),null,{default:u((()=>[g(s(x),{slot:"start",onClick:a[0]||(a[0]=()=>s(Z).back())},{default:u((()=>[g(s(C),{ios:s(S),md:s(E),style:{width:"24px",height:"24px","margin-left":"4px"},color:"primary"},null,8,["ios","md"]),g(s(P),{style:{"margin-left":"4px","font-size":"medium"},color:"primary"},{default:u((()=>[_("Back")])),_:1})])),_:1}),g(s(w),{class:"title-header",style:{"text-align":"center"}},{default:u((()=>{var e;return[_("Chapter "+I(null===(e=te.value)||void 0===e?void 0:e.currentChapter),1)]})),_:1}),g(s(x),{slot:"end",onClick:a[1]||(a[1]=e=>async function(){await J.open("end")}())},{default:u((()=>[g(s(C),{icon:s(D),style:{width:"24px",height:"24px"}},null,8,["icon"])])),_:1})])),_:1})])),_:1}),g(s(k),{fullscreen:!0,class:"content-reading"},{default:u((()=>[g(s(O),{slot:"fixed","pull-factor":.5,"pull-min":100,"pull-max":200,onIonRefresh:a[2]||(a[2]=e=>{return a=e,void setTimeout((async()=>{var e,t;const n=null===(e=te.value)||void 0===e?void 0:e.chapters.find((e=>{var a;return e._id===(null===(a=te.value)||void 0===a?void 0:a.currentChapter)}));await fe((null==n?void 0:n.url)||""),null===(t=a.target)||void 0===t||t.complete()}),1e3);var a})},{default:u((()=>[g(s(A))])),_:1}),R("div",le,[pe.value?(f(),c(s(U),{key:0})):G("",!0)]),ie,g(s(j),{id:"ads-modal","is-open":ue.value,"can-dismiss":se.value},{default:u((()=>[g(s(q),null,{default:u((()=>[g(s(N),null,{default:u((()=>[g(s(M),null,{default:u((()=>[_("Upgrade to Premium")])),_:1})])),_:1}),g(s(B),null,{default:u((()=>[_(" Please upgrade to Premium to remove ads ")])),_:1}),g(s(x),{style:{margin:"0 18px 18px 12px","justify-content":"flex-end"}},{default:u((()=>[g(s(F),{onClick:ke,style:{"margin-right":"18px"}},{default:u((()=>[_("Upgrade Now")])),_:1}),g(s(F),{onClick:Ce,disabled:s(ce)>0},{default:u((()=>[_("Close "+I(s(ce)>0?`(${s(ce)})`:""),1)])),_:1},8,["disabled"])])),_:1})])),_:1})])),_:1},8,["is-open","can-dismiss"])])),_:1}),g(s(H),null,{default:u((()=>[g(s(y),null,{default:u((()=>{var e,t,n;return[R("div",{slot:"start",class:V(["navigate-chapter",{disabled:1===(null===(e=te.value)||void 0===e?void 0:e.currentChapter)}]),onClick:a[3]||(a[3]=e=>he(!1))},[g(s(C),{icon:s(S)},null,8,["icon"]),g(s(P),null,{default:u((()=>[_("Previous")])),_:1})],2),R("div",{slot:"end",class:V(["navigate-chapter",{disabled:(null===(t=te.value)||void 0===t?void 0:t.currentChapter)===(null===(n=te.value)||void 0===n?void 0:n.chapters.length)}]),onClick:a[4]||(a[4]=e=>he(!0))},[g(s(P),null,{default:u((()=>[_("Next")])),_:1}),g(s(C),{icon:s(z)},null,8,["icon"])],2)]})),_:1})])),_:1})])),_:1}))}}),[["__scopeId","data-v-9ad4d43b"]]))}}}));
