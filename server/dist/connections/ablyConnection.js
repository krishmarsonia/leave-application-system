"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ably = void 0;
const ably_1 = __importDefault(require("ably"));
require("dotenv");
const CustomError_1 = require("../custom/CustomError");
if (!process.env.ABLYKEY) {
    throw new CustomError_1.CustomError("ABLYKEY not found in environment variables.", 422);
}
exports.ably = new ably_1.default.Realtime(process.env.ABLYKEY);
exports.ably.connection.once("connected", () => {
    console.log("ably connected");
});
