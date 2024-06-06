import mongoose from "mongoose";

const Schema = mongoose.Schema;

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

export default mongoose.model("punch-History", punchHistory);
