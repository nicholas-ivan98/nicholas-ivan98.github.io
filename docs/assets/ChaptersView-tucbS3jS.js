import{e as k,a5 as V,q as x,d as c,f as i,g as _,a1 as l,m as d,l as u,u as s,G as B,az as I,aA as N,C as f,D as C,E as w,F as O,j as S,k as q,a3 as D,av as z,aB as E,_ as F}from"./index-BF02CCoh.js";import{C as H}from"./Crypto-BdT2tl5k.js";const j={class:"ion-button-container"},A={class:"icon-container"},L={class:"chapter-container"},G=k({__name:"ChaptersView",props:{content:{type:Object,required:!0,default:null},callback:{type:Function,required:!1,default:void 0}},setup(g){const t=g,v=V(),r=x(),o=c(()=>r.getters["settings/getOrderChapters"]),p=c(()=>{var e;return r.getters["histories/getHistory"]((e=t.content)==null?void 0:e.url)}),y=c(()=>{var e,a;return o.value==="desc"?(e=t.content)==null?void 0:e.chapters.slice().reverse():(a=t.content)==null?void 0:a.chapters});function m(){let e=o.value;e==="asc"?e="desc":e="asc",r.dispatch("settings/setOrderChapters",e)}function h(e){return p.value&&p.value.currentChapter===e}function b(e){if(t.callback)t.callback(Number(e));else if(t.content){t.content.currentChapter=Number(e),r.dispatch("histories/setHistory",t.content);const a=H.encrypt(JSON.stringify(t.content));v.push({path:"/reading",query:{content:a}})}}return(e,a)=>(i(),_("div",null,[l("div",j,[d(s(w),{color:"light",onClick:m},{default:u(()=>[l("div",A,[d(s(B),{ios:s(I),md:s(N)},null,8,["ios","md"])]),f(" "+C(o.value==="asc"?"Ascending":"Descending"),1)]),_:1})]),l("div",L,[(i(!0),_(O,null,S(y.value,n=>(i(),q(s(E),{key:n._id,onClick:J=>b(n._id),color:h(n._id)?"secondary":""},{default:u(()=>[d(s(D),{class:z({"bold-label":h(n._id)}),style:{"font-size":"14px"}},{default:u(()=>[f(C(n._id),1)]),_:2},1032,["class"])]),_:2},1032,["onClick","color"]))),128))])]))}}),$=F(G,[["__scopeId","data-v-13b018e3"]]);export{$ as C};