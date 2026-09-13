import { apiClient } from './axiosClient';

export const aboutApi = {
  get: () => apiClient.get('/about').then((r) => r.data),
  updateIntro: (payload) => apiClient.put('/about/intro', payload).then((r) => r.data),
  updatePhilosophy: (payload) => apiClient.put('/about/philosophy', payload).then((r) => r.data),
  createTeamMember: (payload) => apiClient.post('/about/team', payload).then((r) => r.data),
  updateTeamMember: (id, payload) => apiClient.put(`/about/team/${id}`, payload).then((r) => r.data),
  deleteTeamMember: (id) => apiClient.delete(`/about/team/${id}`),
};
