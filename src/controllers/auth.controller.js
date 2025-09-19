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
    const userLog = await UserModel.findOne({ email });

    if (!userLog) {
      return res.status(404).json("Usuario no encontrado");
    }

    const contraseñaCorrecta = await comparePassword(password, user.password);
    if (!contraseñaCorrecta) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = generateToken({ id: userLog._id, role: userLog.role });

    res.status(201).json({ message: "Logueado Correctamente" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
