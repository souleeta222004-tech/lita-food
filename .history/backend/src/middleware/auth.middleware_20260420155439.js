// src/middleware/auth.middleware.js
import { verifyToken } from "../config/jwt.js";

export const protect = (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Unauthorized - No token" });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ message: "Unauthorized - Invalid token" });
  }

  req.user = decoded;
  next();
};