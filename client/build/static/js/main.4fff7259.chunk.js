(this.webpackJsonpmyapp=this.webpackJsonpmyapp||[]).push([[0],{202:function(e,t,n){},203:function(e,t,n){},230:function(e,t,n){},231:function(e,t,n){},232:function(e,t,n){},233:function(e,t,n){"use strict";n.r(t);var c=n(0),i=n.n(c),a=n(73),s=n.n(a),r=n(18),o=n(4),l=(n(84),n(85),n(1)),j=function(){return Object(l.jsxs)("div",{className:"nav-bar",children:[Object(l.jsx)("h3",{children:" Baniya-Trade "}),Object(l.jsxs)("ul",{className:"nav",children:[Object(l.jsx)("li",{children:Object(l.jsx)(r.b,{to:"/",children:"Home"})}),Object(l.jsx)("li",{children:Object(l.jsx)(r.b,{to:"/signup",children:"Sign Up"})}),Object(l.jsx)("li",{children:Object(l.jsx)(r.b,{to:"/login",children:"Login"})})]})]})},d=n(9),u=n(6),m=n(50),b=n.n(m),h=n(75);n(95);var p=function(e){var t=e.ImgURL;return Object(l.jsx)("img",{className:"coin-img",src:t,alt:"Img not Available"})};n(96);var g=function(e){var t=e.CoinTitle;return Object(l.jsx)(l.Fragment,{children:Object(l.jsx)("h2",{className:"coin-name",children:t})})};var O=function(e){var t=e.coinDetails;return Object(l.jsx)(l.Fragment,{children:Object(l.jsx)("p",{children:t})})},f=n(79),x=function(e){var t=e.data,n=e.options;return Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)("div",{className:"header",children:Object(l.jsx)("h1",{className:"title",children:"Price"})}),Object(l.jsx)(f.a,{data:t,options:n})]})};n(202);var v=function(e){var t=e.coinPrice,n=e.data,c=e.options;return Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)(x,{data:n,options:c}),Object(l.jsxs)("h3",{className:"Coin-price",children:["$ ",t," /-"]})]})};n(203);function y(e){var t=new Date(e),n=t.getFullYear();return["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][t.getMonth()]+" "+n}var N=[{Id:1,ImgURL:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/BTC_Logo.svg/1200px-BTC_Logo.svg.png",CoinTitle:"BitCoin",coinDetails:"A cryptocurrency, crypto-currency, or crypto is a collection of binary data which is designed to work as a medium of exchange wherein individual coin ownership records are stored in a ledger which is a computerized database using strong cryptography to secure transaction records.",coinPrice:25701.5},{Id:2,ImgURL:"https://assets.gadgets360cdn.com/img/crypto/ethereum-og-logo.png",CoinTitle:"Ethereum",coinDetails:"Ethereum is a decentralized, open-source blockchain with smart contract functionality. Ether is the native cryptocurrency of the platform. Amongst cryptocurrencies, Ether is second only to Bitcoin in market capitalization. Ethereum was conceived in 2013 by programmer Vitalik Buterin.",coinPrice:3597.53},{Id:3,ImgURL:"https://assets.gadgets360cdn.com/img/crypto/dogecoin-og-logo.png",CoinTitle:"DogeCoin",coinDetails:'Dogecoin is a cryptocurrency created by software engineers Billy Markus and Jackson Palmer, who decided to create a payment system as a "joke", making fun of the wild speculation in cryptocurrencies at the time. Despite its satirical nature, some consider it a legitimate investment prospect.',coinPrice:237.53},{Id:4,ImgURL:"https://pbs.twimg.com/profile_images/1389823228533739522/-Tj2WF_6_400x400.jpg",CoinTitle:"Polkadot",coinDetails:'Polkadot is a sharded heterogeneous multi-chain architecture which enables external networks as well as customized layer one "parachains" to communicate, creating an interconnected internet of blockchains. The network uses an environmentally-friendly proof of stake consensus algorithm',coinPrice:5907.53}],C=function(){return fetch("https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=1631553575&to=1634113153").then((function(e){if(e.status>=200&&e.status<=299)return e.json()})).then((function(e){var t={labels:e.prices.map((function(e){return y(e[0])})),datasets:[{label:"Ethereum",backgroundColor:"rgb(0, 128, 0)",borderColor:"rgb(0, 128, 0)",data:e.prices.map((function(e){return Math.round(e[1])}))}]};return console.log(t),t})).catch((function(e){console.log(e)}))},w=function(e,t){fetch("https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=1631553575&to=1634113153").then((function(e){if(e.status>=200&&e.status<=299)return e.json();console.log(e.Error)})).then((function(n){var c={labels:n.prices.map((function(e){return y(e[0])})),datasets:[{label:"Ethereum",backgroundColor:"rgb(0, 128, 0)",borderColor:"rgb(0, 128, 0)",data:n.prices.map((function(e){return Math.round(e[1])}))}]};console.log(c),e(c),t(!1)})).catch((function(e){console.log(e),t(!0)}))},k={plugins:{legend:{display:!1}},elements:{line:{tension:.2}},scales:{x:{legend:{display:!1},grid:{display:!1}},y:{legend:{display:!1},grid:{display:!1}}},pointRadius:.5,pointHoverRadius:1},I=n(78);var E=function(e){var t=e.Id,n=e.ImgURL,i=e.CoinTitle,a=e.coinDetails,s=e.coinPrice,r=e.removeCoin,o=Object(c.useState)(!0),j=Object(u.a)(o,2),d=j[0],m=j[1],f=Object(c.useState)(C),x=Object(u.a)(f,2),y=x[0],N=x[1],E=Object(c.useState)(!1),L=Object(u.a)(E,2),S=L[0],D=L[1],F=function(){var e=Object(h.a)(b.a.mark((function e(){var t;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=w(N,D),N(t);case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(c.useEffect)((function(){F().then((function(){m(!1)})).catch((function(e){console.log(e),D(!0)}))}),[]),d?Object(l.jsx)("div",{className:"Coin",children:Object(l.jsx)(I.BeatLoader,{size:24,loading:!0,color:"hsl(205, 78%, 60%)"})}):Object(l.jsxs)("div",{className:"Coin",children:[Object(l.jsxs)("div",{className:"Coin-heading",children:[Object(l.jsx)(p,{ImgURL:n}),Object(l.jsx)(g,{CoinTitle:i})]}),Object(l.jsx)(O,{coinDetails:a}),S?Object(l.jsxs)("div",{className:"Coin-Error",children:[Object(l.jsx)("img",{src:"https://cdn-icons-png.flaticon.com/512/4864/4864276.png",height:"80px",alt:"Error !"}),Object(l.jsx)("h3",{children:" Something Went Wrong ! "})]}):Object(l.jsx)(v,{coinPrice:s,data:y,options:k}),Object(l.jsx)("button",{type:"button",className:"btn btn-refresh",onClick:function(){w(N,D)},children:" Refresh "}),Object(l.jsx)("button",{type:"button",className:"btn btn-delete",onClick:function(){r(t)},children:" Delete "})]})},L=(n(230),function(e){var t=e.cryptoCoinsList,n=Object(c.useState)(t),i=Object(u.a)(n,2),a=i[0],s=i[1],r=function(e){s((function(t){return t.filter((function(t){return t.Id!==e}))}))};return Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)("section",{className:"CoinList",children:a.map((function(e){return Object(l.jsx)(E,Object(d.a)(Object(d.a)({},e),{},{removeCoin:r}),e.Id)}))}),Object(l.jsx)("button",{type:"button",className:"btn btn-delete",onClick:function(){s([])},children:" Clear All "})]})});var S=function(){return Object(l.jsx)("div",{className:"container",children:Object(l.jsx)(L,{cryptoCoinsList:N})})},D=(n(231),function(){var e=Object(c.useState)(""),t=Object(u.a)(e,2),n=t[0],i=t[1],a=Object(c.useState)(""),s=Object(u.a)(a,2),r=s[0],o=s[1];return Object(l.jsx)("div",{children:Object(l.jsxs)("form",{className:"form",onSubmit:function(e){e.preventDefault(),console.log(n)},children:[Object(l.jsx)("h1",{children:"Login"}),Object(l.jsxs)("div",{className:"form-control",children:[Object(l.jsx)("label",{htmlFor:"email",children:"Email :"}),Object(l.jsx)("input",{type:"email",id:"email",name:"email",value:n,onChange:function(e){i(e.target.value)}})]}),Object(l.jsxs)("div",{className:"form-control",children:[Object(l.jsx)("label",{htmlFor:"password",children:"passsword :"}),Object(l.jsx)("input",{type:"password",id:"passsword",name:"password",value:r,onChange:function(e){o(e.target.value)}})]}),Object(l.jsx)("button",{type:"submit",children:" Sign up"})]})})});var F=function(){return Object(l.jsx)("div",{className:"container",children:Object(l.jsx)(D,{})})},P=n(5),T=(n(232),function(){var e=Object(c.useState)({firstName:"",lastName:"",emailId:"",password:""}),t=Object(u.a)(e,2),n=t[0],i=t[1],a=function(e){var t=e.target.name,c=e.target.value;i(Object(d.a)(Object(d.a)({},n),{},Object(P.a)({},t,c)))};return Object(l.jsx)("div",{children:Object(l.jsxs)("form",{className:"form",onSubmit:function(e){e.preventDefault(),console.log(n)},children:[Object(l.jsx)("h1",{children:"SignUp"}),Object(l.jsxs)("div",{className:"form-control",children:[Object(l.jsx)("label",{htmlFor:"firstName",children:"FirstName :"}),Object(l.jsx)("input",{type:"firstName",id:"firstName",name:"firstName",value:n.firstName,onChange:a})]}),Object(l.jsxs)("div",{className:"form-control",children:[Object(l.jsx)("label",{htmlFor:"lastName",children:"LastName :"}),Object(l.jsx)("input",{type:"lastName",id:"lastName",name:"lastName",value:n.lastName,onChange:a})]}),Object(l.jsxs)("div",{className:"form-control",children:[Object(l.jsx)("label",{htmlFor:"email",children:"Email :"}),Object(l.jsx)("input",{type:"text",id:"email",name:"emailId",value:n.emailId,onChange:a})]}),Object(l.jsxs)("div",{className:"form-control",children:[Object(l.jsx)("label",{htmlFor:"password",children:"Passsword :"}),Object(l.jsx)("input",{type:"password",id:"passsword",name:"password",value:n.password,onChange:a})]}),Object(l.jsx)("button",{type:"submit",children:" Sign up"})]})})});var R=function(){return Object(l.jsx)("div",{className:"container",children:Object(l.jsx)(T,{})})},B=function(){return Object(l.jsxs)("div",{className:"container Error",children:[Object(l.jsx)("img",{src:"https://cdn-icons-png.flaticon.com/512/4864/4864276.png",height:"120px",alt:"Error !"}),Object(l.jsx)("h3",{children:" 404 : This Page does not exists ! "})]})};var U=function(){return Object(l.jsxs)(r.a,{basename:"/",children:[Object(l.jsx)("div",{className:"Header",children:Object(l.jsx)(j,{})}),Object(l.jsxs)(o.c,{children:[Object(l.jsx)(o.a,{path:"/",component:S,exact:!0}),Object(l.jsx)(o.a,{path:"/login",component:F}),Object(l.jsx)(o.a,{path:"/signup",component:R}),Object(l.jsx)(o.a,{component:B})]})]})};s.a.render(Object(l.jsx)(i.a.StrictMode,{children:Object(l.jsx)(U,{})}),document.getElementById("root"))},84:function(e,t,n){},85:function(e,t,n){},95:function(e,t,n){},96:function(e,t,n){}},[[233,1,2]]]);
//# sourceMappingURL=main.4fff7259.chunk.js.map