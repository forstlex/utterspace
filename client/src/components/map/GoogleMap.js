import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import "@reach/combobox/styles.css";
import mapStyles from "./mapStyles";

const libraries = ["places"];

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const center = {
  lat: 45.508888,
  lng: -73.561668,
};

export default function App({ spaces }) {

  const [width, setWidth] = useState(window.innerWidth);
  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  let isMobile = (width <= 768);

  const mapContainerStyle = isMobile ? { height: 250, width: 250 } : { height: 570, width: 570 };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBz6_ghMkyk--dKtlMtR-7nY0nR-coTVAM",
    libraries,
  });

  const [toolTipNumber, setToolTipNumber] = useState(-1);

  const handleMouseOver = (index) => {
    setToolTipNumber(index);
  }

  const renderMarkers = () => spaces.map((space, index) =>
    <Marker
      key={`${space.geo.lat}-${space.geo.lng}-${index}`}
      position={{ lat: space.geo.lat, lng: space.geo.lng }}
      onMouseOver={() => handleMouseOver(index)}
      icon={{
        url: `marker.png`,
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(15, 15),
        scaledSize: new window.google.maps.Size(30, 30),
      }}
    >
      {toolTipNumber === index &&
        <InfoWindow>
          <h4>{space.location}</h4>
        </InfoWindow>}
    </Marker>
  )

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <GoogleMap
      id="map"
      mapContainerStyle={mapContainerStyle}
      zoom={8}
      center={center}
      options={options}
      onLoad={map => {
        map.addListener("center_changed", () => {
        });
        map.addListener("click", () => {
        });

        for (let i = 0; i < spaces.length; i++) {
          const mapDiv = document.getElementById(`image${i}`);
          window.google.maps.event.addDomListener(mapDiv, "click", () => {
            map.panTo(spaces[i].geo)
          });
        }
      }}
    >
      {renderMarkers()}
    </GoogleMap>
  );
}
