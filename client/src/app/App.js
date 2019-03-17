import React, { Component } from 'react';

import { observer, inject } from 'mobx-react';

// import { FullscreenLoader } from '@components';
// import Login from 'features/login/Login';
import Map from 'features/map/MapWrapper';
import Dashboard from 'features/dashboard/Dashboard';

class App extends Component {
  render() {
    const { dashboard, map } = this.props.store;

    const { location, radius } = dashboard;
    const { distress } = map;

    return (
      // <Login />
      <Dashboard>
        <Map location={location} radius={radius} distress={distress} />
      </Dashboard>
      // <FullscreenLoader/>
    );
  }
}

export default inject('store')(observer(App));
