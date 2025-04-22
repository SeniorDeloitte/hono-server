import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY || "default_secret";

export function createJWT(payload: object): string {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
}

export function verifyJWT(token: string): object | null {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return typeof decoded === "string" ? { value: decoded } : decoded;
  } catch {
    return null;
  }
}
