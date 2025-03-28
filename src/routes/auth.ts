import { Hono } from "hono";
import { sign, verify } from "hono/jwt";
import { User } from "../types";
import dotenv from "dotenv";
import db from "../database";
import { bearerAuth } from "hono/bearer-auth";

dotenv.config();

const authRouter = new Hono();

const SECRET_KEY = process.env.SECRET_KEY || "eirwuhfsdjhfurieunferiufh";

authRouter.get("/", (c) => {
  return c.html(
    `<!DOCTYPE html>
    <html>
      <head>
        <title>Welcome to Auth Service</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            text-align: center;
          }
          h1 { color: #333; }
          .description { color: #666; margin: 20px 0; }
        </style>
      </head>
      <body>
        <h1>Welcome to the Authentication Service</h1>
        <p class="description">
          This service provides user authentication and authorization functionality.
          Use the following endpoints:
        </p>
        <ul style="list-style: none; padding: 0;">
          <li>/register - Create a new user account</li>
          <li>/login - Sign in to your account</li>
          <li>/protected - Access protected resources</li>
        </ul>
      </body>
    </html>`
  );
});

authRouter.post("/register", async (c) => {
  try {
    const newUser: Omit<User, "id"> = await c.req.json();

    // Check if email already exists
    const checkStmt = db.prepare("SELECT email FROM users WHERE email = ?");
    const existingUser = checkStmt.get(newUser.email);

    if (existingUser) {
      return c.json(
        { ok: false, message: "Email already registered" },
        409 // Conflict status code
      );
    }

    const hashedPassword = await Bun.password.hash(newUser.password);

    const stmt = db.prepare(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)"
    );

    const info = stmt.run(newUser.name, newUser.email, hashedPassword);

    const createdUser: User = {
      id: info.lastInsertRowid as number,
      ...newUser,
      password: hashedPassword,
    };

    return c.json({ ok: true, message: "User registered", user: createdUser });
  } catch (error) {
    console.error("Registration error:", error);
    return c.json({ ok: false, message: "Registration failed" }, 500);
  }
});

authRouter.post("/login", async (c) => {
  const { email, password } = await c.req.json();

  const stmt = db.prepare("SELECT * FROM users WHERE email = ?");
  const user = stmt.get(email) as User;

  try {
    // Use Bun.password.verify to check the provided password against the stored hash
    if (user && (await Bun.password.verify(password, user.password))) {
      // Create payload object for JWT
      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
      };

      // Add explicit algorithm and expiration
      const token = await sign(payload, SECRET_KEY);

      if (!token) {
        throw new Error("Token generation failed");
      }

      return c.json({ ok: true, message: "Login successful", token });
    }

    return c.json({ ok: false, message: "Invalid credentials" }, 401);
  } catch (error) {
    console.error("Login error:", error);
    return c.json({ ok: false, message: "Authentication failed" }, 500);
  }
});

// Protect the /protected route using bearerAuth middleware
authRouter.use("/protected", bearerAuth({ token: SECRET_KEY }));

authRouter.get("/protected", (c) => {
  const authHeader = c.req.header("Authorization");

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      // Use verify from "hono/jwt" to validate the token
      const decoded = verify(token, SECRET_KEY);
      return c.json({ ok: true, message: "Protected route", user: decoded });
    } catch (err) {
      console.error("Login error:", err);
      return c.json({ ok: false, message: "Invalid token" }, 401);
    }
  } else {
    return c.json({ ok: false, message: "No token provided" }, 401);
  }
});

export default authRouter;
