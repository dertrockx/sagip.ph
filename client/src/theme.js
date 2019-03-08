import { createMuiTheme } from '@material-ui/core/styles';

import blue from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: `
      'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif
    `
  },
  palette: {
    primary: {
      main: '#001d25',
    },
    secondary: blue
  }
});

export const themeVars = {
  primary: '#001d25',

  gray: '#333333',
};

export default theme;
