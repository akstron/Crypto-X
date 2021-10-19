require('dotenv').config();
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const app = express();

require('./config/passport');
require('./config/dbConnection');
const userAuthRouter = require('./routers/userAuthRouter');
const userUtilityRouter = require('./routers/userControlsRouter');
const userTradeRouter = require('./routers/userTradeRouter');


const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const server = http.createServer(app);
const io = socketio(server);

const currentData = require('./utils/currenData');
const fetchCryptoDataRouter = require('./routers/fetchCryptoDataRouter');
const currentPrice = require('./utils/priceStats');

const paymentGatewayRouter = require('./routers/paymentGateWayRouter');
const prevDayData = require('./utils/prevDayData');
const { response } = require('express');

const publicDirectoryPath = path.join(__dirname, './public');

const sessionStore = require('connect-mongo').create({
    mongoUrl: process.env.MONGO_DB_URI
});

const corsOptions = {
  /*origin can't be wildcard ('*') when sending credentials*/
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy borwsers choke on 204 (IE11 & various SmartTVs)
  /* 
      Below sets Access-Control-Allow-Credentials to true for cross origin credentials sharing.
      In this case it is used to get cookies, for express-session.
  */
  credentials: true
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
    secure: false
  }
}

app.use(cors(corsOptions));
app.use(session(sessionOptions));

/**
 * TODO: Setting up cors for Socket
 */

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

app.use(userAuthRouter);
app.use(userUtilityRouter);
app.use(userTradeRouter);

app.use(express.static(publicDirectoryPath));


// when any client gets connected with server
io.on('connection', (socket) =>{
  console.log('New websocket connection');

  // emitting current data of all coins
  currentData((market)=>{
    socket.emit('currentData', market);
  })

  prevDayData((response) => {
    socket.emit('prevDayData', response);
  })
})

app.use(fetchCryptoDataRouter);
app.use(paymentGatewayRouter);

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
})
