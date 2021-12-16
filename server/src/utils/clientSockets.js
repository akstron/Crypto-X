const socketList = new Map();
const addSocket = (userId, socket)=>{
    socketList.set(userId, socket);
    //console.log('from clientsocket ' + socketList.get(email).id);
}

module.exports = {addSocket, socketList};