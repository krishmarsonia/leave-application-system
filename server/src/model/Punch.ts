import mongoose from "mongoose";

const Schema = mongoose.Schema;

const punchSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  punchInTime: {
    type: Number,
    required: false,
    default: 0,
  },
  punchOutTime: {
    type: Number,
    required: false,
    default: 0,
  },
  date: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Punch", punchSchema);
