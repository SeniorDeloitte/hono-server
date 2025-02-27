import { Hono } from "hono";
import { User } from "../types";
import db from "../database";

const userRouter = new Hono();

// GET route to fetch all users
userRouter.get("/", (c) => {
  const stmt = db.prepare("SELECT id, name, email FROM users");
  const users: Omit<User, "password">[] = stmt.all() as Omit<
    User,
    "password"
  >[];
  return c.json({
    ok: true,
    hasUsers: !!users.length,
    users,
  });
});

// PUT route to update a user's information
userRouter.put("/:id", async (c) => {
  const id = parseInt(c.req.param("id"));
  const updatedUser: Partial<Omit<User, "id">> = await c.req.json();

  // Check if the user exists
  const userExistsStmt = db.prepare("SELECT id FROM users WHERE id = ?");
  const userExists = userExistsStmt.get(id);

  if (!userExists) {
    return c.json({ ok: false, message: "User not found" }, 404);
  }

  // Hash the password if it is provided using Bun.password.hash
  const hashedPassword = updatedUser.password
    ? await Bun.password.hash(updatedUser.password)
    : null;

  // Prepare the SQL statement for updating the user
  const stmt = db.prepare(
    "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?"
  );

  // Execute the SQL statement with the provided parameters
  stmt.run(
    updatedUser.name ?? null,
    updatedUser.email ?? null,
    hashedPassword ?? null,
    id
  );

  return c.json({
    ok: true,
    message: "User updated",
    user: { id, ...updatedUser, password: hashedPassword },
  });
});

// DELETE route to delete a user
userRouter.delete("/:id", (c) => {
  const id = parseInt(c.req.param("id"));
  const stmt = db.prepare("DELETE FROM users WHERE id = ?");
  stmt.run(id);

  return c.json({ ok: true, message: "User deleted" });
});

export default userRouter;
