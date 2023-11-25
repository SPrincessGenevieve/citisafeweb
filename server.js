const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors"); // Import cors module

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: ["http://localhost:3000", "https://sprincessgenevieve.github.io"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Remove the following line
// app.use(cors());

app.use((req, res, next) => {
  const allowedOrigins = [
    "http://localhost:3000",
    "https://sprincessgenevieve.github.io/citisafeweb/#/",
  ];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("updateRecord", (data) => {
    io.emit("recordUpdated", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
