import React from 'react';
import { withGoogleMap, withScriptjs } from 'react-google-maps';
import { compose, withProps } from 'recompose';

import Map from './Map';

const MapWrapper = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC4i4QjxqmM1o9WEcwOgdeGpC3EzN6I9Sk&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100vh` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(Map);

export default MapWrapper;
