import { existsSync, mkdirSync } from 'fs';
import { dirname, extname, join } from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import { createId } from '../utils/id.js';
import { ApiError } from './errorHandler.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
export const UPLOADS_DIR = join(__dirname, '..', '..', 'uploads');

if (!existsSync(UPLOADS_DIR)) {
  mkdirSync(UPLOADS_DIR, { recursive: true });
}

const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => cb(null, `${createId()}${extname(file.originalname).toLowerCase()}`),
});

export const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_TYPES.has(file.mimetype)) {
      cb(new ApiError(400, 'Only JPEG, PNG, WEBP, GIF or SVG images are allowed'));
      return;
    }
    cb(null, true);
  },
});
