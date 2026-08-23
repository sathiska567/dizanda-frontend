import { db } from '../data/store.js';
import { createId } from '../utils/id.js';
import { ApiError } from '../middleware/errorHandler.js';

const SOURCES = ['cart', 'custom'];
export const ORDER_STATUSES = ['new', 'contacted', 'confirmed', 'completed', 'cancelled'];

export async function createOrder(req, res, next) {
  try {
    const { source, name, email, phone, message, items, customDetails } = req.body;

    if (!SOURCES.includes(source)) throw new ApiError(400, 'Invalid order source');
    if (!name || !email) throw new ApiError(400, 'Name and email are required');
    if (source === 'cart' && (!Array.isArray(items) || items.length === 0)) {
      throw new ApiError(400, 'At least one item is required for a quote request');
    }

    const now = new Date().toISOString();
    const order = await db.write((data) => {
      const record = {
        id: createId(),
        source,
        status: 'new',
        customer: { name, email, phone: phone || '' },
        message: message || '',
        items: source === 'cart' ? items : [],
        customDetails: source === 'custom' ? customDetails || null : null,
        createdAt: now,
        updatedAt: now,
      };
      data.orders.push(record);
      return record;
    });

    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
}

export function listOrders(req, res) {
  const { orders } = db.read();
  const sorted = [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json(sorted);
}

export async function updateOrderStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!ORDER_STATUSES.includes(status)) throw new ApiError(400, 'Invalid order status');

    const updated = await db.write((data) => {
      const order = data.orders.find((o) => o.id === id);
      if (!order) throw new ApiError(404, 'Order not found');
      order.status = status;
      order.updatedAt = new Date().toISOString();
      return order;
    });
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function deleteOrder(req, res, next) {
  try {
    const { id } = req.params;
    await db.write((data) => {
      const before = data.orders.length;
      data.orders = data.orders.filter((o) => o.id !== id);
      if (data.orders.length === before) throw new ApiError(404, 'Order not found');
    });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}
