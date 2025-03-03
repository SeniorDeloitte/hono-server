import { Hono } from "hono";
import userRouter from "./routes/users";
import authRouter from "./routes/auth";

const app = new Hono();

const View = () => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>ORM</title>
      </head>
      <body>
        <h1>Hello ORM!</h1>
        <ul>
          <li>
            <a href="/api/users">Users</a>
          </li>
          <li>
            <a href="/api/auth">Authentication</a>
          </li>
        </ul>
      </body>
    </html>
  );
};

app.get("/", (c) => {
  return c.html(<View />);
});

app.route("/api/auth", authRouter);
app.route("/api/users", userRouter);

app.notFound((c) => {
  return c.text("Not found", 404);
});

app.onError((err, c) => {
  console.error(`${err.message}`);
  return c.text(`Custom Error Message: ${err.message}`, 500);
});

export default {
  port: process.env.PORT || 5000,
  fetch: app.fetch,
};
