import React, { Component } from 'react';

import { observer, inject } from 'mobx-react';

import { FullscreenLoader } from '@components';
import Login from 'features/login/Login';
import Map from 'features/map/MapWrapper';
import Dashboard from 'features/dashboard/Dashboard';

class App extends Component {
  componentDidMount() {
    this.props.store.auth.getSession();
  }

  render() {
    const { dashboard, map, auth } = this.props.store;

    const { location, radius } = dashboard;
    const { distress, status } = map;
    const { user } = auth;

    return (
      auth.status.session === 'PENDING'
      ? <FullscreenLoader/>
      : (
        !user
        ? <Login />
        : (
          <Dashboard>
            {status.distress === 'PENDING'
              ? <p>Loading...</p>
              : <Map location={location} radius={radius} distress={distress} />
            }
          </Dashboard>
        )
      )
    );
  }
}

export default inject('store')(observer(App));
