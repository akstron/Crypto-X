const socketMap = new Map();

const addSocketId = (userId, socketId) => {
    if(!userId || !socketId)
    socketMap.set(userId, socketId);
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