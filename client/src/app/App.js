import React, { Component } from 'react';

import { Typography } from '@components/material-ui';

class App extends Component {
  render() {
    return (
      <Typography component="h2" variant="h3" gutterBottom>
        Google this is me.
      </Typography>
    );
  }
}

export default App;
