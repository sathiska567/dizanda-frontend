import { apiClient } from './axiosClient';

export const ordersApi = {
  list: () => apiClient.get('/orders').then((r) => r.data),
  updateStatus: (id, status) => apiClient.patch(`/orders/${id}/status`, { status }).then((r) => r.data),
  remove: (id) => apiClient.delete(`/orders/${id}`),
};
