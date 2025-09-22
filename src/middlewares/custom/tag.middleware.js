import { body, param } from "express-validator";

// Validación creación de tag
export const validateTagCreation = [
  body("name")
    .isString()
    .withMessage("El nombre debe ser una cadena de texto")
    .isLength({ min: 2, max: 30 })
    .withMessage("El nombre debe tener entre 2 y 30 caracteres"),
  body("description")
    .optional()
    .isString()
    .withMessage("La descripción debe ser una cadena de texto")
    .isLength({ min: 20 })
    .withMessage("La descripción debe tener al menos 20 caracteres"),
];

// Validación actualización de tag
export const validateTagUpdate = [
  body("id").isMongoId().withMessage("El ID del tag debe ser válido"),
  body("name").optional().isString().isLength({ min: 2, max: 30 }),
  body("description").optional().isString().isLength({ min: 20 }),
];
