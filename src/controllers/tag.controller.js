import { TagModel } from "../models/tag.model.js";
import { ArticleModel } from "../models/article.model.js";

export const createTag = async (req, res) => {
  const { name, description } = req.body;

  try {
    const newTag = await TagModel.create({
      name,
      description,
    });

    res.status(201).json({
      message: "Tag creado correctamente",
      newTag,
    });
  } catch (error) {
    console.error("Error al crear tag:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTags = async (req, res) => {
  try {
    const tags = await TagModel.find({ deletedAt: null });
    res.status(200).json(tags);
  } catch (error) {
    console.error("Error al obtener tags:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTagById = async (req, res) => {
  const { id } = req.params;

  try {
    const tag = await TagModel.findOne({ _id: id, deletedAt: null });

    if (!tag) {
      return res.status(404).json({ message: "Tag no encontrado o eliminado" });
    }

    res.status(200).json(tag);
  } catch (error) {
    console.error("Error al obtener tag:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateTag = async (req, res) => {
  const { id, name, description } = req.body;

  try {
    if (!id) {
      return res.status(400).json({ message: "El id es obligatorio" });
    }

    const updatedTag = await TagModel.findOneAndUpdate(
      { _id: id, deletedAt: null },
      { name, description, updatedAt: new Date() },
      { new: true }
    );

    if (!updatedTag) {
      return res.status(404).json({ message: "Tag no encontrado o eliminado" });
    }

    res.status(200).json(updatedTag);
  } catch (error) {
    console.error("Error al actualizar tag:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteTag = async (req, res) => {
  const { id } = req.body;

  try {
    if (!id) {
      return res.status(400).json({ message: "El id es obligatorio" });
    }

    const deletedTag = await TagModel.findOneAndUpdate(
      { _id: id, deletedAt: null },
      { deletedAt: new Date() },
      { new: true }
    );

    if (!deletedTag) {
      return res
        .status(404)
        .json({ message: "Tag no encontrado o ya eliminado" });
    }

    await ArticleModel.updateMany({ tags: id }, { $pull: { tags: id } });

    res
      .status(200)
      .json({ message: "Tag eliminado y removido de artículos correctamente" });
  } catch (error) {
    console.error("Error al eliminar tag:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
