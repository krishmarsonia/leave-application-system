import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  externalId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  leaves_remaining: {
    type: Number,
    default: 15,
  },
});

export default mongoose.model("User", userSchema);
