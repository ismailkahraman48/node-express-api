import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {
  authenticateUser,
  registerUser,
  getAllUsersService,
} from "../services/user.service";
import type { Secret } from "jsonwebtoken";
import type { StringValue } from "ms";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as Secret;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { username, email, password } = req.body;
    const user = await registerUser(username, email, password);
    console.log(user);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}

export async function login(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    console.log(req.body);
    const { username, password } = req.body;
    const user = await authenticateUser(username, password);
    if (!JWT_SECRET)
      throw new Error("JWT_SECRET environment variable is not set");
    const token = jwt.sign({ sub: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN as StringValue,
    });
    res.json({ token });
  } catch (error) {
    next(error);
  }
}

export function getProfile(req: Request & { user?: any }, res: Response): void {
  res.json(req.user);
}

export async function getAllUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const users = await getAllUsersService();
    res.json(users);
  } catch (error) {
    next(error);
  }
}
