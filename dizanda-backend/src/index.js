import http from 'http';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { env } from './config/env.js';
import { seedAdminIfNeeded } from './data/store.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { UPLOADS_DIR } from './middleware/upload.js';
import { initSocket } from './realtime/socket.js';
import authRoutes from './routes/auth.routes.js';
import homeRoutes from './routes/home.routes.js';
import aboutRoutes from './routes/about.routes.js';
import galleryRoutes from './routes/gallery.routes.js';
import ordersRoutes from './routes/orders.routes.js';

const app = express();
const httpServer = http.createServer(app);
initSocket(httpServer);

app.use(
  cors({
    origin: env.corsOrigins,
    credentials: true,
  }),
);
app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));
app.use('/uploads', express.static(UPLOADS_DIR));

app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'dizanda-admin-server' }));
app.use('/api/auth', authRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/orders', ordersRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

seedAdminIfNeeded()
  .then(() => {
    httpServer.listen(env.port, () => {
      // eslint-disable-next-line no-console
      console.log(`Dizanda admin API listening on http://localhost:${env.port}`);
    });
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error('Failed to start admin server:', err);
    process.exit(1);
  });
