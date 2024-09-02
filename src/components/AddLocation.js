import { Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
const { Search } = Input;

const AddLocation = ({ dayNumber }) => {
  return (
    <>
      <br />
      <br />
      <br />
      <h2>Search for the place you want to visit </h2>
      <Input
        style={{ width: "400px" }}
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
      <br />
      <br />
      <br />
      <br />

      <h2>Select the place from the recommended locations on the map</h2>
      <p>
        Please select the spot you marked on the map and click the "Add to Day
        List" button to add it to the day list.
      </p>
      <Button type="primary" shape="round" size="large">
        Add to Day List {dayNumber}
      </Button>
    </>
  );
};

export default AddLocation;
