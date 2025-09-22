export const ownerOrAdminMiddleware = (model, idParam = "id") => {
  return async (req, res, next) => {
    try {
      const user = req.user;
      const resourceId = req.params[idParam];

      if (!user) {
        return res.status(401).json({ message: "No autorizado" });
      }

      if (user.role === "admin") {
        return next();
      }

      const resource = await model.findById(resourceId);

      if (!resource) {
        return res.status(404).json({ message: "Recurso no encontrado" });
      }

      if (resource.Author?.toString() !== user._id.toString()) {
        return res
          .status(403)
          .json({ message: "Acceso restringido: solo propietario o admin" });
      }

      next();
    } catch (error) {
      console.error("Error en ownerOrAdminMiddleware:", error);
      return res.status(500).json({
        message: "Error interno en la verificación de propietario/admin",
      });
    }
  };
};
