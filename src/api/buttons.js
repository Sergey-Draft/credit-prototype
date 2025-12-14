import api from './axiosConfig';

//  AUTH
export const getUserInfo = () => api.get('/auth/userinfo');

//  USER MANAGEMENT
export const getCurrentUser = () => api.get('/users/me');
export const getUserProfile = () => api.get('/users/profile');

// PROTECTED RESOURCES
export const getProtectedData = () => api.get('/protected/data');
export const getAdminData = () => api.get('/protected/admin');
export const getUserOrAdminData = () => api.get('/protected/user-or-admin');

//  SYSTEM
export const getHealth = () => api.get('/health');


