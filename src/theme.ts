import { createTheme } from '@mui/material/styles';
import '@fontsource/ubuntu';

const theme = createTheme({
  typography: {
    fontFamily: ['Ubuntu'].join(','),
    allVariants: {
      color: '#1d1a39',
      fontFamily: 'Ubuntu, sans-serif',
    },
    h4: {
      fontSize: '32px',
      textTransform: 'uppercase',
      fontWeight: '700',
      letterSpacing: '-0.6px',
      lineHeight: '30px',
    },
    h5: {
      fontSize: '30px',
      fontWeight: 'bold',
    },
    h6: {
      fontSize: '28px',
      fontWeight: 'bold',
    },
    body1: {
      fontSize: '14px',
    },
    caption: {
      fontWeight: 200,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: '#00223B',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          letterSpacing: '1.2px',
          backgroundColor: '#ffe108',
          color: '#1d1a39',
          padding: '0px 24px',
          height: '40px',
          borderRadius: '20px',
          fontWeight: 700,
          '&:hover': {
            backgroundColor: '#ffe108',
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#A3AFB8',
          '&.Mui-checked': {
            color: '#A3AFB8',
          },
        },
      },
    },
  },
  palette: {
    common: {
      black: '#000',
      white: '#fff',
    },
    background: {
      paper: '#ECECEC',
      default: 'white',
    },
    primary: {
      main: '#00223B',
      light: '#80ACD4',
    },
    secondary: {
      main: '#ECECEC',
    },
  },
});

export default theme;
