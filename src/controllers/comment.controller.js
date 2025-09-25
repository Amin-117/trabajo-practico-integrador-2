import { CommentModel } from "../models/comment.model.js";
import { ArticleModel } from "../models/article.model.js";

export const createComment = async (req, res) => {
  const { content, article } = req.body;
  try {
    const userId = req.user.id;

    const existingArticle = await ArticleModel.findById(article);
    if (!existingArticle) {
      return res.status(404).json({ message: "Artículo no encontrado" });
    }

    const newComment = new CommentModel({
      content,
      author: userId,
      article,
    });

    await newComment.save();

    res.status(201).json({
      message: "Comentario creado correctamente",
      comment: newComment,
    });
  } catch (error) {
    console.error("Error al crear comentario:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCommentsByArticle = async (req, res) => {
  const { articleId } = req.params;
  try {
    const comments = await CommentModel.findOne({
      article: articleId,
      deletedAt: null,
    })
      .populate("author", "username email")
      .populate("article", "title");

    res.status(200).json(comments);
  } catch (error) {
    console.error("Error al obtener comentarios:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMyComments = async (req, res) => {
  try {
    const userId = req.user._id; // viene del middleware de autenticación

    const comments = await CommentModel.find({
      author: userId,
      deletedAt: null,
    })
      .populate("author", "username email")
      .populate("article", "title");

    res.status(200).json(comments);
  } catch (error) {
    console.error("Error al obtener comentarios del usuario:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateComments = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  try {
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
  const { id } = req.params;
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
