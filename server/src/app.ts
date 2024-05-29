import fs from "fs";
import cors from "cors";
import http from "http";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import schedule from "node-schedule";
import session from "express-session";
import cookieParser from "cookie-parser";
import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import express, { NextFunction, Request, Response } from "express";

import sideFunc from "./routes/basicRoutes";
import clerkRouter from "./routes/clerkRoutes";
import LeaveRouter from "./routes/leaveRoutes";
import notifyRouter from "./routes/notifyRoutes";
import { CustomError } from "./custom/CustomError";
import { findUsers } from "./dbServices/userDbServices";
import {
  createPunch,
  deletePunches,
  getPunches,
} from "./dbServices/punchDBServices";

const app = express();

const whiteList = [
  "http://localhost:5173",
  "https://a3ef-43-254-176-117.ngrok-free.app",
  "https://clerk.com",
  "http://localhost:5000",
];

// app.use(cors());

app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      if (!origin || whiteList.includes(origin!)) {
        return callback(null, true);
      }
      callback(new CustomError("Not allowed by CORS", 501));
    },
  })
);

app.use(clerkRouter); //don't move it from here / advance => keep it before bodyParser or express.json(); because we have used bodyParser.raw() in the middleware in routes
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
//   res.header('Access-Control-Allow-Credentials', "true");
//   next()
// });

app.use(cookieParser());

app.use(
  session({
    secret: "XYZ",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());

// app.get("/notifyCount", (req, res, next) => {
//   res.json("hi")
// })

schedule.scheduleJob("00 11 * * 1-6", async () => {
  console.log("running cron job");
  try {
    const users = await findUsers({ isAdmin: false });
    const punchArr: { userId: string; date: number }[] = [];
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const currentTime = currentDate.getTime();
    users.map((user) => {
      const tempPunch = { userId: user._id.toString(), date: currentTime };
      punchArr.push(tempPunch);
    });
    const punches = await getPunches({ date: currentTime });
    if (punches) {
      await deletePunches({ date: currentTime });
    }
    await createPunch(punchArr);
    console.log("cron job successFully ran");
  } catch (error: any) {
    const content =
      new Date() +
      "\r\n" +
      (error.stack ? error.stack : error.message) +
      "\r\n" +
      "\r\n";
    fs.appendFileSync(process.cwd() + "/src/logs/scheduleError.txt", content);
  }
});
app.get("/", (req, res, next) => {
  console.log(req.ip);
  return res.json("welcome to the Leave Management API's");
});
app.use(notifyRouter);
app.use(LeaveRouter);

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
