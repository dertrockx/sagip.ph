import React from 'react';
import { inject, observer } from 'mobx-react';
import {
  GoogleMap,
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

const icon = 'http://mt.google.com/vt/icon?psize=27&font=fonts/Roboto-Bold.ttf&color=ff135C13&name=icons/spotlight/spotlight-waypoint-a.png&ax=44&ay=50&text=%E2%80%A2';

const Map = ({ location, radius, store }) => {
  const { distress } = store.map;
  
  return (
    <GoogleMap defaultZoom={15} defaultOptions={config} center={location}>
      <Marker position={location} />
      {distress.length && distress.map(marker => (
        <Marker
          key={marker.id}
          position={{ lat: marker.latitude, lng: marker.longitude }}
          icon={{ url: icon }}
          zIndex={1}
        />
      ))}
      <Circle
        center={location}
        radius={radius}
        options={{
          strokeWeight: 0,
        }}
      />
    </GoogleMap>
  );
};

export default inject('store')(observer(Map));