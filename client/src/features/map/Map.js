import React from 'react';
import {
  GoogleMap,
  withGoogleMap,
  withScriptjs,
  Marker,
  Circle
} from 'react-google-maps';

import mapStyles from './mapStyles';
import controls from './controls';

const config = {
  styles: mapStyles,
  disableDefaultUI: true,
  ...controls
};

const Map = withScriptjs(
  withGoogleMap(({ location, radius }) => (
    <GoogleMap defaultZoom={15} defaultOptions={config} center={location}>
      <Marker position={location} />
      <Circle
        center={location}
        radius={radius}
        options={{
          strokeWeight: 0,
        }}
      />
    </GoogleMap>
  ))
);

const MapWrapper = ({ location, radius }) => (
  <Map
    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyC4i4QjxqmM1o9WEcwOgdeGpC3EzN6I9Sk&v=3.exp&libraries=geometry,drawing,places`}
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `100vh` }} />}
    mapElement={<div style={{ height: `100%` }} />}

    location={location}
    radius={radius}
  />
);

export default MapWrapper;
