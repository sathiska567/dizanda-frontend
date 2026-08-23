import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import {
  createFeaturedProduct,
  deleteFeaturedProduct,
  getHome,
  reorderFeaturedProducts,
  updateFeaturedProduct,
  updateHero,
} from '../controllers/home.controller.js';

const router = Router();

router.get('/', getHome);
router.put('/hero', requireAuth, updateHero);
router.post('/featured-products', requireAuth, createFeaturedProduct);
router.put('/featured-products/reorder', requireAuth, reorderFeaturedProducts);
router.put('/featured-products/:id', requireAuth, updateFeaturedProduct);
router.delete('/featured-products/:id', requireAuth, deleteFeaturedProduct);

export default router;
