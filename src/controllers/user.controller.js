import { UserModel } from "../models/user.model.js";

export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find({ deletedAt: null }).select("-password");

    res.status(200).json(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserModel.findOne({ _id: id, deletedAt: null }).select(
      "-password"
    );

    if (!user) {
      return res
        .status(404)
        .json({ message: "Usuario no encontrado o eliminado" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUser = async (req, res) => {
  const { id, name, email, role } = req.body;

  try {
    if (!id) {
      return res.status(400).json({ message: "El id es obligatorio" });
    }

    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: id, deletedAt: null },
      { name, email, role, updatedAt: new Date() },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "Usuario no encontrado o eliminado" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.body;

  try {
    if (!id) {
      return res.status(400).json({ message: "El id es obligatorio" });
    }

    const deletedUser = await UserModel.findOneAndUpdate(
      { _id: id, deletedAt: null },
      { deletedAt: new Date() },
      { new: true }
    );

    if (!deletedUser) {
      return res
        .status(404)
        .json({ message: "Usuario no encontrado o ya eliminado" });
    }

    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
