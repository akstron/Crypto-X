const socket = io();

socket.on('currentData', (currentData) => {
  console.log(currentData);
})

