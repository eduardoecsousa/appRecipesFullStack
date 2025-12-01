import nodemailer from 'nodemailer';

// 1. Configurar o Transporter
// Este exemplo usa o Gmail, mas você pode usar qualquer serviço SMTP.
// ⚠️ Nota: Para o Gmail, você precisa gerar uma "Senha de App" nas configurações de segurança da sua conta, pois a senha normal não funciona mais.
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Servidor SMTP do Gmail
  port: 465, // Porta segura
  secure: true, // Use TLS
  auth: {
    user: process.env.EMAIL_USER, // Seu endereço de e-mail
    pass: process.env.EMAIL_PASS // Sua senha de aplicativo
  }
});

// 2. Função de Envio
export default async function sendEmail(to:string, subject:string, htmlContent:string) {
  try {
    const mailOptions = {
      from: `Nome do Remetente <${process.env.EMAIL_USER}>`,
      to: to, // Email do destinatário
      subject: subject, // Assunto do email
      html: htmlContent // Conteúdo do email em HTML
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Mensagem enviada: %s', info.messageId);
    return info;

  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    throw error;
  }
}