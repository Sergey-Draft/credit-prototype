/* eslint-disable react/button-has-type */
import React from 'react';
import { Button, Divider } from '@mui/material';
import api from '../api/axiosConfig';
import {
  getUserInfo,
  getCurrentUser,
  getUserProfile,
  getProtectedData,
  getAdminData,
  getUserOrAdminData,
  getHealth,
} from '../api/buttons';

export default function ApiButtons() {
  const handleClick = (fn, label) => {
    fn()
      .then((res) => {
        if (res.data?.accessToken) {
          localStorage.setItem('accessToken', res.data.accessToken);
        }
        if (res.data?.refreshToken) {
          localStorage.setItem('refreshToken', res.data.refreshToken);
        }
      })
      .catch((err) => console.error(`${label} error:`, err));
  };

  const storageToken = localStorage.getItem('refreshToken');

  const stringToken = JSON.stringify(storageToken);

  const getRefreshToken = () => {
    const currentRefreshToken = localStorage.getItem('refreshToken');

    return api.post(`/auth/refresh?refresh_token=${currentRefreshToken}`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '300px' }}>
      <Button onClick={() => handleClick(getUserInfo, 'User Info')}> Get user info</Button>
      <Button onClick={() => handleClick(getCurrentUser, 'Current User')}>Get current user</Button>
      <Button onClick={() => handleClick(getUserProfile, 'User Profile')}>Get user profile</Button>
      <Button onClick={() => handleClick(getProtectedData, 'Protected Data')}>
        Get protected data
      </Button>
      <Button onClick={() => handleClick(getAdminData, 'Admin Data')}> Get admin Data</Button>
      <Button onClick={() => handleClick(getUserOrAdminData, 'User or Admin Data')}>
        Get user or admin data
      </Button>
      <Button onClick={() => handleClick(getHealth, 'System Health')}> Get system</Button>
      <Divider />
      <Button onClick={() => handleClick(getRefreshToken, 'newAccsessToken')}>
        {' '}
        Refresh Token, Get new accsess Token
      </Button>
    </div>
  );
}
