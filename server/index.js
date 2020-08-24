//imports
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const router = require("./router");

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users.js");

//PORT declaration
const PORT = process.env.PORT || 4000;

//configure server and socketio
const app = express();
const server = http.createServer(app);
const io = socketio(server);

//setting app
app.use(router);

//initialize server --- im using await for clean code
async function main() {
  await server.listen(PORT);
  console.log(`Server has started on port ${PORT}`);
}
main();

//initialize io
io.on("connection", (socket) => {
  console.log("user conected");

  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    console.log(user);
    if (error) return callback(error);

    socket.join(user.room);

    socket.emit("message", { 
      user: "admin",
      text: `${user.name}, welcome to room ${user.room}.`,
    });

    socket.broadcast
      .to(user.room) //to all room
      .emit("message", { user: "admin", text: `${user.name} has joined!` });

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser({ id: socket.id });

    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    console.log("user left");
  });
});
