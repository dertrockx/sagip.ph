import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';

import { Provider } from 'mobx-react';
import { onSnapshot } from 'mobx-state-tree';
import store from './features';

import * as serviceWorker from './serviceWorker';

import './assets/font/product-sans.css';
import './index.css';
import App from './app/App';
import theme, { themeVars } from './theme';

onSnapshot(store, snapshot => {
  console.dir(snapshot);
});

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={themeVars}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </ThemeProvider>
  </Provider>
, document.getElementById('root'));

if (process.env.NODE_ENV === 'production') {
  serviceWorker.register();
} else {
  serviceWorker.unregister();
}
