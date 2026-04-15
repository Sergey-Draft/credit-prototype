/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess, saveUser } from '../../RTK/userSlice';

export default function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const location = useLocation();

  const token = useSelector((state) => state.user.accessToken);

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    const storedUserRaw = localStorage.getItem('user');

    if (storedToken && !token) {
      let userData = null;
      if (storedUserRaw) {
        try {
          userData = JSON.parse(storedUserRaw);
        } catch (e) {
          console.warn('Невалидный user ', e);
          localStorage.removeItem('user');
          userData = null;
        }
      }
      dispatch(loginSuccess({ accessToken: storedToken }));
      if (userData) {
        dispatch(saveUser(userData));
      }
    }
  }, [token, dispatch]);

  const hasToken = Boolean(token || localStorage.getItem('accessToken'));

  if (!hasToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
