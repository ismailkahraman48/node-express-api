import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { User } from "../models/user.model";

async function createAdmin() {
  await mongoose.connect(process.env.MONGO_URI!);
  const hash = await bcrypt.hash("admin", 10);
  await User.create({
    username: "admin",
    email: "admin@example.com",
    password: hash,
    role: "admin",
  });
  console.log("Admin oluşturuldu!");
  process.exit();
}

export default createAdmin;
