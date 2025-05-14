import jwt from "jsonwebtoken";
import userRepository from "../repositories/userRepository.js";
import { createHash, isValidPassword } from "../utils/hash.js";
import { sendResetPasswordMail } from "../services/mailService.js";

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await userRepository.getUserByEmail(email);
  if (!user) return res.status(404).send({ message: "Usuario no encontrado" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  const link = `http://localhost:3000/reset-password/${token}`;
  await sendResetPasswordMail(email, link);
  res.send({ message: "Correo enviado" });
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userRepository.getUserById(payload.id);
    if (!user)
      return res.status(404).send({ message: "Usuario no encontrado" });
    if (isValidPassword(user, password)) {
      return res
        .status(400)
        .send({ message: "No puedes usar la misma contraseña anterior" });
    }
    await userRepository.updateUserPassword(user._id, createHash(password));
    res.send({ message: "Contraseña actualizada" });
  } catch (e) {
    res.status(400).send({ message: "Enlace inválido o expirado" });
  }
};
