"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const punchHistory = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    punchInTime: {
        type: Number,
        required: true,
    },
    punchOutTime: {
        type: Number,
        required: true,
    },
    isOnLeave: {
        type: Boolean,
        default: false,
    },
    date: {
        type: Number,
        required: true
    }
});
exports.default = mongoose_1.default.model("punch-History", punchHistory);
