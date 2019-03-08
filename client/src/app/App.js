import React, { Component } from 'react';

// import { FullscreenLoader } from '@components';
// import Login from 'features/login/Login';
// import Map from 'features/map/Map';
import Dashboard from 'features/dashboard/Dashboard';

class App extends Component {
  state = {
    location: {
      latitude: 0,
      longitude: 0,
    },
  };

  // componentDidMount() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(({ coords }) => {
  //       const { latitude, longitude } = coords;
  //       this.setState({ location: { latitude, longitude }});
  //     });
  //   }
  // }

  render() {
    const {
      location
    } = this.state;

    return (
      // <Login />
      <Dashboard>
        Hello!
      </Dashboard>
      // <Map location={location} />
      // <FullscreenLoader/>
    );
  }
}

export default App;
