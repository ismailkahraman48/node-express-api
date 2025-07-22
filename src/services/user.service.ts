import bcrypt from "bcrypt";
import createError from "http-errors";
import { UserMongoRepository } from "../repository/mongo/user.repository";
import { CreateUserDTO } from "../dto/user.dto";
import { User } from "../types/user.type";

const userRepository = new UserMongoRepository();

export async function registerUser(
  username: string,
  email: string,
  password: string
): Promise<Pick<User, "id" | "name" | "email" | "role">> {
  const exists = await userRepository.findByEmail(email);
  if (exists) throw createError.Conflict("Kullanıcı zaten mevcut");

  const hash = await bcrypt.hash(password, 10);
  const user = await userRepository.create({
    username,
    email,
    password: hash,
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

export async function authenticateUser(
  username: string,
  password: string
): Promise<User> {
  // Username ile arama için findAll ve filter kullanılabilir veya findByUsername eklenebilir
  const users = await userRepository.findAll();
  const user = users.find((u) => u.name === username);
  if (!user)
    throw createError.Unauthorized("Geçersiz bilgiler kullanıcı bulunamadı");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw createError.Unauthorized("Geçersiz bilgiler hatalı şifre");

  return user;
}

export async function getAllUsersService(): Promise<Omit<User, "password">[]> {
  const users = await userRepository.findAll();
  return users.map(({ password, ...rest }) => rest);
}
