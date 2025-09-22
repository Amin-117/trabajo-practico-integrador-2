export const adminMiddleware = (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "No autorizado" });
    }

    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Acceso restringido: solo admins" });
    }

    next();
  } catch (error) {
    console.error("Error en adminMiddleware:", error);
    res
      .status(500)
      .json({ message: "Error interno en la verificación de admin" });
  }
};
