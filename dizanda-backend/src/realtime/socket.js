import { Server } from 'socket.io';
import { env } from '../config/env.js';

let io = null;

export function initSocket(httpServer) {
  io = new Server(httpServer, {
    cors: {
      origin: env.corsOrigins,
      credentials: true,
    },
  });
  return io;
}

export function getIO() {
  return io;
}
