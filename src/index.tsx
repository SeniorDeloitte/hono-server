import { Hono } from "hono";
import userRouter from "./routes/users";
import authRouter from "./routes/auth";
import postsRouter from "./routes/posts";
import docsRouter from "./routes/docs";
import swaggerRouter from "./routes/swagger";

const app = new Hono();

const View = () => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>ORM</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className="bg-gray-100 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <nav className="bg-white shadow-md mb-8">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
              <h1 className="text-xl font-bold text-blue-600">ORM API</h1>
              <div className="flex space-x-4">
                <a href="/" className="text-gray-700 hover:text-blue-600">
                  Home
                </a>
                <a href="/docs" className="text-gray-700 hover:text-blue-600">
                  Documentation
                </a>
                <a
                  href="/swagger"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Swagger UI
                </a>
              </div>
            </div>
          </nav>
          <h1 className="text-3xl font-bold text-blue-600 mb-6">Hello ORM!</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/api/users"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2">Users</h2>
              <p className="text-gray-600">Manage user data and profiles</p>
            </a>

            <a
              href="/api/auth"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2">Authentication</h2>
              <p className="text-gray-600">Handle user authentication</p>
            </a>

            <a
              href="/api/posts"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2">Posts</h2>
              <p className="text-gray-600">Manage user posts and content</p>
            </a>
          </div>

          <footer className="mt-12 py-6 border-t">
            <div className="container mx-auto px-4 text-center text-gray-500">
              <p>© {new Date().getFullYear()} ORM API. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
};
app.get("/", (c) => {
  return c.html(<View />);
});

app.route("/api/auth", authRouter);
app.route("/api/users", userRouter);
app.route("/api/posts", postsRouter);
app.route("/docs", docsRouter);
app.route("/swagger", swaggerRouter);

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
