"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const LeaveSchema = new Schema({
    employeeId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    leaveType: {
        type: String,
        enum: ["selectedHours", "fullDay", "SeveralDays"],
        required: true,
    },
    startDate: {
        type: Number,
        required: true,
    },
    endDate: {
        type: Number,
        required: true,
    },
    dateActioned: { type: String, required: false },
    approvedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    approved: {
        type: Boolean,
        default: false,
    },
    cancelled: {
        type: Boolean,
        default: false,
    },
    reason: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Leave", LeaveSchema);
