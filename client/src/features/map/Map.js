import React from 'react';
import { GoogleMap, withGoogleMap, withScriptjs } from 'react-google-maps';

const Map = withScriptjs(withGoogleMap(({ location }) => (
  <GoogleMap
    defaultZoom={8}
    center={{
      lat: location.latitude,
      lng: location.longitude,
    }}>
  </GoogleMap>
)));

const MapWrapper = ({ location }) => (
  <Map
    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyC4i4QjxqmM1o9WEcwOgdeGpC3EzN6I9Sk&v=3.exp&libraries=geometry,drawing,places`}
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `100vh` }} />}
    mapElement={<div style={{ height: `100%` }} />}

    location={location}
  />
);

export default MapWrapper;
