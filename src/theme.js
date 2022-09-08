import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#8BC34A',
    },
    secondary: {
      main: '#607D8B',
    },
   test: {
      main: '#FF80AB',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;