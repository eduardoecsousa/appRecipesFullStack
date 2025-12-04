import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const refreshToken = req.headers.get("cookie")?.split("=")[1];

  if (!refreshToken) {
    return NextResponse.json({ error: "sem token" }, { status: 401 });
  }

  try {
    const data = jwt.verify(refreshToken, process.env.JWT_SECRET!);

    const newAccessToken = jwt.sign(
      { email: (data as any).email },
      process.env.JWT_SECRET!,
      { expiresIn: "15m" }
    );

    return NextResponse.json({ accessToken: newAccessToken });
  } catch {
    return NextResponse.json({ error: "refresh expirado" }, { status: 401 });
  }
}
