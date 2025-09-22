import { body, param } from "express-validator";

// Validaciones para crear un comentario
export const validateCommentCreation = [
  body("content")
    .isString()
    .withMessage("El contenido debe ser una cadena de texto")
    .isLength({ min: 5, max: 500 })
    .withMessage("El contenido debe tener entre 5 y 500 caracteres"),
  body("article").isMongoId().withMessage("El ID del artículo debe ser válido"),
];

// Validación para actualizar un comentario
export const validateCommentUpdate = [
  body("content")
    .optional()
    .isString()
    .withMessage("El contenido debe ser una cadena de texto")
    .isLength({ min: 5, max: 500 })
    .withMessage("El contenido debe tener entre 5 y 500 caracteres"),
  body("id").isMongoId().withMessage("El ID del comentario debe ser válido"),
];
