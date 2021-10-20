const socket = io();

socket.on('currentData', (currentData) => {
  console.log(currentData);
})

socket.on('prevDayData', (prevDayData) => {
  //console.log(prevDayData);
})

document.querySelector('button').addEventListener('click', () => {
  socket.emit('disconnection');
});