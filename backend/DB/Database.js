import mongoose from "mongoose";
import { config } from "dotenv";
config();
export const connectDB = async () => {
    const db = process.env.MONGO_URL;
    if (!db) {
        throw new Error("MONGO_URL is not defined in the environment variables");
    }
    try {
        const { connection } = await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true, // Ensures support for the latest MongoDB driver
        });

        console.log(`MongoDB Connected: ${connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};