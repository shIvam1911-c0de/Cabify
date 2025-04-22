const socketIO = require("socket.io");
const userModel = require("./models/user.model");
const captainModel = require("./models/captain.model");
let io;

function initializeSocket(server) {
  io = socketIO(server, {
    // ...any socket.io configuration...
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);
    // ...any connection events...

    // socket.on("joinRoom", (roomName) => {
    //   socket.join(roomName);
    //   console.log(`Socket ${socket.id} joined room ${roomName}`);
    // });

    socket.on("join", async (data) => {
      const { userId, userType } = data;

      console.log(`User ${userId} joined as ${userType}`);

      if (userType === "user") {
        await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
      } else if (userType === "captain") {
        await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
      }
    });

    // socket.on("sendMessage", ({ roomName, message }) => {
    //   io.to(roomName).emit("newMessage", { sender: socket.id, message });
    // });

    // update location of captain
    socket.on("update-location-captain", async (data) => {
      const { userId, location } = data;
      console.log(userId);
      console.log(location);
      if (!location || !location.ltd || !location.lng) {
        return socket.emit("error", { message: "Invalid location data" });
      }
      await captainModel.findByIdAndUpdate(userId, { 
        $set: { 
            location: {
                type: "Point",
                coordinates: [location.lng, location.ltd]
            }
        }
      });
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
      // ...any disconnection events...
    });
  });
}

function sendMessageToSocketId(socketId, messageObject) {
  console.log(`Sending message to socket ${socketId}`, messageObject);

  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.log("Socket not initialized");
  }
}

module.exports = { initializeSocket, sendMessageToSocketId };
