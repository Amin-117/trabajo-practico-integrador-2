import { verifyToken } from "../../helpers/JWT.helper.js";
import { UserModel } from "../../models/user.model.js";
import { body } from "express-validator";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "No autorizado: token no encontrado" });
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({ message: "Token inválido o expirado" });
    }

    const user = await UserModel.findById(decoded.id);

    if (!user) {
      return res
        .status(401)
        .json({ message: "Usuario no encontrado o inválido" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("Error en authMiddleware:", error);
    return res
      .status(500)
      .json({ message: "Error interno en la autenticación" });
  }
};

export const loginValidation = [
  body("email").isEmail().withMessage("El email no es válido"),
  body("password").notEmpty().withMessage("La contraseña es obligatoria"),
];
