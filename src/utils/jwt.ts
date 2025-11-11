import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "avadakedavra";

export function generateToken(payload: object): string {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
}

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
}
