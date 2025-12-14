import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function DashboardLayout() {
  return (
    <Box className="app-layout">
      {/* <Sidebar /> */}
      <Box className="main-wrapper">
        <Header />
        <Box className="app-container">
          <Box className="main-content">
            <Outlet />
          </Box>
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}
