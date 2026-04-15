import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import App from './App';
import theme from '../utils/theme/Theme';
import store from '../RTK/index';

const root = createRoot(document.getElementById('root'));

root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
);
