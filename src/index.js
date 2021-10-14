const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();

const server = http.createServer(app);
const io = socketio(server);

const Binance = require('node-binance-api');

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');


app.use(express.static(publicDirectoryPath));

const binance = new Binance().options({
  APIKEY: '<key>',
  APISECRET: '<secret>'
});


io.on('connection', (socket) =>{
  console.log('New websocket connection');

  binance.websockets.miniTicker(markets => {
    socket.emit('currentData',markets);
  });

})
server.listen(port, () => {
  console.log('server started on port ' + port);
})
