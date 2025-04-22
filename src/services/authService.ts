import { createJWT } from "@/utils/jwt";
import { UserModel } from "../database/models/user";
import { hashPassword, verifyPassword } from "../utils/password";

interface AuthPayload {
  username: string;
  password: string;
}

interface AuthResult {
  success: boolean;
  message?: string;
  token?: string;
  user?: { id: string; username: string };
}

export const AuthService = {
  async login({ username, password }: AuthPayload): Promise<AuthResult> {
    try {
      const user = await UserModel.findByUsername(username);
      if (!user) {
        return { success: false, message: "Invalid credentials" };
      }
      const valid = await verifyPassword(password, user.password);
      if (!valid) {
        return { success: false, message: "Invalid credentials" };
      }
      const token = createJWT({ id: user.id, username: user.username });
      return {
        success: true,
        token,
        user: { id: user.id, username: user.username },
      };
    } catch (err) {
      return { success: false, message: "Internal server error" };
    }
  },

  async register({ username, password }: AuthPayload): Promise<AuthResult> {
    try {
      const existing = await UserModel.findByUsername(username);
      if (existing) {
        return { success: false, message: "Username already exists" };
      }
      const hashed = await hashPassword(password);
      const user = await UserModel.create({ username, password: hashed });
      return {
        success: true,
        user: { id: user.id, username: user.username },
      };
    } catch (err) {
      return { success: false, message: "Internal server error" };
    }
  },
};
