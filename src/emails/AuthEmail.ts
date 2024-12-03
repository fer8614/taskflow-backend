import { transporter } from "../config/nodemailer";

interface IEmail {
  email: string;
  name: string;
  token: string;
}

export class AuthEmail {
  static sendConfirmationEmail = async (user: IEmail) => {
    const info = await transporter.sendMail({
      from: "TaskFlow <admin@taskflow.com>",
      to: user.email,
      subject: "TaskFlow - Confirm your email",
      text: "TaskFlow - Confirm your account",
      html: `<p>Hello ${user.name} please click the link to confirm your email</p>
      <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirm your account</a>
      <p> Enter code: <b>${user.token}</b></p>
      <p>This token expire in 5 minutes</p>`,
    });

    console.log("Message sent: %s", info.messageId);
  };

  static sendPasswordResetToken = async (user: IEmail) => {
    const info = await transporter.sendMail({
      from: "TaskFlow <admin@taskflow.com>",
      to: user.email,
      subject: "TaskFlow - Reset your password",
      text: "TaskFlow - Reset your password",
      html: `<p>Hello ${user.name} Please click the link to reset your password</p>
      <a href="${process.env.FRONTEND_URL}/auth/new-password">Reset your password</a>
      <p> Enter code: <b>${user.token}</b></p>
      <p>This token expire in 5 minutes</p>`,
    });

    console.log("Message sent: %s", info.messageId);
  };
}
