const express = require("express");
const http = require("http");
const jwt = require("jwt-simple");
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const Message = require("./models/message");

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
const onlineUsernames = {}; // store / keep track online usernames

/*
 * GET Routes
 */

app.get("/", (req, res) => {
  res.send("<h1>Chat App Backend</h1>");
});

/*
 * Login & Auth Routes
 */

app.post("/login", async (req, res) => {
  if (req.body.username && req.body.roomId) {
    /*
     * check if username is online or already taken
     * if true (online / already taken), return an error
     * if false (username is available), authenticate user
     */

    if(onlineUsernames[req.body.username]) {
      res.status(401).json({ error: "username_exists" });
      return;
    }

    try {
      const result = await Message.findOne({ username: req.body.username });
      if (result) {
        res.status(401).json({ error: "username_exists" });
      } else {
        const payload = {
          username: req.body.username,
          roomId: req.body.roomId,
        };

        const jwt_token = jwt.encode(payload, jwtSecret);
        res.status(201).json({ status: "success", jwt_token });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(401).json({ error: "invalid_request" });
    }
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
    if (data && !onlineUsernames[data.username]) {
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
  socket.on("join_room", ({ username, roomId }) => {
    //add username to online username list
    onlineUsernames[username] = socket.id;
    
    //join room
    socket.join(roomId);

    console.log(`user ${username} connected and joined ${roomId}`)
  });

  socket.on("send_message", async ({ username, message, roomId }) => {
    //save message in db
    const newMessage = new Message({
      roomId,
      username,
      message,
      createdAt: new Date(),
    });
    try {
      await newMessage.save();

      //send message to clients in roomId
      io.in(roomId).emit("incoming_message", { username, message });
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("disconnect", () => {
    //remove username from online username list
    const disconnectedUsername = Object.keys(onlineUsernames).find(
      (username) => onlineUsernames[username] === socket.id
    );
    if (disconnectedUsername) {
      delete onlineUsernames[disconnectedUsername];
      console.log(`user ${disconnectedUsername} disconnected`)
    }
  });
});

/*
 * Start Express and Mongoose
 */

const startServer = async () => {
  try {
    await mongoose.connect(
      "mongodb://root:example@localhost:27017/chat?authSource=admin"
    );
    server.listen(3000, () => {
      console.log("listening on *:3000");
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();
