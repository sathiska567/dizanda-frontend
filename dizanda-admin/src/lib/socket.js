import { io } from 'socket.io-client';

const apiUrl = import.meta.env.VITE_ADMIN_API_URL || 'http://localhost:5000/api';
const socketUrl = apiUrl.replace(/\/api\/?$/, '');

export const socket = io(socketUrl, {
  autoConnect: true,
  withCredentials: true,
});
