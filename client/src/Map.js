import React from 'react';
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  Polyline
} from 'react-google-maps';
import withScriptjs from 'react-google-maps/lib/async/withScriptjs';

import styles from './maps_style';

/*
const lineData = (data) => data
  .trains
  .map(({latitude, longitude}) => ({ lat: latitude, lng: longitude }));
*/

const Map = withScriptjs(withGoogleMap((props) => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultOptions={{ styles }}
    defaultCenter={{ lat: 30.405672, lng: -97.704370 }}
    defaultZoom={11}
    onClick={props.onMapClick}
  >
    <Polyline
      path={props.markers.map(m => m.position)}
      options={{
        geodesic: true,
        strokeColor: `red`,
        strokeOpacity: 1,
        strokeWeight: 2
      }}
  />
  </GoogleMap>
)));

export default Map;
