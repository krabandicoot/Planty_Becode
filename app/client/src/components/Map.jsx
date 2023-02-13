import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import React from "react";
import { useState, useEffect } from "react";
import axios from "../api/axios";
import "leaflet/dist/leaflet.css";
//import icon from "../Images/icon.png";
//import L from "leaflet";

const TREES_URL = "/api/tree/all";

export default function Map() {
  const latitude = 50.6327565;
  const longitude = 5.5686243;

  // const customIcon = new L.Icon({//creating a custom icon to use in Marker
  //   iconUrl: icon,
  //   iconSize: [25, 35],
  //   iconAnchor: [5, 30]
  // });

  function MapView() {
    let map = useMap();
    map.setView([latitude, longitude], map.getZoom());
     //Sets geographical center and zoom for the view of the map
    return null;
  }

  const [trees, setTrees] = useState("");

  useEffect(() => {

      const getTrees= async () => {
          try {
              const response = await axios.get(TREES_URL);
              //console.log(response.data);
              setTrees(response.data); 
          } catch (err) {
              console.log(err);
          }
      }
      getTrees();

      return () => {}
  }, []);

  return (
    <MapContainer
      classsName="map"
      center={[latitude, longitude]}
      zoom={14}
      scrollWheelZoom={true}
      style = {{height: 80 + "vh"}}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> 
        contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[latitude, longitude]}>
        <Popup></Popup>
      </Marker>
      <MapView />
    </MapContainer>
  );
}