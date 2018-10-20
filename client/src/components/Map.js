import React from 'react';
import {withGoogleMap, GoogleMap, Marker} from 'react-google-maps';
import withScriptjs from 'react-google-maps/lib/async/withScriptjs';
import s from './Map.css';

const position = {
  lat: 32.1089199,
  lng: 34.8028505,
};

const MapWithLoader = withScriptjs(
  withGoogleMap(() => {
    const markerEl = <Marker position={position} defaultAnimation={2} />;

    return (
      <GoogleMap defaultZoom={17} defaultCenter={position}>
        {markerEl}
      </GoogleMap>
    );
  }),
);

const Map = () => (
  <div id="map" className={s.mapContainer}>
    <div className={s.mapEl} />
  </div>
);

export default Map;
