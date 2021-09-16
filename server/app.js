const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

app.use(express.static("public"));

const messages = [];
const users = []

io.on('connection', function (socket) {
  socket.on("login", function (user) {
    let onlineUsers = users.length;
    if (users.find(u => u.userName == user.userName) == undefined) {
      users.push({ userName: user.userName, id: users.length });
      console.log(`>> ${user.userName} connected to the chat!`);

      onlineUsers = users.length; // if has new values
      console.log(`Now there ${onlineUsers > 1 ? "are" : "is"} ${users.length} online ${onlineUsers > 1 ? "users" : "user"}`);
    }
    io.sockets.emit("showMessages", { onlineUsers, messages })
  })

  socket.on("logout", function (user) {
    let index = users.findIndex(u => u.userName == user.userName);
    users.splice(index, 1);
    console.log(`>> ${user.userName} left the chat 😢`);

    const onlineUsers = users.length;
    console.log(`There are ${onlineUsers} online users now`);
    io.sockets.emit("showMessages", { onlineUsers, messages })
  })

  socket.on("newMessage", function (data) {
    let index = users.findIndex(u => u.userName == data.user.userName);
    if (index != -1) {
      const { user } = data;
      const onlineUsers = users.length;

      user.id = index;
      messages.push({ user, "text": data.message })
      io.sockets.emit("showMessages", { onlineUsers, messages })
    }
  })

})

server.listen(2006, function () {
  console.log("Server started on port 2006!");
  console.log(`There are 0 online users \n`);
})