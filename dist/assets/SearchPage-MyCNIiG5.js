import{e as m,r as _,s as y,a5 as I,a as h,k as g,l as t,u as e,W as C,X as k,Y as w,Z as x,f as S,m as a,y as B,z as T,G as b,ae as v,af as L,a3 as N,C as u,B as R,D as V,M as P,R as q,S as z,T as D,U as E,_ as G}from"./index-C1TpxjH5.js";import{a as H}from"./ContentGridVerticalView-Cv1g_JQm.js";import"./Crypto-gZdxX3Eo.js";const M=m({__name:"SearchPage",setup(U){const r=_([]),i=y(),d=I();let o=1;async function l(s){try{const p=(await C.get(k.CONTENT_SEARCH,{headers:{app:w},params:{keyword:i.query.keyword,page:s}})).data;o++,r.value=[...r.value,...p.data.map(c=>new x(c.url,c.title,c.thumbnail))]}catch(n){console.log("Search failed: ",n)}}async function f(s){await l(o),s.target.complete()}return h(async()=>{await l(o),l(o)}),(s,n)=>(S(),g(e(E),null,{default:t(()=>[a(e(P),null,{default:t(()=>[a(e(B),null,{default:t(()=>[a(e(T),{slot:"start",onClick:n[0]||(n[0]=()=>e(d).back())},{default:t(()=>[a(e(b),{ios:e(v),md:e(L),style:{width:"24px",height:"24px","margin-left":"4px"},color:"primary"},null,8,["ios","md"]),a(e(N),{style:{"margin-left":"4px","font-size":"medium"},color:"primary"},{default:t(()=>[u("Back")]),_:1})]),_:1}),a(e(R),{style:{"text-align":"center"}},{default:t(()=>[u(V(e(i).query.keyword),1)]),_:1})]),_:1})]),_:1}),a(e(D),{fullscreen:!0},{default:t(()=>[a(H,{contentList:r.value},null,8,["contentList"]),a(e(q),{onIonInfinite:f},{default:t(()=>[a(e(z))]),_:1})]),_:1})]),_:1}))}}),X=G(M,[["__scopeId","data-v-7da6d90a"]]);export{X as default};
