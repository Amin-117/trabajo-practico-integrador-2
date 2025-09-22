import { UserModel } from "../../models/user.model";

// Valida si un ID de usuario existe en la DB
export const validateUserId = async (id) => {
  const user = await UserModel.findById(id);
  if (!user) throw new Error("Usuario no encontrado");
  return true;
};

// Valida que el email sea único
export const validateEmailUnique = async (email) => {
  const existing = await UserModel.findOne({ email });
  if (existing) throw new Error("El email ya está en uso");
  return true;
};
