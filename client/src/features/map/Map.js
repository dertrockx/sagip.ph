import React from 'react';
import { inject, observer } from 'mobx-react';
import {
  GoogleMap,
  Marker,
  Circle
} from 'react-google-maps';
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel';

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
        <MarkerWithLabel
          key={marker.id}
          position={{ lat: marker.latitude, lng: marker.longitude }}
          icon={{ url: icon }}
          labelAnchor={new window.google.maps.Point(0, 0)}
          labelStyle={{backgroundColor: "yellow", fontSize: "32px", padding: "16px"}}
          zIndex={1}
        >
          <div>{marker.latitude} {marker.longitude}</div>
        </MarkerWithLabel>
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