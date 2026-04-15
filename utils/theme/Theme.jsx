import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2260BC',
    },
    secondary: {
      main: '#36f1fb',
    },
    error: {
      main: '#ff4f00',
    },
    text: {
      primary: '#000000',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          height: '100%',
        },
        body: {
          height: '100%',
          margin: 0,
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          color: '#1A1A1A',
        },
        '#root': {
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          color: '#1A1A1A',
          background: '#04548f0a',
        },
      },
    },
  },
});

export default theme;
