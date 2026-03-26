const http = require("http");
const { Server } = require("socket.io");
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
const authRouter = require("./routes/authRoute.js");
const {
  getSession,
  deleteSession,
  getSessionWithoutLogin,
} = require("./controllers/sessionController.js");
const postRoute = require("./routes/postRoute.js");
const itemRoute = require("./routes/itemRoute.js");
const orderRoute = require("./routes/orderRoute.js");
const mongodbStore = require("connect-mongodb-session")(session);
const sessionStore = new mongodbStore({
  url: process.env.MONGODB_STORE_URI,
});

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
let inChatArray = [];
io.on("connection", (socket) => {
  socket.on("new-user-connected", ({ email, to }) => {
    inChatArray = inChatArray.filter((item) => {
      return email !== item.email;
    });

    inChatArray.push({ email: email, socketId: socket.id });
    const present = inChatArray.find((item) => {
      return item.email == to;
    });
    if (present) {
      io.to(
        inChatArray.find((item) => {
          return item.email == email;
        }).socketId,
      ).emit("status-update", { status: "online", statusMail: to });
      io.to(
        inChatArray.find((item) => {
          return item.email == to;
        }).socketId,
      ).emit("status-update", { status: "online", statusMail: email });
    } else {
      io.to(
        inChatArray.find((item) => {
          return item.email == email;
        }).socketId,
      ).emit("status-update", { status: "offline", statusMail: to });
    }
  });
  socket.on("message-sent", ({ to }) => {
    const sentTo = inChatArray.find((item) => {
      return item.email == to;
    });
    if (sentTo) {
      io.to(sentTo.socketId).emit("message-recieved", { success: true });
    }
  });

  socket.on("disconnect", () => {
    let emailToBeDisconnected = "";
    inChatArray = inChatArray.filter((item) => {
      if (item.socketId == socket.id) {
        emailToBeDisconnected = item.email;
      }
      return socket.id !== item.socketId;
    });

    socket.broadcast.emit("status-update", {
      status: "offline",
      statusMail: emailToBeDisconnected,
    });
  });
});
app.use(express.static("./src/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    saveUninitialized: false,
    store: sessionStore,
    resave: false,
    rolling: true,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 60 * 60 * 60,
    },
  }),
);
app.set("view engine", "ejs");
app.set("views", "views");
app.use("/auth", authRouter);
app.use("/post", postRoute);
app.use("/item", itemRoute);
app.use("/order", orderRoute);
app.get("/get-session", getSession);
app.get("/delete-session", deleteSession);
app.get("/get-session-without-login", getSessionWithoutLogin);
app.get("/", (req, res) => {
  console.log(req);
});

module.exports = server;
