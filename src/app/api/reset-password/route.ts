import { AppDataSource } from "@/lib/dataSource";
import ResetPasswordService from "@/module/tokenResetPassword/useCase/resetPassword.service";
import UserService from "@/module/user/useCase/Service/user.service";

const resetPasswordService = new ResetPasswordService();
const userService = new UserService();


async function initDB() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
}

export async function POST(request: Request) {
  await initDB();
  const { userId, newPassword, token } = await request.json();
  try {
    await userService.updatePassword(userId, newPassword);
    await resetPasswordService.deleteToken(token);
    return new Response(JSON.stringify({ message: "Senha atualizada com sucesso." }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ message: error.message || "Internal Server Error" }), { status: 400 });
  }
}

export async function GET(req: Request, context: { params: Promise<{ token: string }> }) {
  await initDB();
  const allTokens = await resetPasswordService.allTokens();
  return new Response(JSON.stringify({ allTokens }), { status: 200 });
}

export async function DELETE(request: Request) {
  await initDB();
  const { token } = await request.json();
  try {
    await resetPasswordService.deleteToken(token);
    return new Response(JSON.stringify({ message: "Token deletado com sucesso." }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ message: error.message || "Internal Server Error" }), { status: 400 });
  }
} 