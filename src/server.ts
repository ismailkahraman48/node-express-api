import dotenv from "dotenv";
import app from "./app";
import { connectDB } from "./config/db.config";
import { User } from "./models/user.model";
import { registerUser } from "./services/user.service";

dotenv.config();
const PORT = process.env.PORT || 3000;

(async (): Promise<void> => {
  await connectDB();
  // registerUser("admin", "admin@admin.com", "admin", "admin");
  app.listen(PORT, () => console.log(`🚀 Sunucu: http://localhost:${PORT}`));
})();
