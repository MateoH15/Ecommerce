import jwt from "jsonwebtoken";

export const loginUser = (req, res) => {
  if (!req.user)
    return res.status(401).send({ message: "Invalid credentials" });

  const user = {
    id: req.user._id,
    first_name: req.user.first_name,
    last_name: req.user.last_name,
    email: req.user.email,
    role: req.user.role,
  };

  const token = jwt.sign({ user }, process.env.JWT_SECRET || "secret123", {
    expiresIn: "1h",
  });
  res.send({ token });
};
