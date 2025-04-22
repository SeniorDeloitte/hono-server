import { Hono } from "hono";
import { login, register } from "../controllers/authController";

export const authRoutes = new Hono();

authRoutes.post("/login", login);
authRoutes.post("/register", register);
