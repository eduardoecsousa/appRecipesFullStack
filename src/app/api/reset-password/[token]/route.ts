import { AppDataSource } from "@/lib/dataSource";
import ResetPasswordService from "@/module/tokenResetPassword/useCase/resetPassword.service";

const service = new ResetPasswordService()

async function initDB() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
}

export async function GET(req: Request, context: { params: Promise<{ token: string }> }) {
  await initDB();
  const { token } = await context.params;
  try {
    const userId = await service.validarToken(token);
    return new Response(JSON.stringify({ userId }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ message: error.message || "Internal Server Error" }), { status: 400 });
  }
}