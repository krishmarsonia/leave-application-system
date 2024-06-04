import mongoose from "mongoose";

const Schema = mongoose.Schema;

const punchSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  punchCount: {
    type: Number,
    required: true,
    default: 0,
  },
  punchInTime: {
    type: Number,
    required: true,
  },
  punchOutTime: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("Punch", punchSchema);
