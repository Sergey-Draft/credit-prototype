/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess } from '../../RTK/userSlice';

export default function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken && !token) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          dispatch(loginSuccess({ token: storedToken, user: userData }));
        } catch (e) {
          // Если не удалось восстановить, очищаем localStorage
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
    }
  }, [token, dispatch]);

  const hasToken = token || localStorage.getItem('token');

  if (!hasToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
