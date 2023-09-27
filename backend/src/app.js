const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.DB_PORT || 3001;
const http = require("http").createServer(app);
const achievementEventEmitter = require("./listeners/achievementEvents");

const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Import routes
const userRoutes = require("./routes/userRoutes");

// Middleware
app.use(express.json());
app.use(cors());
app.use(userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

io.on("connection", (socket) => {
  console.log("New client connected");

  achievementEventEmitter.on("eventTriggered", (eventData) => {
    socket.emit("eventTriggered", eventData);
  });
});

// Socket server for events
http.listen(3002, () => {
  console.log("listening on *:3002");
});
