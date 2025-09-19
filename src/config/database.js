import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    // await mongoose.connection.dropDatabase();
    console.log("Conectado a la base de datos");
  } catch (error) {
    console.log("No se pudo conectar a la base de datos", error);
  }
};
