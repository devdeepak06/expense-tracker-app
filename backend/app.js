// backend/app.js
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
connectDB();
const allowedOrigins = [
  "https://expense-tracker-app-pied-zeta.vercel.app"
];

app.use(express.json());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/v1", transactionRoutes);
app.use("/api/auth", userRoutes);
app.get("/", (req, res) => {
  res.send("Hello World!");
  console.log(req.headers)
});
if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
  });
}
export default app;
