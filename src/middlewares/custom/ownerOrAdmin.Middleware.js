// export const ownerOrAdminMiddleware = (model, idParam = "id") => {
//   return async (req, res, next) => {
//     try {
//       const user = req.user;
//       const resourceId = req.params[idParam];

//       if (!user) {
//         return res.status(401).json({ message: "No autorizado" });
//       }

//       if (!resourceId) {
//         return res
//           .status(400)
//           .json({ message: "ID del recurso no proporcionado" });
//       }

//       if (user.role === "admin") {
//         return next();
//       }

//       const resource = await model.findById(resourceId);

//       if (!resource) {
//         return res.status(404).json({ message: "Recurso no encontrado" });
//       }

//       if (resource.Author?.toString() !== user._id.toString()) {
//         return res.status(403).json({
//           message: "Acceso restringido: solo propietario o admin",
//         });
//       }

//       next();
//     } catch (error) {
//       console.error("Error en ownerOrAdminMiddleware:", error);
//       return res.status(500).json({
//         message: "Error interno en la verificación de propietario/admin",
//       });
//     }
//   };
// };
import { ArticleModel } from "../../models/article.model.js";

export const ownerOrAdminMiddleware = async (req, res, next) => {
  const user = req.user;
  try {
    const article = await ArticleModel.findById(req.params.id);
    if (article.author.toString() !== user.id && user.role !== "admin") {
      return res.status(403).json({ msg: "No autorizado" });
    }
    next();
  } catch (error) {
    console.log(error);
    console.error(error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};
