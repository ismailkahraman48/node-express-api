import dotenv from 'dotenv';
import app from './app';
import { connectDB } from './config/db.config';

dotenv.config();
const PORT = process.env.PORT || 3000;

(async (): Promise<void> => {
  await connectDB();
  app.listen(PORT, () => console.log(`🚀 Sunucu: http://localhost:${PORT}`));
})();