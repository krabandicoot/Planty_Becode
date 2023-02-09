import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import React from "react";
import "leaflet/dist/leaflet.css";

export default function Map({ coords, display_name }) {
  const latitude = 50.632757;
  const longitude = 5.579666;

  function MapView() {
    let map = useMap();
    map.setView([latitude, longitude], map.getZoom());
     //Sets geographical center and zoom for the view of the map
    return null;
  }

  return (
    <MapContainer
      classsName="map"
      center={[latitude, longitude]}
      zoom={10}
      scrollWheelZoom={true}
      style = {{height: 80 + "vh", width: 100 +"vh"}}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> 
        contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[latitude, longitude]}>
        <Popup>{display_name}</Popup>
      </Marker>
      <MapView />
    </MapContainer>
  );
}