import { env } from '../config/env.js';
import { ApiError } from '../middleware/errorHandler.js';

export function uploadImage(req, res, next) {
  try {
    if (!req.file) throw new ApiError(400, 'No image file received');
    const url = `${env.publicUrl}/uploads/${req.file.filename}`;
    res.status(201).json({ url });
  } catch (err) {
    next(err);
  }
}
