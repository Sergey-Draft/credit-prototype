/* eslint-disable react/prop-types */
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRoute({ children }) {
  const token = useSelector((state) => state.auth.token) || localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
