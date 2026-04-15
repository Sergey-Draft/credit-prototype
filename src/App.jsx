import React from 'react';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';
import LoansPage from './pages/LoansPage';
import ProfilePage from './pages/ProfilePage';
import HistoryPage from './pages/RequestHistory';
import DashboardPage from './pages/DashboardPage';
import DashboardLayout from './pages/DashboardLayaut';
import CalculatorPage from './pages/CalculatorPage';
import ApiButtons from './components/ApiButtons';
import SupportPage from './pages/SupportPage';
import DocumentsPage from './components/DocumentsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="loans" element={<LoansPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="calculator" element={<CalculatorPage />} />
          <Route path="api-buttons" element={<ApiButtons />} />
          <Route path="support" element={<SupportPage />} />
          <Route path="docs" element={<DocumentsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
