import mongoose from "mongoose";

import { User } from "../types";

const UserSchema = new mongoose.Schema<User>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default mongoose.model<User>("User", UserSchema);
