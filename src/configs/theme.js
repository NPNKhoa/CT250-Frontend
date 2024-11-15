import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#EA580C',
      dark: '#AC3A00',
      light: '#FFEBE8',
    },
    secondary: {
      main: '#4CAF50',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#EA580C',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#AC3A00',
          },
        },
        contained: {
          backgroundColor: '#EA580C',
          '&:hover': {
            backgroundColor: '#AC3A00',
          },
        },
        outlined: {
          borderColor: '#EA580C',
          color: '#EA580C',
          backgroundColor: '#FFEBE8',
          '&:hover': {
            color: '#FFFFFF',
            borderColor: '#AC3A00',
            backgroundColor: '#EA580C',
          },
        },
        text: {
          color: '#EA580C',
          backgroundColor: '#E2E8F0',
          '&:hover': {
            color: '#FFFFFF',
            backgroundColor: '#EA580C',
          },
        },
      },
    },
  },
});

export default theme;
