import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "../api/axios";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import useAuth from "../hooks/useAuth"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

import { AiOutlineInfoCircle, AiFillLock } from "react-icons/ai";

// Informations all trees **
const TREES_URL = "/api/tree/all";
// Informations one tree **
const SINGLE_TREE_URL = "api/tree/"; // + insert tree name
// Buy a tree ** 
const BUY_TREE_URL = "/api/tree/buy/" // + insert-tree-name
// Get price of a tree ** 
const PRICE_TREE_URL = "/api/tree/price/"  // + insert-tree-name

export default function Map() {
  const latitude = 50.6327565;
  const longitude = 5.5686243;

  const { player } = useAuth();

  const iconTree = new L.Icon({
    iconUrl: ("http://localhost:5173/src/images/icon-tree.png"),
    iconSize: [20, 30],
    iconAnchor: [5, 30]
  });

  function MapView() {
    let map = useMap();
    map.setView([latitude, longitude], map.getZoom());
    //Sets geographical center and zoom for the view of the map  
    return null;
  }

  const navigate = useNavigate();
  const [trees, setTrees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [priceTree, setPriceTree] = useState();
  const [treename, setTreeName] = useState("");

  const username = player.username;

  console.log(username)
  console.log(treename);


  const getTrees = async () => {
    try {
      const response = await axios.get(TREES_URL);
      //console.log(response.data[10].lat);
      setTrees(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const handleBuy = async () => {
      try {
        const configuration = {
          method: 'post',
          url: BUY_TREE_URL + treename.replace(/\s+/g, '-'),
          data: {
            username,
            treename
          },
          withCredentials: true,
        }

        const response = await axios(configuration);
        console.log(response.data);
        window.location.reload(false);

      } catch (err) {
        console.log(err);
      }
    }
    handleBuy();
  }, [treename])


  useEffect(() => {
    getTrees()
    //console.log(trees)
    setIsLoading(false)
  }, []);

  return (
    <MapContainer
      className="map"
      id="map"
      center={[latitude, longitude]}
      zoom={15}
      scrollWheelZoom={true}
      preferCanvas
      style={{ height: 78 + "vh" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> 
        contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup>
        {trees.map((tree, index) => {
          return (
            <Marker position={{ lat: tree.lat, lon: tree.lon }} key={index} icon={iconTree}>
              <Popup>
                <div>
                  <div className="speciesTree flex flex-row justify-center m-2">
                    <h4
                      className="text-SmokyBlack capitalize">{tree.name}</h4>
                    <AiOutlineInfoCircle className="ml-2" onClick={() => navigate(`/tree/${tree.name.replace(/\s+/g, '-')}`, { replace: true })} />
                  </div>
                  <p>Species: {tree.species}</p>
                  <Link
                    className="underline text-DarkSpringGreen font-bold italic m-2"
                    to={{
                      pathname: tree.wikilink
                    }}
                    target="_blank">Wikipedia</Link>
                </div>
                <div>
                  {(() => {
                    if (tree.value === "locked") {
                      return (
                        <div className="cardInfoTree flex justify-around items-center">
                          <p className="text-SmokyBlack text-[12px]">Owner : {tree.owner}</p>
                          <AiFillLock />
                        </div>
                      )
                    } else if (tree.value === "unavailable") {
                      return (
                        <div className="cardInfoTree">
                          <p className="text-SmokyBlack ml-2">Owner : {tree.owner}</p>
                          <div className="priceTree flex justify-center m-2">
                            <button className="buttonBuy flex flex-row justify-around items-center w-[150px] text-[12px] text-SmokyBlack" onClick={() => navigate(`/tree/${tree.name}`, { replace: true })}>Buy tree?
                              <div className="buttonBuy_price flex items-center">
                                <img src="../src/images/icon-leaf.png" alt="Leaf score icon" className="h-[20px]" />
                              </div>
                            </button>
                          </div>
                        </div>
                      )
                    } else {
                      return (
                        <div className="priceTree flex justify-center m-2">
                          <button
                            className="buttonBuy flex flex-row justify-around items-center w-[150px] text-[12px] text-SmokyBlack"
                            onClick={(e) => { setTreeName(tree.name); handleBuy() }}>Buy tree
                            <div className="buttonBuy_price flex items-center">
                              {tree.price}
                              <img src="../src/images/icon-leaf.png" alt="Leaf score icon" className="h-[20px]" />
                            </div>
                          </button>
                        </div>
                      )
                    }
                  })()}
                </div>
              </Popup>
            </Marker>)
        })}
      </MarkerClusterGroup>
      <MapView />
    </MapContainer >
  )
};






