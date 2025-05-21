import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    method: ["GET", "POST"],
  },
});

export const getReceverSocketId=(receiverId)=>{
    return userSocketmap[receiverId]
}

const userSocketmap = {}; //{userId:socketId}

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId;

  if (userId !== "undefined") {
    userSocketmap[userId] = socket.id;
  }

/* The line `io.emit("getOnlineUsers", Object.keys(userSocketmap));` is emitting a custom event named
"getOnlineUsers" to all connected clients. The event data being sent is an array of user IDs that
are currently online, obtained by extracting the keys from the `userSocketmap` object. This allows
clients to receive an updated list of online users whenever a new user connects or disconnects. */
  io.emit("getOnlineUsers", Object.keys(userSocketmap));

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    delete userSocketmap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketmap));
  });
});

export { app, io, server };
