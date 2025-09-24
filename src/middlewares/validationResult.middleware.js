// import { validationResult } from "express-validator";

// export const validateResult = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   next();
// };
import { validationResult, matchedData } from "express-validator";

export const validateResult = (req, res, next) => {
  const errors = validationResult(req);
  console.log(
    "Errores encontrados:",
    !errors.isEmpty() ? errors.array() : "Ninguno"
  );

  if (!errors.isEmpty()) {
    console.log("Retornando errores de validación:", errors.array());
    return res.status(400).json({
      message: "Errores de validación",
      errors: errors.array(),
    });
  }

  try {
    req.validatedData = matchedData(req);
    next();
  } catch (error) {
    console.error("ERROR EN APPLY VALIDATIONS:", error);
    return res.status(500).json({ message: "Error en validaciones" });
  }
};
