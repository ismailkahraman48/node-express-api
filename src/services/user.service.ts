import bcrypt from "bcrypt";
import createError from "http-errors";
import { User, IUser } from "../models/user.model";

export async function registerUser(
  username: string,
  email: string,
  password: string,
  role: "admin" | "user" = "user"
): Promise<Pick<IUser, "id" | "username" | "email" | "role">> {
  const exists = await User.findOne({ $or: [{ username }, { email }] });
  if (exists) throw createError.Conflict("Kullanıcı zaten mevcut");

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hash, role });

  return {
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
  };
}

export async function authenticateUser(
  username: string,
  password: string
): Promise<IUser> {
  const user = await User.findOne({ username });
  console.log(user);
  if (!user)
    throw createError.Unauthorized("Geçersiz bilgiler kullanıcı bulunamadı");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw createError.Unauthorized("Geçersiz bilgiler hatalı şifre");

  return user;
}

export async function getAllUsersService(): Promise<Partial<IUser>[]> {
  const users = await User.find({}, "-password"); // şifre hariç tüm alanlar
  return users;
}
