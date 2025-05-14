import jwt from "jsonwebtoken";
import UserDTO from "../dtos/userDTO.js";

export const loginUser = (req, res) => {
  if (!req.user)
    return res.status(401).send({ message: "Invalid credentials" });

  const userDTO = new UserDTO(req.user);

  const token = jwt.sign(
    { user: userDTO },
    process.env.JWT_SECRET || "secret123",
    {
      expiresIn: "1h",
    }
  );
  res.send({ token });
};
