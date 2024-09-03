import React, { useState, useEffect } from "react";
import { Button, Flex, Typography } from "antd";

import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import mockPlaceData from "./mockPlaceData.json";

const GoogleMap = ({ dayIdx, addPlaceToDay }) => {
  const defaultCenter = { lat: 34.0522, lng: -118.2437 };
  const [markers, setMakers] = useState(mockPlaceData);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const handleAddBtnClick = () => {
    addPlaceToDay(dayIdx, selectedMarker);
  };

  return (
    <APIProvider apiKey={"AIzaSyAwdSJB69sI_568FyMdW6Ppjf_hpVbHAPY"}>
      <Map
        defaultCenter={defaultCenter}
        defaultZoom={9}
        mapId={"896dddfe63cd3ea"}
      >
        {markers.map((item, index) => (
          <AdvancedMarker
            key={index}
            position={{ lat: item.lat, lng: item.lng }}
            clickable={true}
            onClick={() => setSelectedMarker(item)}
          />
        ))}
        {selectedMarker && (
          <InfoWindow
            onCloseClick={() => {
              setSelectedMarker(null);
            }}
            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
          >
            <Flex align="center" vertical>
              <h4>{selectedMarker.name}</h4>
              <img width={200} alt="example" src={selectedMarker.url} />
              <Button
                type="primary"
                shape="round"
                size="large"
                style={{
                  width: "70px",
                  marginTop: "20px",
                  marginBottom: "30px",
                }}
                onClick={handleAddBtnClick}
              >
                Add
              </Button>
            </Flex>
          </InfoWindow>
        )}
      </Map>
    </APIProvider>
  );
};
export default GoogleMap;
