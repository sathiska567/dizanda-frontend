import 'dotenv/config';

export const env = {
  port: Number(process.env.PORT) || 5000,
  corsOrigins: (process.env.CORS_ORIGIN || 'http://localhost:5173,http://localhost:5174')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
  jwtSecret: process.env.JWT_SECRET || 'dev-only-secret-change-me',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '12h',
  adminName: process.env.ADMIN_NAME || 'Dizanda Admin',
  adminEmail: process.env.ADMIN_EMAIL || 'admin@dizanda.com',
  adminPassword: process.env.ADMIN_PASSWORD || 'ChangeMe123!',
  publicUrl: process.env.PUBLIC_URL || `http://localhost:${Number(process.env.PORT) || 5000}`,
};
