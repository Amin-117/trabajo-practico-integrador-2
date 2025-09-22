import { body, param } from "express-validator";

// Validación creación de artículo
export const validateArticleCreation = [
  body("tittle")
    .isString()
    .withMessage("El título debe ser una cadena de texto")
    .isLength({ min: 3, max: 200 })
    .withMessage("El título debe tener entre 3 y 200 caracteres"),
  body("content")
    .isString()
    .withMessage("El contenido debe ser una cadena de texto")
    .isLength({ min: 500 })
    .withMessage("El contenido debe tener al menos 500 caracteres"),
  body("tags")
    .optional()
    .isArray()
    .withMessage("Tags debe ser un array de IDs"),
];

// Validación actualización de artículo
export const validateArticleUpdate = [
  body("id").isMongoId().withMessage("El ID del artículo debe ser válido"),
  body("tittle").optional().isString().isLength({ min: 3, max: 200 }),
  body("content").optional().isString().isLength({ min: 500 }),
  body("tags").optional().isArray(),
];
