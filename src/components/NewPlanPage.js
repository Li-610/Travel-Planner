import { Layout, Tabs } from "antd";
import React, { useState, useEffect } from "react";
import GoogleMap from "./GoogleMap";
import AddLocation from "./AddLocation";

const NewPlanPage = ({ stayDays }) => {
  const items = [];

  for (let i = 1; i <= stayDays; i++) {
    items.push({
      key: i,
      label: `Day ${i}`,
      children: <AddLocation dayNumber={i} />,
    });
  }

  const onChange = (key) => {
    console.log(key);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flex: "1",
          justifyContent: "flex-start",
          height: "100%",
          padding: "40px",
        }}
      >
        <div style={{ width: "600px" }}>
          <GoogleMap style={{ height: "100%", width: "100%" }}></GoogleMap>
        </div>
        <div
          style={{
            flex: "1",
            padding: "10px 50px",
            backgroundColor: "#fff",
          }}
        >
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
      </div>

      <div style={{ width: "300px", height: "100%", backgroundColor: "#fff" }}>
        Day List Cart
      </div>
    </>
  );
};

export default NewPlanPage;
