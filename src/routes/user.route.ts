import { Router } from "express";
import {
  register,
  login,
  getProfile,
  getAllUsers,
} from "../controllers/user.controller";
import { authenticate, authorize } from "../middlewares/auth.middleware";

const router = Router();
router.post("/register", register);
router.post("/login", login);
router.get("/profile", authenticate, getProfile);
router.get("/all", authenticate, authorize(["admin"]), getAllUsers);

export default router;
