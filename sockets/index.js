const io = require("socket.io")(8900,{
    cors:{
        origin:"http://localhost:5173",

    }
});

let users = [];

const addUser = (id, socketId)=>{
    !users.some(user=>user.id ===id)&&
    users.push({id,socketId});
}

const removeUser = (socketId)=>{
    users = users.filter((user) => user.socketId !== socketId)
}

io.on("connection", (socket) => {
 console.log("a user is connected.")
 socket.on("addUser", id=>{
    addUser(id,socket.id)
    io.emit("getUsers", users)
 })
 socket.on("disconnect", ()=>{
    console.log("a user disconnected.")
    removeUser(socket.id)
    io.emit("getUsers", users)
 })
})