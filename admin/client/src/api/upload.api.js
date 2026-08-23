import { apiClient } from './axiosClient';

export const uploadApi = {
  uploadImage: (file, onProgress) => {
    const formData = new FormData();
    formData.append('image', file);
    return apiClient
      .post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (evt) => {
          if (onProgress && evt.total) onProgress(Math.round((evt.loaded / evt.total) * 100));
        },
      })
      .then((r) => r.data.url);
  },
};
