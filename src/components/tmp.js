import React, { useEffect, useState } from "react";
import { Button, Flex, message } from "antd";

import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  useMapsLibrary,
  useMap,
} from "@vis.gl/react-google-maps";

import mockPlaceData from "./mockPlaceData.json";
import { fetchPlaces } from "../utils";

const GoogleMap = ({ dayIdx, addPlaceToDay, showRoute, dayLists }) => {
  const defaultCenter = { lat: 34.0522, lng: -118.2437 };

  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <Map
        defaultCenter={defaultCenter}
        defaultZoom={9}
        mapId={process.env.REACT_APP_MAP_ID}
      >
        {showRoute ? (
          <MapRoute dayIdx={dayIdx} dayLists={dayLists} />
        ) : (
          <MapMarkers dayIdx={dayIdx} addPlaceToDay={addPlaceToDay} />
        )}
      </Map>
    </APIProvider>
  );
};
export default GoogleMap;

// When we need to show markers
const MapMarkers = ({ dayIdx, addPlaceToDay }) => {
  const [markers, setMakers] = useState(mockPlaceData);
  const [places, setPlaces] = useState([]); // test to fetch Places from Google
  const [selectedMarker, setSelectedMarker] = useState(null);

  /**********test to fetch Places from Google *************/
  // useEffect(() => {
  //   fetchPlaces()
  //     .then((data) => {
  //       setPlaces(data.results);
  //     })
  //     .catch((err) => {
  //       message.error(err.message);
  //     });
  //   console.log("Places from Google: ");
  //   console.log(places);
  // }, []);
  /***********************************************************/

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
const MapRoute = ({ dayIdx, dayLists }) => {
  const map = useMap(); // get map instance
  const routesLibrary = useMapsLibrary("routes"); //dynamically load route library
  const [directionsService, setDirectionsService] = useState();
  const [directionsRenderer, setDirectionsRenderer] = useState();
  const [routes, setRoutes] = useState([]);

  // This hook is to initialize the Direction service
  useEffect(() => {
    if (!routesLibrary || !map) return;
    // once the map and routesLibrary is set up, create instance of the Direction service
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [routesLibrary, map]);

  // This hook is to generate the route
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

    directionsService
      .route({
        origin: startPos,
        destination: endPos,
        travelMode: "DRIVING",
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
        console.log(`routes: ${routes}`);
      });
  }, [directionsService, directionsRenderer]);
};
