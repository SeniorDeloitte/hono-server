import { Hono } from "hono";
import { userRoutes } from "./routes/users";
import { authRoutes } from "./routes/auth";
import postsRouter from "./routes/posts";
import docsRouter from "./routes/docs";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import swaggerRouter from "./routes/swagger";
import { HomePage } from "@/pages";

const app = new Hono();

app.get("/", (c) => {
  return c.html(<HomePage />);
});

app.route("/api/auth", authRoutes);
app.route("/api/users", userRoutes);
app.route("/api/posts", postsRouter);
app.route("/docs", docsRouter);
app.route("/swagger", swaggerRouter);

app.notFound((c) => {
  return c.text("Not found", 404);
});

app.onError(errorMiddleware);

export default {
  port: process.env.PORT || 5000,
  fetch: app.fetch,
};
