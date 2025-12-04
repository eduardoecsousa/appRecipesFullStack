import { AppDataSource } from "@/lib/dataSource";
import sendEmail from "@/module/user/services.email/emailService";
import ResetPasswordService from "@/module/tokenResetPassword/useCase/resetPassword.service";
import User from "@/module/user/infra/entities/user.entity";
import UserService from "@/module/user/Service/user.service";

const service = new UserService();
const resetPasswordService = new ResetPasswordService();

async function initDB() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
}

export async function POST(request: Request) {

  await initDB();
  const { email } = await request.json();
  try {
    const user = await service.findByEmail(email);
    const token = await resetPasswordService.gerarToken(user);
    await sendEmail(
      email,
      "Recuperação de Senha",
      `<p>Olá,</p><p>Clique no link abaixo para redefinir sua senha:</p><a href="http://localhost:3000/reset-password/${encodeURIComponent(token)}">Redefinir Senha</a>`
    );
    // Here you would typically generate a password reset token and send an email
    return new Response(JSON.stringify({ message: "Password reset link sent to your email." }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ message: error.message || "Internal Server Error" }), { status: 400 });
  }
}