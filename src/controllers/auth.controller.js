import { UserModel } from "../models/user.model.js";
import { hashPassword } from "../helpers/bcrypt.helper.js";

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
