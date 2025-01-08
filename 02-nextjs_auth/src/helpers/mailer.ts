/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import User from "@/models/userModel";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const verifyEmailContent = `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to verify your email.
    Or copy and paste the link below in your browser: <br>${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`;
    const resetEmailContent = `<p>Click <a href="${process.env.DOMAIN}/resetpassword?token=${hashedToken}">here</a> to reset your password.
    Or copy and paste the link below in your browser: <br>${process.env.DOMAIN}/resetpassword?token=${hashedToken}</p>`;

    const emailContent = emailType === "VERIFY" ? verifyEmailContent : resetEmailContent;

    const transporter = nodemailer.createTransport({
      host: process.env.NODEMAILER_HOST,
      port: Number(process.env.NODEMAILER_PORT),
      auth: {
        user: process.env.NODEMAILER_USER_NAME,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.MAILTRAP_USER,
      to: email,
      subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: emailContent,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
