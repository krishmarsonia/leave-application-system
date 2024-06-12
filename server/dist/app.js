"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const clerkRoutes_1 = __importDefault(require("./routes/clerkRoutes"));
const leaveRoutes_1 = __importDefault(require("./routes/leaveRoutes"));
const punchRoutes_1 = __importDefault(require("./routes/punchRoutes"));
const notifyRoutes_1 = __importDefault(require("./routes/notifyRoutes"));
const CustomError_1 = require("./custom/CustomError");
require("dotenv");
const app = (0, express_1.default)();
const whiteList = [
    "http://localhost:5173",
    "https://a3ef-43-254-176-117.ngrok-free.app",
    "https://clerk.com",
    "http://localhost:5000",
    "http://localhost:3000",
];
app.use((0, cors_1.default)({
    credentials: true,
    origin: (origin, callback) => {
        console.log(52, origin);
        if (!origin || whiteList.includes(origin)) {
            return callback(null, true);
        }
        callback(new CustomError_1.CustomError("Not allowed by CORS", 501));
    },
}));
app.use(clerkRoutes_1.default);
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Private-Network", "*");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-CSRF-Token");
    res.setHeader("Access-Control-Allow-Credentials", "*");
    next();
});
app.use((0, cookie_parser_1.default)());
app.use((0, express_session_1.default)({
    secret: "XYZ",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
}));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.get("/", (req, res, next) => {
    console.log(req.ip);
    return res.json("welcome to the Leave Management API's");
});
app.use(notifyRoutes_1.default);
app.use(leaveRoutes_1.default);
app.use(punchRoutes_1.default);
// console.log(170, path_1.default.resolve(__dirname, "public", "index.html"));
// console.log(path_1.default.resolve(path_1.default.resolve(), "dist/public"));
// app.use(express_1.default.static(path_1.default.resolve(path_1.default.resolve(), "dist/public")));
// app.get("*", (req, res, next) => {
//     res.setHeader('Content-Type', 'text/html');
//     res.sendFile(path_1.default.join(path_1.default.resolve(), "dist", "public", "index.html"));
// });
app.use((err, req, res, next) => {
    console.log(err);
    console.log(err.message);
    res.status(err.statusCode).send({ message: err.message });
});
exports.default = app;
