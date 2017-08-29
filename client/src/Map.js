import React from 'react';
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  Polyline
} from 'react-google-maps';
import withScriptjs from 'react-google-maps/lib/async/withScriptjs';

import styles from './maps_style';

// Downtown Station coordinates
export const downtownLatLng = {
  lat: 30.265002,
  lng: -97.739234
};

const compose = (fn, ...fns) => (d) => fns.reduce((acc, f) => f(acc), fn(d));

// latLng returns an array of the trains' current latitudes and longitudes
export const latLng = (trains) => {
  return trains.map(({latitude, longitude}) => {
    return { lat: latitude, lng: longitude };
  });
};

// addOriginPos returns a tuple of a train's position and the downtown station
export const addOriginPos = (trainPos) => {
  return trainPos.map((pos) => {
    return [downtownLatLng, pos];
  });
};

export const lineData = compose(latLng, addOriginPos);

const Map = withScriptjs(withGoogleMap((props) => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultOptions={{ styles }}
    defaultCenter={{ lat: 30.405672, lng: -97.704370 }}
    defaultZoom={11}
    onClick={props.onMapClick}
  >
    {props.markers.map((mark) => {
      return <Marker
        {...mark}
       />;
    })}
    {props.positions.map((data) => {
      return lineData(data.trains).map((coords) => {
        return <Polyline
          path={coords}
          key={coords[1].lat} // latitude of train
          options={{
            geodesic: true,
            strokeColor: `red`,
            strokeWeight: 1
          }}
        />;
      });
    })};
  </GoogleMap>
)));

export default Map;
