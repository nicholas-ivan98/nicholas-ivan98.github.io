System.register(["./index-legacy-QoxrSBDe.js"],(function(e,a){"use strict";var t,n,l,i,r,c,d,o,p,u,s,m,f,g,y,_,v,h,x,b,k,I,S,B,C,M,U,w,E,P,A,D;return{setters:[e=>{t=e.e,n=e.q,l=e.a5,i=e.d,r=e.r,c=e.ag,d=e.ah,o=e.k,p=e.l,u=e.u,s=e.W,m=e.X,f=e.f,g=e.m,y=e.y,_=e.z,v=e.G,h=e.ae,x=e.af,b=e.a3,k=e.C,I=e.B,S=e.M,B=e.ai,C=e.aj,M=e.a1,U=e.D,w=e.T,E=e.U,P=e.$,A=e.a0,D=e._}],execute:function(){var a=document.createElement("style");a.textContent=".payment-panel[data-v-d49eacf2]{text-align:center;padding-top:20px}#paypal-button-container[data-v-d49eacf2]{width:auto;max-width:400px;margin:auto}h1[data-v-d49eacf2]{font-size:40px;margin-bottom:0}.plan-description[data-v-d49eacf2]{margin-top:5px;margin-bottom:40px}\n",document.head.appendChild(a);const N={class:"payment-panel"},O={class:"plan-description"},z=(e=>(P("data-v-d49eacf2"),e=e(),A(),e))((()=>M("div",{id:"paypal-button-container"},null,-1)));e("default",D(t({__name:"PaymentPage",setup(e){const a=n(),t=l(),P=i((()=>a.getters["account/getAccount"])),A=P.value.apikey,D={year:{price:"39.99",description:"Manga one year premium license"},lifetime:{price:"59.99",description:"Manga lifetime premium license"}};let L=r(D.year);function T(){document.getElementById("paypal-button-container").innerHTML=""}function j(){const e={amount:{currency_code:"USD",value:L.value.price},description:L.value.description};paypal.Buttons({style:{layout:"vertical",color:"gold",shape:"rect",label:"paypal"},createOrder:(a,t)=>t.order.create({purchase_units:[e],application_context:{brand_name:"AppsBlack - Manga Reader",shipping_preference:"NO_SHIPPING",return_url:"https://apps.black"}}),onApprove:async(e,n)=>{await s.post(m.LICENSE_SUBMIT,{order_id:e.orderID},{headers:{apikey:A}});const l=await s.get(m.USER_INFO,{headers:{apikey:A}});l.data.data.licenses.length>0&&(P.value.licenses=l.data.data.licenses,a.dispatch("account/setAccount",P.value)),t.back()}}).render("#paypal-button-container")}function G(e){L.value=D[e.detail.value],T(),j()}return c((()=>{j()})),d((()=>T)),(e,a)=>(f(),o(u(E),{class:"can-go-back"},{default:p((()=>[g(u(S),{translucent:!0},{default:p((()=>[g(u(y),null,{default:p((()=>[g(u(_),{slot:"start",onClick:a[0]||(a[0]=()=>u(t).back())},{default:p((()=>[g(u(v),{ios:u(h),md:u(x),style:{width:"24px",height:"24px","margin-left":"8px"},color:"primary"},null,8,["ios","md"]),g(u(b),{style:{"margin-left":"4px","font-size":"medium"},color:"primary"},{default:p((()=>[k("Back")])),_:1})])),_:1}),g(u(I),{style:{"text-align":"center","margin-right":"80px"}},{default:p((()=>[k("Upgrade to Premium")])),_:1})])),_:1})])),_:1}),g(u(w),{onIonChange:G,fullscreen:!0,color:"light",class:"ion-padding"},{default:p((()=>[g(u(B),{value:"year"},{default:p((()=>[g(u(C),{value:"year"},{default:p((()=>[g(u(b),null,{default:p((()=>[k("One Year")])),_:1})])),_:1}),g(u(C),{value:"lifetime"},{default:p((()=>[g(u(b),null,{default:p((()=>[k("Lifetime")])),_:1})])),_:1})])),_:1}),M("div",N,[M("h1",null,U(u(L).price)+" USD",1),M("p",O,U(u(L).description),1),z])])),_:1})])),_:1}))}}),[["__scopeId","data-v-d49eacf2"]]))}}}));