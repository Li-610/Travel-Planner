import { Button, Flex } from "antd";
import React, { useState, useEffect } from "react";

const AddLocation = ({ dayIdx, dayLists, showRoute, setShowRoute }) => {
  console.log("[AddLocation] dayIdx: " + dayIdx);
  return (
    <Flex justify="center" gap={30} vertical>
      {/* Information Section */}
      <div>
        <h2>Select the place from the map</h2>
        <p>
          Please select the spot marked on the map and click the "Add" button to
          add it to the day list.
        </p>
      </div>

      {/* Day List Section */}
      <div>
        <h2>Day {dayIdx + 1} List</h2>
        <Flex wrap gap={"small"}>
          {dayLists[dayIdx] &&
            dayLists[dayIdx].map((item, index) => <Button>{item.name}</Button>)}
        </Flex>

        {dayLists[dayIdx].length >= 2 && (
          <>
            <Button
              type="primary"
              style={{ marginTop: "20px" }}
              onClick={() => {
                setShowRoute(true);
                console.log("showRoute set to true");
                console.log(showRoute);
              }}
            >
              Generate Day Plan
            </Button>
            <Button
              type="primary"
              style={{ marginTop: "20px", marginLeft: "5px" }}
              onClick={() => {
                setShowRoute(false);
                console.log("showRoute set to false");
                console.log(showRoute);
              }}
            >
              Back
            </Button>
          </>
        )}
      </div>
    </Flex>
  );
};

export default AddLocation;
