import mongoose from "mongoose";

const Schema = mongoose.Schema;

const punchHistory = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  punchIn: {
    type: Number,
    required: true,
  },
  punchOut: {
    type: Number,
    required: true,
  },
  isOnLeave: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("punchHistory", punchHistory);
