(this.webpackJsonpmyapp=this.webpackJsonpmyapp||[]).push([[0],{184:function(e,t,n){},185:function(e,t,n){},214:function(e,t,n){},215:function(e,t,n){},216:function(e,t,n){"use strict";n.r(t);var c=n(0),i=n.n(c),o=n(64),r=n.n(o),a=n(9),s=n(8),l=n(42),u=n.n(l),d=n(65),h=(n(75),n(1));var m=function(e){var t=e.ImgURL;return Object(h.jsx)("img",{className:"coin-img",src:t,alt:"Img not Available"})};n(77);var p=function(e){var t=e.CoinTitle;return Object(h.jsx)(h.Fragment,{children:Object(h.jsx)("h2",{className:"coin-name",children:t})})};var b=function(e){var t=e.coinDetails;return Object(h.jsx)(h.Fragment,{children:Object(h.jsx)("p",{children:t})})},g=n(69),j=function(e){var t=e.data,n=e.options;return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)("div",{className:"header",children:Object(h.jsx)("h1",{className:"title",children:"Price"})}),Object(h.jsx)(g.a,{data:t,options:n})]})};n(184);var f=function(e){var t=e.coinPrice,n=e.data,c=e.options;return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)(j,{data:n,options:c}),Object(h.jsxs)("h3",{className:"Coin-price",children:["$ ",t," /-"]})]})};n(185);function O(e){var t=new Date(e),n=t.getFullYear();return["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][t.getMonth()]+" "+n}var y=[{Id:1,ImgURL:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/BTC_Logo.svg/1200px-BTC_Logo.svg.png",CoinTitle:"BitCoin",coinDetails:"A cryptocurrency, crypto-currency, or crypto is a collection of binary data which is designed to work as a medium of exchange wherein individual coin ownership records are stored in a ledger which is a computerized database using strong cryptography to secure transaction records.",coinPrice:25701.5},{Id:2,ImgURL:"https://assets.gadgets360cdn.com/img/crypto/ethereum-og-logo.png",CoinTitle:"Ethereum",coinDetails:"Ethereum is a decentralized, open-source blockchain with smart contract functionality. Ether is the native cryptocurrency of the platform. Amongst cryptocurrencies, Ether is second only to Bitcoin in market capitalization. Ethereum was conceived in 2013 by programmer Vitalik Buterin.",coinPrice:3597.53},{Id:3,ImgURL:"https://assets.gadgets360cdn.com/img/crypto/dogecoin-og-logo.png",CoinTitle:"DogeCoin",coinDetails:'Dogecoin is a cryptocurrency created by software engineers Billy Markus and Jackson Palmer, who decided to create a payment system as a "joke", making fun of the wild speculation in cryptocurrencies at the time. Despite its satirical nature, some consider it a legitimate investment prospect.',coinPrice:237.53},{Id:4,ImgURL:"https://pbs.twimg.com/profile_images/1389823228533739522/-Tj2WF_6_400x400.jpg",CoinTitle:"Polkadot",coinDetails:'Polkadot is a sharded heterogeneous multi-chain architecture which enables external networks as well as customized layer one "parachains" to communicate, creating an interconnected internet of blockchains. The network uses an environmentally-friendly proof of stake consensus algorithm',coinPrice:5907.53}],v=function(){return fetch("https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=1631553575&to=1634113153").then((function(e){if(e.status>=200&&e.status<=299)return e.json()})).then((function(e){var t={labels:e.prices.map((function(e){return O(e[0])})),datasets:[{label:"Ethereum",backgroundColor:"rgb(0, 128, 0)",borderColor:"rgb(0, 128, 0)",data:e.prices.map((function(e){return Math.round(e[1])}))}]};return console.log(t),t})).catch((function(e){console.log(e)}))},x=function(e,t){fetch("https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=1631553575&to=1634113153").then((function(e){if(e.status>=200&&e.status<=299)return e.json()})).then((function(t){var n=t.prices.map((function(e){return O(e[0])})),c=t.prices.map((function(e){return Math.round(e[1])}));e({labels:n,datasets:[{label:"Ethereum",backgroundColor:"rgb(0, 128, 0)",borderColor:"rgb(0, 128, 0)",data:c}]})})).catch((function(e){console.log(e),t(!0)}))},C={plugins:{legend:{display:!1}},elements:{line:{tension:.25}},scales:{x:{legend:{display:!1},grid:{display:!1}},y:{legend:{display:!1},grid:{display:!1}}},pointRadius:.5,pointHoverRadius:1},k=n(68);var w=function(e){var t=e.Id,n=e.ImgURL,i=e.CoinTitle,o=e.coinDetails,r=e.coinPrice,a=e.removeCoin,l=Object(c.useState)(!0),g=Object(s.a)(l,2),j=g[0],O=g[1],y=Object(c.useState)(v),w=Object(s.a)(y,2),I=w[0],N=w[1],D=Object(c.useState)(!1),L=Object(s.a)(D,2),P=L[0],T=L[1],R=function(){var e=Object(d.a)(u.a.mark((function e(){var t;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=x(N,T),N(t);case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(c.useEffect)((function(){R().then((function(){O(!1)})).catch((function(e){console.log(e),T(!0)}))}),[]),j?Object(h.jsx)("div",{className:"Coin",children:Object(h.jsx)(k.BeatLoader,{size:24,loading:!0,color:"hsl(205, 78%, 60%)"})}):P?Object(h.jsx)("div",{className:"Coin",children:Object(h.jsx)("h3",{children:" Something Went Wrong ! "})}):Object(h.jsxs)("div",{className:"Coin",children:[Object(h.jsxs)("div",{className:"Coin-heading",children:[Object(h.jsx)(m,{ImgURL:n}),Object(h.jsx)(p,{CoinTitle:i})]}),Object(h.jsx)(b,{coinDetails:o}),Object(h.jsx)(f,{coinPrice:r,data:I,options:C}),Object(h.jsx)("button",{type:"button",className:"btn btn-refresh",onClick:function(){x(N,T)},children:" Refresh "}),Object(h.jsx)("button",{type:"button",className:"btn btn-delete",onClick:function(){a(t)},children:" Delete "})]})},I=(n(214),function(e){var t=e.cryptoCoinsList,n=Object(c.useState)(t),i=Object(s.a)(n,2),o=i[0],r=i[1],l=function(e){r((function(t){return t.filter((function(t){return t.Id!==e}))}))};return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)("section",{className:"CoinList",children:o.map((function(e){return Object(h.jsx)(w,Object(a.a)(Object(a.a)({},e),{},{removeCoin:l}),e.Id)}))}),Object(h.jsx)("button",{type:"button",className:"btn btn-delete",onClick:function(){r([])},children:" Clear All "})]})});n(215);var N=function(){return Object(h.jsx)("div",{className:"container",children:Object(h.jsx)(I,{cryptoCoinsList:y})})};r.a.render(Object(h.jsx)(i.a.StrictMode,{children:Object(h.jsx)(N,{})}),document.getElementById("root"))},75:function(e,t,n){},77:function(e,t,n){}},[[216,1,2]]]);
//# sourceMappingURL=main.9838e621.chunk.js.map