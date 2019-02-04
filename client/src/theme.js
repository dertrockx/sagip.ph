import { createMuiTheme } from '@material-ui/core/styles';

import blue from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: `
      'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif
    `,
  },
  palette: {
    main: '#01579b'
  },
  secondary: blue
});

export default theme;
