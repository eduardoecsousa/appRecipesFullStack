import { generateToken } from "@/utils/jwt";
import { passwordResetRepo } from "../infra/repo/passwordReset.repo";
import User from "@/module/user/infra/entities/user.entity";
import { Equal, MoreThan } from "typeorm";

export default class ResetPasswordService {

  async gerarToken(user: User): Promise<string> {
      const token = generateToken({email: user.email}); // Função para gerar string aleatória
      const expires_at = new Date(Date.now() + 3600000); // Expira em 1 hora (3600000 ms)

      const newToken = passwordResetRepo.create({
          token: token,
          expires_at: expires_at,
          userId: user.id,
          used: false
      });


      console.log("Generated token:", token);
      // Salva no banco de dados
      await passwordResetRepo.save(newToken);
      
      // Retorna o token para inclusão no link de email
      return token;
  }

  async validarToken(tokenEnviado: string) {
  
    const registro = await passwordResetRepo.findOne({
      where: {
        token: Equal(tokenEnviado),
        expires_at: MoreThan(new Date()), // O token NÃO deve estar expirado
        used: Equal(false) // O token NÃO deve ter sido usado
      }
    });
  
    if (!registro) {
      throw new Error("Token inválido, expirado ou já utilizado.");
    }
  
    return registro.userId;
  }

  async allTokens() {
    return passwordResetRepo.find();
  }

  deleteToken(token: string) {
    return passwordResetRepo.delete({ token });
  }
}