(this.webpackJsonpmyapp=this.webpackJsonpmyapp||[]).push([[0],{108:function(e,t,n){},109:function(e,t,n){},215:function(e,t,n){},216:function(e,t,n){},243:function(e,t,n){},244:function(e,t,n){},263:function(e,t,n){},264:function(e,t,n){},265:function(e,t,n){"use strict";n.r(t);var c=n(0),a=n.n(c),i=n(85),s=n.n(i),o=(n(96),n(14)),r=n(4),l=(n(97),n(98),n(1)),j=function(){return Object(l.jsxs)("nav",{className:"navbar navbar-expand-lg navbar-mainbg",children:[Object(l.jsx)(o.b,{className:"navbar-brand",to:"/",children:"Baniya-Trade"}),Object(l.jsx)("button",{className:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation",children:Object(l.jsx)("i",{class:"fas fa-align-justify"})}),Object(l.jsx)("div",{className:"collapse navbar-collapse",id:"navbarSupportedContent",children:Object(l.jsxs)("ul",{className:"navbar-nav ml-auto",children:[Object(l.jsxs)("div",{className:"hori-selector",children:[Object(l.jsx)("div",{className:"left"}),Object(l.jsx)("div",{className:"right"})]}),Object(l.jsx)("li",{className:"nav-item active",children:Object(l.jsx)(o.b,{to:"/",children:"Home"})}),Object(l.jsx)("li",{className:"nav-item",children:Object(l.jsx)(o.b,{to:"/Market",children:"Market"})}),Object(l.jsx)("li",{className:"nav-item",children:Object(l.jsx)(o.b,{to:"/signup",children:"Sign Up"})}),Object(l.jsx)("li",{className:"nav-item",children:Object(l.jsx)(o.b,{to:"/login",children:"Login"})})]})})]})},d=n(9),u=n(6),b=n(54),m=n.n(b),h=n(87);n(108);var p=function(e){var t=e.ImgURL;return Object(l.jsx)("img",{className:"coin-img",src:t,alt:"Img not Available"})};n(109);var g=function(e){var t=e.CoinTitle;return Object(l.jsx)(l.Fragment,{children:Object(l.jsx)("h2",{className:"coin-name",children:t})})};var O=function(e){var t=e.coinDetails;return Object(l.jsx)(l.Fragment,{children:Object(l.jsx)("p",{children:t})})},f=n(91),x=function(e){var t=e.data,n=e.options;return Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)("div",{className:"header",children:Object(l.jsx)("h1",{className:"title",children:"Price"})}),Object(l.jsx)(f.a,{data:t,options:n})]})};n(215);var v=function(e){var t=e.coinPrice,n=e.data,c=e.options;return Object(l.jsx)(l.Fragment,{children:Object(l.jsxs)("div",{children:[Object(l.jsx)(x,{data:n,options:c}),Object(l.jsxs)("h3",{className:"Coin-price",children:["$ ",t," /-"]})]})})};n(216);function y(e){var t=new Date(e),n=t.getFullYear();return["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][t.getMonth()]+" "+n}var N=[{Id:1,ImgURL:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/BTC_Logo.svg/1200px-BTC_Logo.svg.png",CoinTitle:"BitCoin",coinDetails:"A cryptocurrency, crypto-currency, or crypto is a collection of binary data which is designed to work as a medium of exchange wherein individual coin ownership records are stored in a ledger which is a computerized database using strong cryptography to secure transaction records.",coinPrice:25701.5},{Id:2,ImgURL:"https://assets.gadgets360cdn.com/img/crypto/ethereum-og-logo.png",CoinTitle:"Ethereum",coinDetails:"Ethereum is a decentralized, open-source blockchain with smart contract functionality. Ether is the native cryptocurrency of the platform. Amongst cryptocurrencies, Ether is second only to Bitcoin in market capitalization. Ethereum was conceived in 2013 by programmer Vitalik Buterin.",coinPrice:3597.53},{Id:3,ImgURL:"https://assets.gadgets360cdn.com/img/crypto/dogecoin-og-logo.png",CoinTitle:"DogeCoin",coinDetails:'Dogecoin is a cryptocurrency created by software engineers Billy Markus and Jackson Palmer, who decided to create a payment system as a "joke", making fun of the wild speculation in cryptocurrencies at the time. Despite its satirical nature, some consider it a legitimate investment prospect.',coinPrice:237.53},{Id:4,ImgURL:"https://pbs.twimg.com/profile_images/1389823228533739522/-Tj2WF_6_400x400.jpg",CoinTitle:"Polkadot",coinDetails:'Polkadot is a sharded heterogeneous multi-chain architecture which enables external networks as well as customized layer one "parachains" to communicate, creating an interconnected internet of blockchains. The network uses an environmentally-friendly proof of stake consensus algorithm',coinPrice:5907.53}],C=function(){return fetch("https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=1631553575&to=1634113153").then((function(e){if(e.status>=200&&e.status<=299)return e.json()})).then((function(e){var t={labels:e.prices.map((function(e){return y(e[0])})),datasets:[{label:"Ethereum",backgroundColor:"rgb(0, 128, 0)",borderColor:"rgb(0, 128, 0)",data:e.prices.map((function(e){return Math.round(e[1])}))}]};return console.log(t),t})).catch((function(e){console.log(e)}))},w=function(e,t){fetch("https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=1631553575&to=1634113153").then((function(e){if(e.status>=200&&e.status<=299)return e.json();console.log(e.Error)})).then((function(n){var c={labels:n.prices.map((function(e){return y(e[0])})),datasets:[{label:"Ethereum",backgroundColor:"rgb(0, 128, 0)",borderColor:"rgb(0, 128, 0)",data:n.prices.map((function(e){return Math.round(e[1])}))}]};console.log(c),e(c),t(!1)})).catch((function(e){console.log(e),t(!0)}))},k={plugins:{legend:{display:!1}},elements:{line:{tension:.2}},scales:{x:{legend:{display:!1},grid:{display:!1}},y:{legend:{display:!1},grid:{display:!1}}},pointRadius:.5,pointHoverRadius:1,responsive:!0},S=n(90);var E=function(e){var t=e.Id,n=e.ImgURL,a=e.CoinTitle,i=e.coinDetails,s=e.coinPrice,o=e.removeCoin,r=Object(c.useState)(!0),j=Object(u.a)(r,2),d=j[0],b=j[1],f=Object(c.useState)(C),x=Object(u.a)(f,2),y=x[0],N=x[1],E=Object(c.useState)(!1),I=Object(u.a)(E,2),L=I[0],D=I[1],F=function(){var e=Object(h.a)(m.a.mark((function e(){var t;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=w(N,D),N(t);case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(c.useEffect)((function(){F().then((function(){b(!1)})).catch((function(e){console.log(e),D(!0)}))}),[]),d?Object(l.jsx)("div",{className:"Coin",children:Object(l.jsx)(S.BeatLoader,{size:24,loading:!0,color:"hsl(205, 78%, 60%)"})}):Object(l.jsxs)("div",{className:"Coin",children:[Object(l.jsxs)("div",{className:"Coin-heading",children:[Object(l.jsx)(p,{ImgURL:n}),Object(l.jsx)(g,{CoinTitle:a})]}),Object(l.jsx)(O,{coinDetails:i}),L?Object(l.jsxs)("div",{className:"Coin-Error",children:[Object(l.jsx)("img",{src:"https://cdn-icons-png.flaticon.com/512/4864/4864276.png",height:"80px",alt:"Error !"}),Object(l.jsx)("h3",{children:" Something Went Wrong ! "})]}):Object(l.jsx)(v,{coinPrice:s,data:y,options:k}),Object(l.jsx)("button",{type:"button",className:"btn btn-refresh",onClick:function(){w(N,D)},children:" Refresh "}),Object(l.jsx)("button",{type:"button",className:"btn btn-delete",onClick:function(){o(t)},children:" Delete "})]})},I=(n(243),function(e){var t=e.cryptoCoinsList,n=Object(c.useState)(t),a=Object(u.a)(n,2),i=a[0],s=a[1],o=function(e){s((function(t){return t.filter((function(t){return t.Id!==e}))}))};return Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)("section",{className:"CoinList",children:i.map((function(e){return Object(l.jsx)(E,Object(d.a)(Object(d.a)({},e),{},{removeCoin:o}),e.Id)}))}),Object(l.jsx)("button",{type:"button",className:"btn btn-delete",onClick:function(){s([])},children:" Clear All "})]})});var L=function(){return Object(l.jsx)("div",{className:"container",children:Object(l.jsx)(I,{cryptoCoinsList:N})})},D=(n(244),function(){return Object(l.jsx)("div",{className:"market-div",children:Object(l.jsx)(E,Object(d.a)({},N[0]))})}),F=n(35),T=n.n(F),P=(n(263),function(){var e=Object(c.useState)(""),t=Object(u.a)(e,2),n=t[0],a=t[1],i=Object(c.useState)(""),s=Object(u.a)(i,2),o=s[0],r=s[1];return Object(l.jsx)("div",{children:Object(l.jsxs)("form",{className:"form",onSubmit:function(e){e.preventDefault(),console.log(n);T.a.post("http://localhost:8000/login",{email:n,password:o},{withCredentials:!0}).then((function(e){console.log(e)})).catch((function(e){console.log(e)}))},children:[Object(l.jsx)("h1",{children:"Login"}),Object(l.jsxs)("div",{className:"form-control",children:[Object(l.jsx)("label",{htmlFor:"email",children:"Email :"}),Object(l.jsx)("input",{type:"email",id:"email",name:"email",value:n,onChange:function(e){a(e.target.value)}})]}),Object(l.jsxs)("div",{className:"form-control",children:[Object(l.jsx)("label",{htmlFor:"password",children:"passsword :"}),Object(l.jsx)("input",{type:"password",id:"passsword",name:"password",value:o,onChange:function(e){r(e.target.value)}})]}),Object(l.jsx)("button",{type:"submit",children:" Sign up"})]})})});var M=function(){return Object(l.jsx)("div",{className:"container",children:Object(l.jsx)(P,{})})},R=n(5),B=(n(264),function(){var e=Object(c.useState)({firstName:"",lastName:"",email:"",password:""}),t=Object(u.a)(e,2),n=t[0],a=t[1],i=function(e){var t=e.target.name,c=e.target.value;a(Object(d.a)(Object(d.a)({},n),{},Object(R.a)({},t,c)))};return Object(l.jsx)("div",{children:Object(l.jsxs)("form",{className:"form",onSubmit:function(e){e.preventDefault(),console.log(n);T.a.post("http://localhost:8000/signup",n,{withCredentials:!0}).then((function(e){console.log(e)})).catch((function(e){console.log(e)}))},children:[Object(l.jsx)("h1",{children:"SignUp"}),Object(l.jsxs)("div",{className:"form-control",children:[Object(l.jsx)("label",{htmlFor:"firstName",children:"FirstName :"}),Object(l.jsx)("input",{type:"firstName",id:"firstName",name:"firstName",value:n.firstName,onChange:i})]}),Object(l.jsxs)("div",{className:"form-control",children:[Object(l.jsx)("label",{htmlFor:"lastName",children:"LastName :"}),Object(l.jsx)("input",{type:"lastName",id:"lastName",name:"lastName",value:n.lastName,onChange:i})]}),Object(l.jsxs)("div",{className:"form-control",children:[Object(l.jsx)("label",{htmlFor:"email",children:"Email :"}),Object(l.jsx)("input",{type:"text",id:"email",name:"email",value:n.email,onChange:i})]}),Object(l.jsxs)("div",{className:"form-control",children:[Object(l.jsx)("label",{htmlFor:"password",children:"Passsword :"}),Object(l.jsx)("input",{type:"password",id:"passsword",name:"password",value:n.password,onChange:i})]}),Object(l.jsx)("button",{type:"submit",children:" Sign up"})]})})});var U=function(){return Object(l.jsx)("div",{className:"container",children:Object(l.jsx)(B,{})})},_=function(){return Object(l.jsxs)("div",{className:"container Error",children:[Object(l.jsx)("img",{src:"https://cdn-icons-png.flaticon.com/512/4864/4864276.png",height:"120px",alt:"Error !"}),Object(l.jsx)("h3",{children:" 404 : This Page does not exists ! "})]})};var A=function(){return Object(l.jsxs)(o.a,{basename:"/",children:[Object(l.jsx)(j,{}),Object(l.jsxs)(r.c,{children:[Object(l.jsx)(r.a,{path:"/",component:L,exact:!0}),Object(l.jsx)(r.a,{path:"/Market",component:D}),Object(l.jsx)(r.a,{path:"/login",component:M}),Object(l.jsx)(r.a,{path:"/signup",component:U}),Object(l.jsx)(r.a,{component:_})]})]})};s.a.render(Object(l.jsx)(a.a.StrictMode,{children:Object(l.jsx)(A,{})}),document.getElementById("root"))},97:function(e,t,n){},98:function(e,t,n){}},[[265,1,2]]]);
//# sourceMappingURL=main.501e1135.chunk.js.map