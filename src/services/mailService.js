import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const sendResetPasswordMail = async (to, link) => {
  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to,
    subject: "Recupera tu contraseña",
    html: `<p>Haz click en el siguiente enlace para restablecer tu contraseña:</p>
           <a href="${link}">Restablecer contraseña</a>`,
  });
};
