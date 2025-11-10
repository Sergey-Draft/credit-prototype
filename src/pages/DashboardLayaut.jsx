import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar2342';

export default function DashboardLayout() {
  return (
    <Box className="app-layout">
      <Box className="main-content">
        <Outlet />
      </Box>
      <Sidebar />
    </Box>
  );
}
