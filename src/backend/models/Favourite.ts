import mongoose, { Document, Schema } from "mongoose";

interface IFavourite extends Document {
  id: string;
  userId: string;
  bookId: string;
  addedAt: Date;
}

const favouriteSchema: Schema = new Schema({
  id: { required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  addedAt: { type: Date, default: Date.now },
});

const Favourite = mongoose.model<IFavourite>("Favourite", favouriteSchema);
export default Favourite;
