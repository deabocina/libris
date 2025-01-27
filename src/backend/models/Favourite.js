import mongoose, { Schema } from "mongoose";

const favouriteSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  addedAt: { type: Date, default: Date.now },
});

const Favourite = mongoose.model("Favourite", favouriteSchema);
export default Favourite;
