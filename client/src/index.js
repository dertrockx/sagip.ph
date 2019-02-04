import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';

import * as serviceWorker from './serviceWorker';

import './assets/font/product-sans.css';
import './index.css';
import App from './app/App';
import theme, { themeVars } from './theme';

ReactDOM.render(
  <ThemeProvider theme={themeVars}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </ThemeProvider>
, document.getElementById('root'));

if (process.env.NODE_ENV === 'production') {
  serviceWorker.register();
} else {
  serviceWorker.unregister();
}
