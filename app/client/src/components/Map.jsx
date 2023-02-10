import { MapContainer, TileLayer, Marker, Popup, useMap} from "react-leaflet";
import L from "leaflet";
import React from "react";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import axios from "../api/axios";

const TREES_URL = "/api/tree/all";

export default function Map() {
  const latitude = 50.6327565;
  const longitude = 5.5686243;

  function MapView() {
    let map = useMap();
    map.setView([latitude, longitude], map.getZoom());
     //Sets geographical center and zoom for the view of the map
    return null;
  }

  const { trees, setTrees } = useState("");

  useEffect(() => {

      const getTrees= async () => {
          try {
              const response = await axios.get(TREES_URL);
              console.log(response.data);
              setTrees(response.data); 
          } catch (err) {
              console.log(err);
          }
      }
      getTrees();

      return () => {}
  }, []);

  return (
    <div>
      {trees?.length
? (
      <ul>
          {trees.map((tree) => <li key={id}>{tree?.latitude + tree?.longitude}</li>)}
      </ul>
  ) : <p>No players to display</p>
}
    
    <MapContainer
      classsName="map"
      center={[latitude, longitude]}
      zoom={14}
      scrollWheelZoom={true}
      style = {{height: 80 + "vh", width: 100 +"vh"}}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> 
        contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* {trees?.length ?(  */}
      {/* // <Marker position={trees.map((trees) => {trees?.latitude + trees?.longitude})}>
      //   <Popup></Popup>
      // </Marker>): ("")}      */}
      {/* <MapView /> */}
    </MapContainer>
    </div>
  );
}
