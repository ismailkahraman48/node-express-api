import dotenv from "dotenv";
import app from "./app";
import { connectDB } from "./config/db.config";
import { User } from "./models/user.model";
import { registerUser } from "./services/user.service";
import createAdmin from "./scripts/createAdmin";

dotenv.config();
const PORT = process.env.PORT || 3000;

(async (): Promise<void> => {
  await connectDB();
  // createAdmin();
  app.listen(PORT, () => console.log(`🚀 Sunucu: http://localhost:${PORT}`));
})();
