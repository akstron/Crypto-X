(this.webpackJsonpmyapp=this.webpackJsonpmyapp||[]).push([[0],{179:function(e,t,n){},180:function(e,t,n){},181:function(e,t,n){},182:function(e,t,n){},183:function(e,t,n){"use strict";n.r(t);var i=n(1),c=n.n(i),r=n(61),o=n.n(r),a=n(6),s=n(9),l=n(13),u=n.n(l),d=n(25),p=(n(70),n(0));var m=function(e){var t=e.ImgURL;return Object(p.jsx)("img",{className:"coin-img",src:t,alt:"Img not Available"})};n(72);var h=function(e){var t=e.CoinTitle;return Object(p.jsx)(p.Fragment,{children:Object(p.jsx)("h2",{className:"coin-name",children:t})})};var b=function(e){var t=e.coinDetails;return Object(p.jsx)(p.Fragment,{children:Object(p.jsx)("p",{children:t})})},g=n(64),j=function(e){var t=e.data,n=e.options;return Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)("div",{className:"header",children:Object(p.jsx)("h1",{className:"title",children:"Price"})}),Object(p.jsx)(g.a,{data:t,options:n})]})};n(179);var f=function(e){var t=e.coinPrice,n=e.data,i=e.options;return Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)(j,{data:n,options:i}),Object(p.jsxs)("h3",{className:"Coin-price",children:["$ ",t," /-"]})]})};n(180);var y=[{Id:1,ImgURL:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/BTC_Logo.svg/1200px-BTC_Logo.svg.png",CoinTitle:"BitCoin",coinDetails:"A cryptocurrency, crypto-currency, or crypto is a collection of binary data which is designed to work as a medium of exchange wherein individual coin ownership records are stored in a ledger which is a computerized database using strong cryptography to secure transaction records.",coinPrice:25701.5},{Id:2,ImgURL:"https://assets.gadgets360cdn.com/img/crypto/ethereum-og-logo.png",CoinTitle:"Ethereum",coinDetails:"Ethereum is a decentralized, open-source blockchain with smart contract functionality. Ether is the native cryptocurrency of the platform. Amongst cryptocurrencies, Ether is second only to Bitcoin in market capitalization. Ethereum was conceived in 2013 by programmer Vitalik Buterin.",coinPrice:3597.53},{Id:3,ImgURL:"https://assets.gadgets360cdn.com/img/crypto/dogecoin-og-logo.png",CoinTitle:"DogeCoin",coinDetails:'Dogecoin is a cryptocurrency created by software engineers Billy Markus and Jackson Palmer, who decided to create a payment system as a "joke", making fun of the wild speculation in cryptocurrencies at the time. Despite its satirical nature, some consider it a legitimate investment prospect.',coinPrice:237.53},{Id:4,ImgURL:"https://pbs.twimg.com/profile_images/1389823228533739522/-Tj2WF_6_400x400.jpg",CoinTitle:"Polkadot",coinDetails:'Polkadot is a sharded heterogeneous multi-chain architecture which enables external networks as well as customized layer one "parachains" to communicate, creating an interconnected internet of blockchains. The network uses an environmentally-friendly proof of stake consensus algorithm',coinPrice:5907.53}],v=function(){var e=Object(d.a)(u.a.mark((function e(){var t,n,i,c,r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=1631521153&to=1634113153",e.next=3,fetch("https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=1631521153&to=1634113153",{mode:"cors"});case 3:return t=e.sent,e.next=6,t.json();case 6:return n=e.sent,i=n.prices.map((function(e){return t=e[0],new Date(1e3*t).toLocaleString();var t})),c=n.prices.map((function(e){return Math.round(e[1])})),r={labels:i,datasets:[{label:"Ethereum",backgroundColor:"rgb(0, 128, 0)",borderColor:"rgb(0, 128, 0)",data:c}]},console.log(r),e.abrupt("return",r);case 12:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),x={plugins:{legend:{display:!1}},elements:{line:{tension:.25}},scales:{x:{legend:{display:!1},grid:{display:!1}},y:{legend:{display:!1},grid:{display:!1}}},pointRadius:.5,pointHoverRadius:1};var O=function(e){var t=e.Id,n=e.ImgURL,c=e.CoinTitle,r=e.coinDetails,o=e.coinPrice,a=e.removeCoin,l=Object(i.useState)(v()),g=Object(s.a)(l,2),j=g[0],y=g[1],O=function(){var e=Object(d.a)(u.a.mark((function e(){var t;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v();case 2:t=e.sent,y(t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(i.useEffect)((function(){O()}),[]),Object(p.jsxs)("div",{className:"Coin",children:[Object(p.jsxs)("div",{className:"Coin-heading",children:[Object(p.jsx)(m,{ImgURL:n}),Object(p.jsx)(h,{CoinTitle:c})]}),Object(p.jsx)(b,{coinDetails:r}),Object(p.jsx)(f,{coinPrice:o,data:j,options:x}),Object(p.jsx)("button",{type:"button",className:"btn btn-refresh",onClick:function(){O()},children:" Refresh "}),Object(p.jsx)("button",{type:"button",className:"btn btn-delete",onClick:function(){a(t)},children:" Delete "})]})},k=(n(181),function(e){var t=e.cryptoCoinsList,n=Object(i.useState)(t),c=Object(s.a)(n,2),r=c[0],o=c[1],l=function(e){o((function(t){return t.filter((function(t){return t.Id!==e}))}))};return Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)("section",{className:"CoinList",children:r.map((function(e){return Object(p.jsx)(O,Object(a.a)(Object(a.a)({},e),{},{removeCoin:l}),e.Id)}))}),Object(p.jsx)("button",{type:"button",className:"btn btn-delete",onClick:function(){o([])},children:" Clear All "})]})});n(182);var C=function(){return Object(p.jsx)("div",{className:"container",children:Object(p.jsx)(k,{cryptoCoinsList:y})})};o.a.render(Object(p.jsx)(c.a.StrictMode,{children:Object(p.jsx)(C,{})}),document.getElementById("root"))},70:function(e,t,n){},72:function(e,t,n){}},[[183,1,2]]]);
//# sourceMappingURL=main.98f54222.chunk.js.map