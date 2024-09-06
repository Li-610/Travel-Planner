import React, { useState, useEffect } from "react";
import { Timeline } from "antd";

const DailyTimeLine = () => {
  return (
    <>
      <h1 style={{ marginBottom: "50px" }}>Daily Timeline</h1>
      <Timeline>
        <Timeline.Item>place1 2024-09-01</Timeline.Item>
        <Timeline.Item>place2 2024-09-01</Timeline.Item>
        <Timeline.Item>place3 2024-09-01</Timeline.Item>
        <Timeline.Item>place4 2024-09-01</Timeline.Item>
      </Timeline>
    </>
  );
};

export default DailyTimeLine;
