System.register(["./index-legacy-Y-D5Stn5.js","./ContentGridVerticalView-legacy-Ci0Vab9q.js","./Crypto-legacy-BbzbjVY4.js"],(function(e,t){"use strict";var a,n,l,r,d,o,c,i,u,s,f,y,m,p,g,_,h,k,w,v,x,C,S,b,j,E,I,T,q,z;return{setters:[e=>{a=e.e,n=e.r,l=e.s,r=e.a5,d=e.a,o=e.k,c=e.l,i=e.u,u=e.W,s=e.X,f=e.Y,y=e.Z,m=e.f,p=e.m,g=e.y,_=e.z,h=e.G,k=e.ae,w=e.af,v=e.a3,x=e.C,C=e.B,S=e.D,b=e.M,j=e.R,E=e.S,I=e.T,T=e.U,q=e._},e=>{z=e.a},null],execute:function(){var t=document.createElement("style");t.textContent=".md .dark ion-infinite-scroll-content[data-v-7da6d90a]{background-color:#1e1e1e}.md .dark ion-content[data-v-7da6d90a]{--background: #1e1e1e}\n",document.head.appendChild(t),e("default",q(a({__name:"SearchPage",setup(e){const t=n([]),a=l(),q=r();let B=1;async function G(e){try{const n=(await u.get(s.CONTENT_SEARCH,{headers:{app:f},params:{keyword:a.query.keyword,page:e}})).data;B++,t.value=[...t.value,...n.data.map((e=>new y(e.url,e.title,e.thumbnail)))]}catch(n){console.log("Search failed: ",n)}}async function L(e){await G(B),e.target.complete()}return d((async()=>{await G(B),G(B)})),(e,n)=>(m(),o(i(T),null,{default:c((()=>[p(i(b),null,{default:c((()=>[p(i(g),null,{default:c((()=>[p(i(_),{slot:"start",onClick:n[0]||(n[0]=()=>i(q).back())},{default:c((()=>[p(i(h),{ios:i(k),md:i(w),style:{width:"24px",height:"24px","margin-left":"4px"},color:"primary"},null,8,["ios","md"]),p(i(v),{style:{"margin-left":"4px","font-size":"medium"},color:"primary"},{default:c((()=>[x("Back")])),_:1})])),_:1}),p(i(C),{style:{"text-align":"center"}},{default:c((()=>[x(S(i(a).query.keyword),1)])),_:1})])),_:1})])),_:1}),p(i(I),{fullscreen:!0},{default:c((()=>[p(z,{contentList:t.value},null,8,["contentList"]),p(i(j),{onIonInfinite:L},{default:c((()=>[p(i(E))])),_:1})])),_:1})])),_:1}))}}),[["__scopeId","data-v-7da6d90a"]]))}}}));
