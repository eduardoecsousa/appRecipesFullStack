import { NextResponse } from "next/server";
import { comparePassword } from "@/utils/crypto";
import { generateToken } from "@/utils/jwt";
import UserService from "@/module/user/useCase/Service/user.service";
import { AppDataSource } from "@/lib/dataSource";

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

    const token = generateToken({ id: user.id, email: user.email });
    return NextResponse.json({ token });
  } catch (error:any) {
    return NextResponse.json({ error: error.message || "" }, { status: 500 });
  }

}
