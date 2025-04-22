import { Context } from "hono";
import { AuthService } from "../services/authService";

export async function login(c: Context) {
  const body = await c.req.json();
  const result = await AuthService.login(body);

  return c.json(result, result.success ? 200 : 401);
}

export async function register(c: Context) {
  const body = await c.req.json();
  const result = await AuthService.register(body);

  return c.json(result, result.success ? 201 : 400);
}
