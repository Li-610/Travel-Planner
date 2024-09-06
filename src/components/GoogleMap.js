import React, { useEffect, useState } from "react";
import { Button, Flex } from "antd";
import { PlaceAutocompleteClassic } from "./autoComplete/PlaceAutocompleteClassic";
import { MapHandler } from "./autoComplete/MapHandler";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  useMapsLibrary,
  useMap,
  ControlPosition,
  MapControl,
} from "@vis.gl/react-google-maps";

import mockPlaceData from "./mockPlaceData.json";

const GoogleMap = ({ dayIdx, addPlaceToDay, showRoute, dayLists }) => {
  const [inputPlace, setInputPlace] = useState(null); // autocomplete state
  const defaultCenter = { lat: 34.0522, lng: -118.2437 };

  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <Map
        defaultCenter={defaultCenter}
        defaultZoom={9}
        mapId={process.env.REACT_APP_MAP_ID}
      >
        {showRoute ? (
          <MapRoute dayIdx={dayIdx} dayLists={dayLists} showRoute={showRoute} />
        ) : (
          <MapMarkers dayIdx={dayIdx} addPlaceToDay={addPlaceToDay} />
        )}
      </Map>

      {/* Autocomplete */}
      <MapControl position={ControlPosition.TOP}>
        <PlaceAutocompleteClassic onInputPlaceSelect={setInputPlace} />
      </MapControl>
      {inputPlace && (
        <div>
          <h3>Input Place:</h3>
          <p>{inputPlace.name}</p>
          <p>{inputPlace.formatted_address}</p>
        </div>
      )}
      <MapHandler inputPlace={inputPlace} />
    </APIProvider>
  );
};
export default GoogleMap;

// When we need to show markers
const MapMarkers = ({ dayIdx, addPlaceToDay }) => {
  const [markers, setMakers] = useState(mockPlaceData);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const handleAddBtnClick = () => {
    addPlaceToDay(dayIdx, selectedMarker);
  };

  return (
    <>
      {markers &&
        markers.map((item, index) => (
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
    </>
  );
};

// When we need to show routes
const MapRoute = ({ dayIdx, dayLists, showRoute }) => {
  const map = useMap(); // get map instance
  const routesLibrary = useMapsLibrary("routes"); //dynamically load route library
  const [directionsService, setDirectionsService] = useState();
  const [directionsRenderer, setDirectionsRenderer] = useState();
  const [routes, setRoutes] = useState([]);

  // This hook is to initialize the Direction service and renderer
  useEffect(() => {
    if (!routesLibrary || !map) return;
    // once the map and routesLibrary is set up, create instance of the Direction service
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [routesLibrary, map]);

  // This hook is to use directions service
  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;

    const startPos = {
      lat: dayLists[dayIdx][0].lat,
      lng: dayLists[dayIdx][0].lng,
    };
    const endPos = {
      lat: dayLists[dayIdx][dayLists[dayIdx].length - 1].lat,
      lng: dayLists[dayIdx][dayLists[dayIdx].length - 1].lng,
    };

    // Extract waypoints (all locations except the first and last)
    const waypoints = dayLists[dayIdx]
      .slice(1, -1) // Extract elements from index 1 to the second-to-last
      .map((point) => ({
        location: { lat: point.lat, lng: point.lng },
        stopover: true, // Marks this as a stopover location
      }));

    directionsService
      .route({
        origin: startPos,
        destination: endPos,
        travelMode: "DRIVING",
        waypoints: waypoints,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
        console.log(`routes: ${routes}`);
      });

    return () => directionsRenderer.setMap(null);
  }, [directionsService, directionsRenderer, showRoute]);
};
