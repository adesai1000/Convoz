const io = require("socket.io")(8900,{
    cors:{
        origin:"http://localhost:5173",

    }
});

io.on("connection", (socket) => {
 console.log("a user is connected.")
 io.emit("welcome","This is your owner")
})