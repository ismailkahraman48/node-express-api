import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI as string;
console.log(MONGO_URI)

export async function connectDB() : Promise<void> {
    try {
        await mongoose.connect(MONGO_URI)
        console.log('✅ MongoDB bağlantısı başarılı');
    } catch (error) {

        console.error('❌ MongoDB bağlantı hatası:', error);
    process.exit(1);
    }
}
