import { ArticleModel } from "../models/article.model.js";
import { CommentModel } from "../models/comment.model.js";

export const createArticle = async (req, res) => {
  const { tittle, content, excerpt, status, Author, tags } = req.body;

  try {
    const newArticle = await ArticleModel.create({
      tittle,
      content,
      excerpt,
      status,
      Author,
      tags,
    });

    res.status(201).json({
      message: "Artículo creado correctamente",
      newArticle,
    });
  } catch (error) {
    console.error("Error al crear artículo:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getArticles = async (req, res) => {
  try {
    const articles = await ArticleModel.find({ deletedAt: null })
      .populate("Author", "name email")
      .populate("tags", "name");

    res.status(200).json(articles);
  } catch (error) {
    console.error("Error al obtener artículos:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getArticleById = async (req, res) => {
  const { id } = req.params;

  try {
    const article = await ArticleModel.findOne({ _id: id, deletedAt: null })
      .populate("Author", "name email")
      .populate("tags", "name");

    if (!article) {
      return res
        .status(404)
        .json({ message: "Artículo no encontrado o eliminado" });
    }

    res.status(200).json(article);
  } catch (error) {
    console.error("Error al obtener artículo:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateArticle = async (req, res) => {
  const { id, tittle, content, excerpt, status, tags } = req.body;

  try {
    if (!id) {
      return res.status(400).json({ message: "El id es obligatorio" });
    }

    const updatedArticle = await ArticleModel.findOneAndUpdate(
      { _id: id, deletedAt: null },
      { tittle, content, excerpt, status, tags, updatedAt: new Date() },
      { new: true }
    );

    if (!updatedArticle) {
      return res
        .status(404)
        .json({ message: "Artículo no encontrado o eliminado" });
    }

    res.status(200).json(updatedArticle);
  } catch (error) {
    console.error("Error al actualizar artículo:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteArticle = async (req, res) => {
  const { id } = req.body;

  try {
    if (!id) {
      return res.status(400).json({ message: "El id es obligatorio" });
    }

    const deletedArticle = await ArticleModel.findOneAndUpdate(
      { _id: id, deletedAt: null },
      { deletedAt: new Date() },
      { new: true }
    );

    if (!deletedArticle) {
      return res
        .status(404)
        .json({ message: "Artículo no encontrado o ya eliminado" });
    }

    await CommentModel.updateMany(
      { article: id, deletedAt: null },
      { deletedAt: new Date() }
    );

    res.status(200).json({
      message: "Artículo y sus comentarios eliminados correctamente",
    });
  } catch (error) {
    console.error("Error al eliminar artículo:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMyArticles = async (req, res) => {
  try {
    // gracias al middleware de auth ya tenés req.user con el id del usuario
    const userId = req.user.id;

    const articles = await ArticleModel.find({ author: userId }).populate(
      "tags"
    );

    if (!articles.length) {
      return res.status(404).json({ msg: "No tienes artículos creados" });
    }

    return res.json(articles);
  } catch (error) {
    console.error("Error al obtener mis artículos:", error);
    return res.status(500).json({ msg: "Error del servidor" });
  }
};
