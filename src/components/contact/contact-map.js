import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

import "leaflet/dist/leaflet.css";

const Map = () => {
  
  return (
    createContext(
    <div>
    <MapContainer center={[latitude, longitude]} zoom={13} style={{ height: '500px' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    </MapContainer>


    </div>
    )
  );
};

export default Map;