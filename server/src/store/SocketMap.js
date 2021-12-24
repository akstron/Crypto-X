const socketMap = new Map();

const addSocketId = (userId, socketId) => {
    //console.log('userId.. ', userId);
    //console.log('socketId.. ', socketId);
    if(!userId || !socketId) return;
    
    socketMap.set(userId, socketId);
    //console.log('socketId printing...', socketMap.get(userId))
}

const removeSocketId = (userId) => {
    if(!socketMap.has(userId)){
        throw new Error ('No socket available for given user id');
    }

    socketMap.delete(userId);
}

const getSocketId = (userId) => {
    if(!socketMap.has(userId)){
        throw new Error ('No socket available for given user id');
    }

    return socketMap.get(userId);
}

module.exports = {
    addSocketId,
    removeSocketId,
    getSocketId
};