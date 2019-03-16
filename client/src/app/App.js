import React, { Component } from 'react';

import { observer, inject } from 'mobx-react';

// import { FullscreenLoader } from '@components';
// import Login from 'features/login/Login';
import Map from 'features/map/Map';
import Dashboard from 'features/dashboard/Dashboard';

class App extends Component {
  render() {
    return (
      // <Login />
      <Dashboard>
        {/* <Map location={location} radius={radius} /> */}
      </Dashboard>
      // <FullscreenLoader/>
    );
  }
}

export default inject('store')(observer(App));
