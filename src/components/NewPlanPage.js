import { Layout, Tabs } from "antd";
import Sider from "antd/es/layout/Sider";
import React, { useState, useEffect } from "react";
import Map from "./Map";
const { TabPane } = Tabs;

const NewPlanPage = () => {
  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: "1",
      label: "Tab 1",
      children: "Content of Tab Pane 1",
    },
    {
      key: "2",
      label: "Tab 2",
      children: "Content of Tab Pane 2",
    },
    {
      key: "3",
      label: "Tab 3",
      children: "Content of Tab Pane 3",
    },
  ];
  return (
    <>
      <Layout style={{ padding: "40px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            height: "100%",
          }}
        >
          <div style={{ flex: "1", backgroundColor: "#444" }}>
            <Map style={{ height: "100%" }}></Map>
          </div>
          <div
            style={{
              flex: "1",
              padding: "10px 50px",
              backgroundColor: "#fff",
            }}
          >
            <Tabs defaultActiveKey="1" destroyInactiveTabPane={true}>
              <TabPane tab="Day1" key="1">
                111
              </TabPane>
              <TabPane tab="Day2" key="2"></TabPane>
            </Tabs>
          </div>
        </div>
      </Layout>
      <div style={{ width: "300px", height: "100%", backgroundColor: "#fff" }}>
        Day List Cart
      </div>
    </>
  );
};

export default NewPlanPage;
