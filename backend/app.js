import express from "express";
import cors from "cors";
import { connectDB } from "./DB/Database.js";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import transactionRoutes from "./Routers/Transactions.js";
import userRoutes from "./Routers/userRouter.js";
import { config } from "dotenv";
config();

const app = express();
const port = process.env.PORT;

// Connect to the database
connectDB();

// Define allowed origins
const allowedOrigins = [
  "http://localhost:3001",
  "https://expense-tracker-app-pied-zeta.vercel.app"
];

// CORS configuration
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ['Content-Type', 'Authorization'] // Ensure required headers are allowed
}));

// Logging CORS requests for /api/auth/login
app.get('/api/auth/login', (req, res) => {
  console.log('CORS Request received for /api/auth/login');
  res.json({ message: 'Login successful' });
});

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routers
app.use("/api/v1", transactionRoutes);
app.use("/api/auth", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
  });
}

export default app;
