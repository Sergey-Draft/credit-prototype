import api from './axiosConfig';

export default {
  register: (data) => api.post('/register', data),
  auth: (data) => api.post('/auth', data),
};
