import { apiClient } from './axiosClient';

export const galleryApi = {
  get: () => apiClient.get('/gallery').then((r) => r.data),
  createCategory: (name) => apiClient.post('/gallery/categories', { name }).then((r) => r.data),
  updateCategory: (id, name) => apiClient.put(`/gallery/categories/${id}`, { name }).then((r) => r.data),
  deleteCategory: (id) => apiClient.delete(`/gallery/categories/${id}`),
  createItem: (payload) => apiClient.post('/gallery/items', payload).then((r) => r.data),
  updateItem: (id, payload) => apiClient.put(`/gallery/items/${id}`, payload).then((r) => r.data),
  deleteItem: (id) => apiClient.delete(`/gallery/items/${id}`),
};
