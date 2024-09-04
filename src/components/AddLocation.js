import { Input, Button, Flex } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";

const AddLocation = ({ dayIdx, dayLists, showRoute, setShowRoute }) => {
  console.log("[AddLocation] dayIdx: " + dayIdx);
  return (
    <Flex justify="center" gap={20} vertical>
      {/* Search Section */}
      <div>
        <h2>Search for the place you want to visit </h2>
        <Input
          style={{ width: "250px" }}
          className="inputSize"
          placeholder="Please enter the location"
        />
        <Button
          style={{ marginLeft: "10px" }}
          type="primary"
          shape="circle"
          size="large"
          icon={<SearchOutlined />}
        />
      </div>

      {/* Information Section */}
      <div>
        <h2>Select the place from the map</h2>
        <p>
          Please select the spot you marked on the map and click the "Add to Day
          List" button to add it to the day list.
        </p>
      </div>

      {/* Day List Section */}
      <div>
        <h2>Day {dayIdx + 1}</h2>
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
              }}
            >
              Generate Day Plan
            </Button>
            <Button
              type="primary"
              style={{ marginTop: "20px", marginLeft: "5px" }}
              onClick={() => {
                setShowRoute(false);
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
