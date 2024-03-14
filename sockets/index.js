const io = require('socket.io')(8900,{
    cors:{
        origin:"http://localhost:5173"
    }
})

let activeUsers =[]

io.on("Socket Server is Running.", (socket)=>{
    //Add a new user
    socket.on('new-user-add', (newUserId)=>{
        if(!activeUsers.some((user)=> user))
    })
})