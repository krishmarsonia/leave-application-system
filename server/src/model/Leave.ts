import mongoose from "mongoose";

const Schema = mongoose.Schema;

const LeaveSchema = new Schema(
  {
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
  },
  { timestamps: true }
);

export default mongoose.model("Leave", LeaveSchema);
