import { CommentModel } from "../models/comment.model.js";

export const createComment = async (req, res) => {
  const { content, author, article } = req.body;

  try {
    const newComment = await UserModel.create({
      content,
      author,
      article,
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "Comentario creado correctamente", newComment });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getComments = async (req, res) => {
  try {
    const comments = await CommentModel.find({ deletedAt: null })
      .populate("author", "username email")
      .populate("article", "title");

    res.status(200).json(comments);
  } catch (error) {
    console.error("Error al obtener comentarios:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCommentsById = async (req, res) => {
  try {
    const comments = await CommentModel.findById({ deletedAt: null })
      .populate("author", "username email")
      .populate("article", "title");

    res.status(200).json(comments);
  } catch (error) {
    console.error("Error al obtener comentarios:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateComments = async (req, res) => {
  const { id, content } = req.body;
  try {
    if (!id) {
      return res.status(400).json({ message: "El id es obligatorio" });
    }

    const updatedComment = await CommentModel.findOneAndUpdate(
      { _id: id, deletedAt: null },
      { content, updatedAt: new Date() },
      { new: true }
    );

    if (!updatedComment) {
      return res
        .status(404)
        .json({ message: "Comentario no encontrado o eliminado" });
    }

    res.status(200).json(updatedComment);
  } catch (error) {
    console.error("Error al actualizar comentario:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteComment = async (req, res) => {
  const { id } = req.body;
  try {
    if (!id) {
      return res.status(400).json({ message: "El id es obligatorio" });
    }

    const deletedComment = await CommentModel.findOneAndUpdate(
      { _id: id, deletedAt: null },
      { deletedAt: new Date() },
      { new: true }
    );

    if (!deletedComment) {
      return res
        .status(404)
        .json({ message: "Comentario no encontrado o ya eliminado" });
    }

    res.status(200).json({ message: "Comentario eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar comentario:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
