import React from 'react';
import { inject, observer } from 'mobx-react';
import {
  GoogleMap,
  Marker,
  Circle
} from 'react-google-maps';
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel';

import { toJS } from 'mobx';

import mapStyles from './mapStyles';
import controls from './controls';

const config = {
  styles: mapStyles,
  disableDefaultUI: true,
  ...controls
};

const icon = 'http://mt.google.com/vt/icon?psize=27&font=fonts/Roboto-Bold.ttf&color=ff135C13&name=icons/spotlight/spotlight-waypoint-a.png&ax=44&ay=50&text=%E2%80%A2';

const Map = ({ location, radius, store }) => {
  const distress = toJS(store.map.distress);
  
  return (
    <GoogleMap defaultZoom={12} defaultOptions={config} center={location}>
      <Marker position={location} icon={{ url: icon }} />
      {distress.map(marker => (
        <MarkerWithLabel
          key={marker.id}
          onClick={() => {
            store.dashboard.changeActiveDistress(marker);
            store.dashboard.toggleDistressModal();
            store.map.getComments(marker.id);
          }}
          position={{ lat: marker.latitude, lng: marker.longitude }}
          labelAnchor={new window.google.maps.Point(0, 0)}
          labelStyle={{
            backgroundColor: 'white',
            color: 'black',
            borderRadius: '25px',
            fontSize: '14px',
            padding: '4px 16px'
          }}
          zIndex={1}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span
              style={{
                fontWeight: 'bold',
                display: 'inline-block',
                paddingRight: 8,
              }}
            >
              {marker.nature.toUpperCase()}
            </span>
            {marker.user.name}
            <span
              style={{
                backgroundColor: '#4f4f4f',
                color: 'white',
                borderRadius: 20,
                display: 'inline-flex',
                marginLeft: 8,
                alignItems: 'center',
                justifyContent: 'center',
                width: 16, height: 16,
                fontSize: 12,
              }}
            >
              {marker.comments}
            </span>
          </div>
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