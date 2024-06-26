import fs from "fs";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";
import session from "express-session";
import cookieParser from "cookie-parser";
import express, { NextFunction, Request, Response } from "express";

// import sideFunc from "./routes/basicRoutes";
// import testRoutes from "./routes/testRoutes";
import clerkRouter from "./routes/clerkRoutes";
import LeaveRouter from "./routes/leaveRoutes";
import punchRouter from "./routes/punchRoutes";
import notifyRouter from "./routes/notifyRoutes";
import { CustomError } from "./custom/CustomError";

import "dotenv";

const app = express();

const whiteList = [
  "http://localhost:5173",
  "https://a3ef-43-254-176-117.ngrok-free.app",
  "https://clerk.com",
  "http://localhost:5000",
  "http://localhost:3000",
  "https://lmst3-krishmarsonias-projects.vercel.app",
];

app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      if (!origin || whiteList.includes(origin)) {
        return callback(null, true);
      }
      return callback(new CustomError("Not allowed by CORS", 501));
    },
  })
);

app.use(clerkRouter); //don't move it from here / advance => keep it before bodyParser or express.json(); because we have used bodyParser.raw() in the middleware in routes

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

app.use(notifyRouter);
app.use(LeaveRouter);
// app.use(testRoutes);
app.use(punchRouter);

console.log(194, path.join(__dirname, "public", "index.html"));
app.use(express.static(path.resolve(__dirname, "public")));
app.get("*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  console.log(err.message);
  res.status(err.statusCode).send({ message: err.message });
});

export default app;
