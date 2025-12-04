import { NextResponse } from "next/server";
import { comparePassword } from "@/utils/crypto";
import { generateToken, generateTokenRefresh } from "@/utils/jwt";
import { AppDataSource } from "@/lib/dataSource";
import UserService from "@/module/user/Service/user.service";

const userService = new UserService()

async function initDB() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
}

export async function POST(req: Request) {
  await initDB();
  const { email, password } = await req.json();

  try {
    const user = await userService.findByEmail(email);

    const isValid = await comparePassword(password, user.password ?? "");
    if (!isValid) {
      return NextResponse.json({ error: "Senha incorreta" }, { status: 401 });
    }

    const accessToken = generateToken({ id: user.id, email: user.email });
    const refreshToken = generateTokenRefresh({ id: user.id, email: user.email });

    const res =  NextResponse.json({ accessToken });

    res.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return res;

  } catch (error:any) {
    return NextResponse.json({ error: error.message || "" }, { status: 500 });
  }

}
