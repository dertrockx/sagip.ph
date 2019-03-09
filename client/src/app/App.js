import React, { Component } from 'react';

// import { FullscreenLoader } from '@components';
// import Login from 'features/login/Login';
import Map from 'features/map/Map';
import Dashboard from 'features/dashboard/Dashboard';

class App extends Component {
  state = {
    location: {
      lat: 0,
      lng: 0,
    },
    radius: 1000,
  };

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude: lat, longitude: lng } = coords;
        this.setState({ location: { lat, lng }});
      });
    }
  }

  render() {
    const {
      location,
      radius
    } = this.state;

    return (
      // <Login />
      <Dashboard>
        {/* <Map location={location} radius={radius} /> */}
      </Dashboard>
      // <FullscreenLoader/>
    );
  }
}

export default App;
