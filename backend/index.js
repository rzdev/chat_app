const express = require("express");
const http = require("http");
const jwt = require("jwt-simple");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // enable cors for development front-end app
  },
});

app.use(cors());
app.use(express.json());

const jwtSecret = "vouch_chatapp"; // for the sake of simplicity, jwt secret is hardcoded

/*
 * Get Routes
 */

app.get("/", (req, res) => {
  res.send("<h1>Chat App Backend</h1>");
});

/*
 * Login & Auth Routes
 */

app.post("/login", (req, res) => {
  if (req.body.username && req.body.roomId) {
    const payload = {
      username: req.body.username,
      roomId: req.body.roomId,
    };

    const jwt_token = jwt.encode(payload, jwtSecret);
    res.status(201).json({ status: "success", jwt_token });
  } else {
    res.status(401).json({ error: "invalid_request" });
  }
});

app.post("/auth", (req, res) => {
  const authHeader = req.get("Authorization");
  if (authHeader) {
    const tokenArr = authHeader.split(" ");
    if (!tokenArr.length > 1) {
      res.status(401).json({ error: "invalid_token" });
      return;
    }

    const data = jwt.decode(tokenArr[1], jwtSecret);

    if (data) {
      res.status(200).json(data);
    } else {
      res.status(401).json({ error: "invalid_token" });
    }
  } else {
    res.status(401).json({ error: "invalid_request" });
  }
});

/*
 * Socket.io event listeners
 */

io.on("connection", (socket) => {
  socket.on("join_room", ({ roomId }) => {
    socket.join(roomId);
  });

  socket.on("send_message", ({ username, message, roomId }) => {
    io.in(roomId).emit("incoming_message", { username, message });
  });
});

/*
 * Express methods
 */

server.listen(3000, () => {
  console.log("listening on *:3000");
});
