import express from "express";
import {
  registerControllers,
  loginControllers,
  setAvatarController,
  allUsers
} from "../controllers/userController.js";
import rateLimit from 'express-rate-limit';

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many login attempts, please try again later."
});

router.post("/register", registerControllers);
router.post('/login', loginLimiter, loginControllers);
// router.post("/login", loginControllers);
router.put("/set-avatar/:id", setAvatarController);
router.get("/all/:id", allUsers);

export default router;
