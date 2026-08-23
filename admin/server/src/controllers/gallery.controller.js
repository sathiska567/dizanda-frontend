import { db } from '../data/store.js';
import { createId } from '../utils/id.js';
import { ApiError } from '../middleware/errorHandler.js';

export function getGallery(req, res) {
  const { gallery } = db.read();
  res.json(gallery);
}

export async function createCategory(req, res, next) {
  try {
    const { name } = req.body;
    if (!name) throw new ApiError(400, 'Category name is required');

    const created = await db.write((data) => {
      if (data.gallery.categories.some((c) => c.name.toLowerCase() === name.toLowerCase())) {
        throw new ApiError(409, 'A category with this name already exists');
      }
      const category = { id: createId(), name };
      data.gallery.categories.push(category);
      return category;
    });
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
}

export async function updateCategory(req, res, next) {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) throw new ApiError(400, 'Category name is required');

    const updated = await db.write((data) => {
      const category = data.gallery.categories.find((c) => c.id === id);
      if (!category) throw new ApiError(404, 'Category not found');
      const oldName = category.name;
      category.name = name;
      data.gallery.items.forEach((item) => {
        if (item.category === oldName) item.category = name;
      });
      return category;
    });
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function deleteCategory(req, res, next) {
  try {
    const { id } = req.params;
    await db.write((data) => {
      const category = data.gallery.categories.find((c) => c.id === id);
      if (!category) throw new ApiError(404, 'Category not found');
      if (data.gallery.items.some((item) => item.category === category.name)) {
        throw new ApiError(409, 'Move or delete items in this category before removing it');
      }
      data.gallery.categories = data.gallery.categories.filter((c) => c.id !== id);
    });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

export async function createItem(req, res, next) {
  try {
    const { title, category, image, description, availableFlavors } = req.body;
    if (!title || !category || !image) throw new ApiError(400, 'Title, category and image are required');

    const created = await db.write((data) => {
      const order = data.gallery.items.length + 1;
      const item = {
        id: createId(),
        title,
        category,
        image,
        description: description || '',
        availableFlavors: Array.isArray(availableFlavors) ? availableFlavors : [],
        order,
      };
      data.gallery.items.push(item);
      return item;
    });
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
}

export async function updateItem(req, res, next) {
  try {
    const { id } = req.params;
    const updated = await db.write((data) => {
      const item = data.gallery.items.find((i) => i.id === id);
      if (!item) throw new ApiError(404, 'Gallery item not found');
      Object.assign(item, req.body);
      return item;
    });
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function deleteItem(req, res, next) {
  try {
    const { id } = req.params;
    await db.write((data) => {
      const before = data.gallery.items.length;
      data.gallery.items = data.gallery.items.filter((i) => i.id !== id);
      if (data.gallery.items.length === before) throw new ApiError(404, 'Gallery item not found');
    });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}
