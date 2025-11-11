import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar2342';
import Header from '../components/Header';

export default function DashboardLayout() {
  return (
    <Box className="app-layout">
      <Sidebar />
      <Box className="main-wrapper">
        <Header />
        <Box className="main-content">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
