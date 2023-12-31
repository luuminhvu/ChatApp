const { Server } = require("socket.io");
const io = new Server({ cors: { origin: "https://chatapplmv.netlify.app" } }); // Fixed cors configuration
let onlineUsers = [];

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("addNewUser", (userId) => {
    if (!onlineUsers.some((user) => user.userId === userId)) {
      onlineUsers.push({ userId, socketId: socket.id });
    }
    io.emit("getOnlineUsers", onlineUsers);
  });
  //addMessage
  socket.on("sendMessage", (message) => {
    const user = onlineUsers.find(
      (user) => user.userId === message.recipientId
    );
    if (user) {
      io.to(user.socketId).emit("getMessage", message);
      io.to(socket.id).emit("getNotification", {
        senderId: message.recipientId,
        isRead: false,
        date: new Date(),
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    io.emit("getOnlineUsers", onlineUsers);
  });
});

io.listen(3000);
