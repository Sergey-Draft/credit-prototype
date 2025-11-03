import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import App from './App';
import theme from '../utils/theme/Theme';
import store from '../RTK/index';

async function initializeMocks() {
  if (import.meta.env.MODE === 'development') {
    const { worker } = await import('./mocks/browser');
    await worker.start({
      serviceWorker: {
        url: '/mockServiceWorker.js',
      },
    });
  }
}

initializeMocks();

// if (import.meta.env.MODE === 'development') {
//   const { worker } = await import('./mocks/browser');
//   await worker.start({
//     serviceWorker: {
//       url: '/mockServiceWorker.js',
//     },
//   });
// }

createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
);
