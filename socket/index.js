const { DiscountRounded } = require("@mui/icons-material");
const { Server } = require("socket.io");

const io = new Server({cors: "http://localhost:3000"});
let onlineUser = []

io.on("connection", (socket) => {
    console.log("New Connection",socket.id)

    //Listen to new Connection
    socket.on("addNewUser",(userId)=>{
        !onlineUser.some(user=>user.userId === userId) &&
        onlineUser.push({
            userId,
            socketId : socket.id
        })
        console.log("Online Users",onlineUser);
        io.emit("getOnlineUsers",onlineUser)
    });

    //add messages
    socket.on("sendMessage",(message)=>{
        const user = onlineUser.find(user => user.userId === message.recipientId);

        if(user){
            io.to(user.socketId).emit("getMessage",message);
        }
    });
    //Disconnect the user if he exit and remove from array
    socket.on("disconnect",()=>{
        onlineUser = onlineUser.filter(user=> user.socketId !== socket.id)
        io.emit("getOnlineUsers",onlineUser)
    })
});

io.listen(5000);