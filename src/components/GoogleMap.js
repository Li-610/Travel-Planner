import React, { useState, useEffect } from "react";

import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import mockLocData from "./mockLocData.json";

const GoogleMap = () => {
  const defaultCenter = { lat: 34.0522, lng: -118.2437 };

  return (
    <APIProvider apiKey={"AIzaSyAwdSJB69sI_568FyMdW6Ppjf_hpVbHAPY"}>
      <Map
        defaultCenter={defaultCenter}
        defaultZoom={9}
        mapId={"896dddfe63cd3ea"}
      >
        {mockLocData.map((geoLocation, index) => (
          <Marker
            key={index}
            position={{ lat: geoLocation.lat, lng: geoLocation.lng }}
          />
        ))}
      </Map>
    </APIProvider>
  );
};
export default GoogleMap;
