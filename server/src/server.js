require('dotenv').config();
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const app = express();
const sharedsession = require("express-socket.io-session");

require('./config/passport');
require('./config/dbConnection');

const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const server = http.createServer(app);
const io = require('socket.io')(server, { 
      log: false
    , "close timeout": 60
    , "heartbeat timeout": 60
    , "heartbeat interval": 20
});

const userAuthRouter = require('./routers/userAuthRouter');
const userUtilityRouter = require('./routers/userControlsRouter');
const userTradeRouter = require('./routers/userTradeRouter');
const userAccountRouter = require('./routers/userAccountRouter');
require('./models/Coin');

const currentData = require('./utils/currenData');
const fetchCryptoDataRouter = require('./routers/fetchCryptoDataRouter');
const currentPrice = require('./utils/priceStats');

const paymentGatewayRouter = require('./routers/paymentGateWayRouter');
const prevDayData = require('./utils/prevDayData');
const pushNotificationRouter = require('./routers/pushNotificationRouter');
const { addSocketId } = require('./store/SocketMap');
const coinsArray = require('./store/CoinsList');
const getINRVAlue = require('./utils/currencyConversion');

const sessionStore = require('connect-mongo').create({
    mongoUrl: process.env.MONGO_DB_URI
});

const corsOptions = {
  /*origin can't be wildcard ('*') when sending credentials*/
  origin: [process.env.REACT_APP_FRONTEND,process.env.REACT_APP_BACKEND,"http://localhost:3000","http://localhost:8000"],
  optionsSuccessStatus: 200, // some legacy borwsers choke on 204 (IE11 & various SmartTVs)
  /* 
      Below sets Access-Control-Allow-Credentials to true for cross origin credentials sharing.
      In this case it is used to get cookies, for express-session.
  */
  credentials: true,
};

/* Session configuration */
const sessionOptions = {
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: true, 
  store: sessionStore,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    /* Set to false, to allow cookies from http */
    secure: false,
  }
}

app.use(cors(corsOptions));
const currentSession = session(sessionOptions);
app.use(currentSession);


/**
 * TODO: Setting up cors for Socket
 */

app.use(passport.initialize());
app.use(passport.session());

io.use(sharedsession(currentSession, {
  autoSave: true
}));

app.use(express.json());

app.use(userAuthRouter);
app.use(userUtilityRouter);
app.use(userTradeRouter);

app.use(fetchCryptoDataRouter);
app.use(paymentGatewayRouter);
app.use(pushNotificationRouter);

// when any client gets connected with server
io.on('connection', (socket) =>{
  console.log('New websocket connection');
  console.log(socket.id);

  const userId = socket.handshake.query.userId;
  console.log(typeof userId);
  console.log('userId... ', userId);

  if(userId){
    addSocketId(userId, socket.id);
  }

  // emitting current data of all coins
  currentData((market)=>{

    for(var i=0; i<coinsArray.length; i++){

      if(market.symbol === coinsArray[i]){
        const len = coinsArray[i].length;
        const key = 'coin_' + coinsArray[i].substring(0, len-4);
          socket.emit(key, market.price);
      }
      
    }
  })

  prevDayData((response) => {
    socket.emit('prevDayData', response);
  })

  socket.on('disconnect', ()=> {

    socket.disconnect();
    console.log('Disconnected...');
  })

});

app.use(userAccountRouter);

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});

module.exports = io;