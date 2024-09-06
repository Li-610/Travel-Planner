import { useMap } from "@vis.gl/react-google-maps";
import React, { useEffect } from "react";

export const MapHandler = ({ inputPlace }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !inputPlace) return;

    if (inputPlace.geometry?.viewport) {
      map.fitBounds(inputPlace.geometry.viewport);
    }
  }, [map, inputPlace]);

  return null;
};
