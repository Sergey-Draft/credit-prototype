import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#007eff',
    },
    secondary: {
      main: '#36f1fb',
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
        },
        '#root': {
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'radial-gradient(rgb(240, 247, 255), rgb(255, 255, 255))',
        },
      },
    },
  },
});

export default theme;
