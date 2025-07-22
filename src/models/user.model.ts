import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document<Number> {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  role: "user" | "admin";
}

const userSchema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", userSchema);
