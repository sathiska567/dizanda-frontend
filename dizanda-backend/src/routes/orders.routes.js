import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { createOrder, deleteOrder, listOrders, updateOrderStatus } from '../controllers/orders.controller.js';

const router = Router();

router.post('/', createOrder);
router.get('/', requireAuth, listOrders);
router.patch('/:id/status', requireAuth, updateOrderStatus);
router.delete('/:id', requireAuth, deleteOrder);

export default router;
