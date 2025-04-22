import { Hono } from "hono";
import { authRoutes } from "./routes/auth";
import { userRoutes } from "./routes/users";
import { errorMiddleware } from "./middlewares/errorMiddleware";

const app = new Hono();

app.route("/auth", authRoutes);
app.route("/users", userRoutes);

// Global error handler
app.onError(errorMiddleware);

export default app;
