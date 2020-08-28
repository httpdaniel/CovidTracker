import React from "react";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import "./styles/Map.scss";
import { showDataOnMap } from "./util";

const bounds = [
  [
    [-90, -180],
    [90, 240],
  ],
];

function Map({ countries, casesType, center, zoom, minZoom, maxZoom }) {
  return (
    <div className="map">
      <LeafletMap
        center={center}
        zoom={zoom}
        minZoom={minZoom}
        maxZoom={maxZoom}
        maxBounds={bounds}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {showDataOnMap(countries, casesType)}
      </LeafletMap>
    </div>
  );
}

export default Map;
