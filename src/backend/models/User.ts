import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  name: string;
  surname: string;
  email: string;
  password: string;
}

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;
