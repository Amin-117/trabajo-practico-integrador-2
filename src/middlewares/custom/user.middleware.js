import { body, param } from "express-validator";
import { checkUserExist, validateEmailUnique } from "./custom.user.js";

export const validateUserCreation = [
  body("username")
    .isString()
    .withMessage("El nombre de usuario debe ser una cadena de texto")
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio")
    .isLength({ min: 3, max: 30 })
    .withMessage("El nombre de usuario debe tener entre 3 y 30 caracteres")
    .trim()
    .escape(),
  body("email")
    .isEmail()
    .withMessage("El email debe ser válido")
    .isString()
    .withMessage("El email debe ser una cadena de texto")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .custom(validateEmailUnique)
    .normalizeEmail()
    .escape()
    .trim(),
  body("password")
    .isString()
    .withMessage("La contraseña debe ser una cadena de texto")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres")
    .trim()
    .escape(),
  body("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("El rol debe ser 'user' o 'admin'"),
  body("profile.first_name")
    .isString()
    .withMessage("El nombre debe ser una cadena de texto")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .trim()
    .escape(),
  body("profile.last_name")
    .isString()
    .withMessage("El apellido debe ser una cadena de texto")
    .notEmpty()
    .withMessage("El apellido es obligatorio")
    .trim()
    .escape(),
  body("profile.biography")
    .optional()
    .isString()
    .withMessage("La biografía debe ser una cadena de texto")
    .isLength({ max: 500 })
    .withMessage("La biografía no puede exceder los 500 caracteres"),
];

export const validateUserUpdate = [
  body("username")
    .optional()
    .isString()
    .withMessage("El nombre de usuario debe ser una cadena de texto")
    .isLength({ min: 3, max: 30 })
    .withMessage("El nombre de usuario debe tener entre 3 y 30 caracteres")
    .custom(checkUserExist)
    .trim()
    .escape(),
  body("email")
    .optional()
    .isEmail()
    .withMessage("El email debe ser válido")
    .isString()
    .withMessage("El email debe ser una cadena de texto")
    .custom(validateEmailUnique)
    .normalizeEmail()
    .escape()
    .trim(),
  body("password")
    .optional()
    .isString()
    .withMessage("La contraseña debe ser una cadena de texto")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres")
    .trim()
    .escape(),
  body("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("El rol debe ser 'user' o 'admin'"),
  body("profile.first_name")
    .optional()
    .isString()
    .withMessage("El nombre debe ser una cadena de texto")
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres")
    .trim()
    .escape(),
  body("profile.last_name")
    .optional()
    .isString()
    .withMessage("El apellido debe ser una cadena de texto")
    .isLength({ min: 2, max: 50 })
    .withMessage("El apellido debe tener entre 2 y 50 caracteres")
    .trim()
    .escape(),
  body("profile.biography")
    .optional()
    .isString()
    .withMessage("La biografía debe ser una cadena de texto")
    .isLength({ max: 500 })
    .withMessage("La biografía no puede exceder los 500 caracteres")
    .trim()
    .escape(),
  body("profile.avatar_url")
    .optional()
    .isURL()
    .withMessage("La URL del avatar debe ser válida")
    .trim(),
  body("profile.birth_date")
    .optional()
    .isISO8601()
    .withMessage("La fecha de nacimiento debe ser válida"),
  body("is_active")
    .optional()
    .isBoolean()
    .withMessage("is_active debe ser un valor booleano"),
];

export const validateUserId = [
  param("id")
    .isMongoId()
    .withMessage("El ID debe ser un ObjectId válido de MongoDB"),
];
