import mongoose from "mongoose";

export const connectDB = async () => {
    // const db = process.env.MONGO_URL;
    const db = 'mongodb+srv://kdeepak2217:FyugB0N6kX0E0Rhh@cluster0.z8vws.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

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
