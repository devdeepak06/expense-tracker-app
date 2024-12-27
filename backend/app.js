import express from "express";
import cors from "cors";
import { connectDB } from "./DB/Database.js";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import transactionRoutes from "./Routers/Transactions.js";
import userRoutes from "./Routers/userRouter.js";

const app = express();
const port = process.env.PORT || 3000;

// Connect to the database
connectDB();

// Allowed origins for CORS
const allowedOrigins = [
  "http://localhost:3000", // Local development
  "https://expense-tracker-app-jade.vercel.app" // Production
];

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routers
app.use("/api/v1", transactionRoutes);
app.use("/api/auth", userRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the server (for local development)
if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
  });
}

// Export the app for Vercel
export default app;
