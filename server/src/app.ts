import cors from "cors";
import http from "http";
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

import sideFunc from "./routes/basicRoutes";
import notifyRouter from "./routes/notifyRoutes";
import clerkRouter from "./routes/clerkRoutes";

const app = express();
app.use(cors());

app.use(clerkRouter); //don't move it from here / advance => keep it before bodyParser or express.json(); because we have used bodyParser.raw() in the middleware in routes
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());

// app.get("/notifyCount", (req, res, next) => {
//   res.json("hi")
// })

app.use(notifyRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  console.log(err.message);
  res.status(err.statusCode).json({ message: err.message });
});
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

let sockets: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;

io.on("connection", async (socket) => {
  console.log("A user connected");
  console.log(socket.handshake.query?.userId);
  console.log("rooms", socket.rooms);
  // socket.join(
  //   socket.handshake.query?.userId ? socket.handshake.query?.userId : ""
  // );
  socket.handshake.query.userId && socket.join(socket.handshake.query.userId);
  sideFunc(socket);
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
  sockets = socket;
});

mongoose
  .connect(
    "mongodb+srv://Krish_Marsonia:x5fRiStvTOU5KGOB@cluster0.ecnqg.mongodb.net/Leave_Application?retryWrites=true&w=majority"
  )
  .then(() => {
    server.listen(5000, () => {
      console.log("server running at 5000");
    });
  })
  .catch((err) => console.log(err));

const socketObj = io;

export default socketObj;
