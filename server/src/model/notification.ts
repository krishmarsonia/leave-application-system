import mongoose from "mongoose";

const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  tempCountArr: [String],
  id: {
    type: Number,
    default: 1
  }
});

export default mongoose.model("Notification", notificationSchema);