import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import {
  createCategory,
  createItem,
  deleteCategory,
  deleteItem,
  getGallery,
  updateCategory,
  updateItem,
} from '../controllers/gallery.controller.js';

const router = Router();

router.get('/', getGallery);
router.post('/categories', requireAuth, createCategory);
router.put('/categories/:id', requireAuth, updateCategory);
router.delete('/categories/:id', requireAuth, deleteCategory);
router.post('/items', requireAuth, createItem);
router.put('/items/:id', requireAuth, updateItem);
router.delete('/items/:id', requireAuth, deleteItem);

export default router;
