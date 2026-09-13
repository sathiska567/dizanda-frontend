import { db } from '../data/store.js';
import { createId } from '../utils/id.js';
import { ApiError } from '../middleware/errorHandler.js';

export function getHome(req, res) {
  const { home } = db.read();
  res.json(home);
}

export async function updateHero(req, res, next) {
  try {
    const updated = await db.write((data) => {
      data.home.hero = { ...data.home.hero, ...req.body };
      return data.home.hero;
    });
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function createFeaturedProduct(req, res, next) {
  try {
    const { name, flavor, image } = req.body;
    if (!name || !image) throw new ApiError(400, 'Name and image are required');

    const created = await db.write((data) => {
      const order = data.home.featuredProducts.length + 1;
      const product = { id: createId(), name, flavor: flavor || '', image, order };
      data.home.featuredProducts.push(product);
      return product;
    });
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
}

export async function updateFeaturedProduct(req, res, next) {
  try {
    const { id } = req.params;
    const updated = await db.write((data) => {
      const product = data.home.featuredProducts.find((p) => p.id === id);
      if (!product) throw new ApiError(404, 'Featured product not found');
      Object.assign(product, req.body);
      return product;
    });
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function deleteFeaturedProduct(req, res, next) {
  try {
    const { id } = req.params;
    await db.write((data) => {
      const before = data.home.featuredProducts.length;
      data.home.featuredProducts = data.home.featuredProducts.filter((p) => p.id !== id);
      if (data.home.featuredProducts.length === before) {
        throw new ApiError(404, 'Featured product not found');
      }
    });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

export async function reorderFeaturedProducts(req, res, next) {
  try {
    const { orderedIds } = req.body;
    if (!Array.isArray(orderedIds)) throw new ApiError(400, 'orderedIds must be an array');

    const updated = await db.write((data) => {
      orderedIds.forEach((id, index) => {
        const product = data.home.featuredProducts.find((p) => p.id === id);
        if (product) product.order = index + 1;
      });
      data.home.featuredProducts.sort((a, b) => a.order - b.order);
      return data.home.featuredProducts;
    });
    res.json(updated);
  } catch (err) {
    next(err);
  }
}
