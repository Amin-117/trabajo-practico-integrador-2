import { UserModel } from "../models/user.model.js";
import { hashPassword } from "../helpers/bcrypt.helper.js";
import { comparePassword } from "../helpers/bcrypt.helper.js";
import { generateToken } from "../helpers/JWT.helper.js";

export const registerUser = async (req, res) => {
  const { username, email, password, role, profile } = req.body;
  try {
    const existingUser = await UserModel.find({
      $or: [{ username }, { email }],
    });
    if (existingUser.length > 0) {
      return res
        .status(400)
        .json({ message: "El Usuario o Email ya etsan en uso" });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
      role,
      profile,
    });

    await newUser.save();

    res.status(201).json({ message: "User Registrado Correctamente" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userLog = await UserModel.findOne({ email }).select("+password");

    if (!userLog) {
      return res.status(404).json("Usuario no encontrado");
    }

    const contraseñaCorrecta = await comparePassword(
      password,
      userLog.password
    );
    if (!contraseñaCorrecta) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = generateToken({ id: userLog._id, role: userLog.role });

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .status(200)
      .json({ message: "Logueado Correctamente" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    res.status(200).json({
      message: "Perfil del usuario autenticado",
      user: req.user,
    });
  } catch (error) {
    console.error("Error get userProfile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const { first_name, last_name, biography, avatar_url, birth_date } =
      req.body.profile;

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          "profile.first_name": first_name,
          "profile.last_name": last_name,
          "profile.biography": biography,
          "profile.avatar_url": avatar_url,
          "profile.birth_date": birth_date,
        },
      },
      { new: true, runValidators: true, select: "-password" }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({
      message: "Perfil actualizado correctamente",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    console.error("Error al actualizar perfil:", error);
    res.status(500).json({ message: "Error interno al actualizar perfil" });
  }
};

export const logoutUser = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({ message: "Logout exitoso" });
  } catch (error) {
    console.error("Error en logout:", error);
    res.status(500).json({ message: "Error interno al cerrar sesión" });
  }
};
