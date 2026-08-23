import { apiClient } from './axiosClient';

export const homeApi = {
  get: () => apiClient.get('/home').then((r) => r.data),
  updateHero: (payload) => apiClient.put('/home/hero', payload).then((r) => r.data),
  createFeaturedProduct: (payload) => apiClient.post('/home/featured-products', payload).then((r) => r.data),
  updateFeaturedProduct: (id, payload) =>
    apiClient.put(`/home/featured-products/${id}`, payload).then((r) => r.data),
  deleteFeaturedProduct: (id) => apiClient.delete(`/home/featured-products/${id}`),
  reorderFeaturedProducts: (orderedIds) =>
    apiClient.put('/home/featured-products/reorder', { orderedIds }).then((r) => r.data),
};
