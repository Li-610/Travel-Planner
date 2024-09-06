import { Tabs, Layout, Row, Col } from "antd";
import React, { useState } from "react";
import GoogleMap from "./GoogleMap";
import AddLocation from "./AddLocation";
import DailyTimeLine from "./DailyTimeline";
const { Content, Sider } = Layout;

const NewPlanPage = ({ stayDays }) => {
  const [dayLists, setDayLists] = useState(
    Array.from({ length: stayDays }, () => [])
  );
  const [dayIdx, setDayIdx] = useState(0);
  const [showRoute, setShowRoute] = useState(false);

  // Function to add a place to a specific day's list
  const addPlaceToDay = (dayIdx, place) => {
    setDayLists((prevDayLists) => {
      const updatedDayLists = [...prevDayLists];
      // Check if the place is already in the list for the current day
      const placeExists = updatedDayLists[dayIdx].some(
        (existingPlace) => existingPlace.name === place.name
      );
      // Add to the dayIdx if not exist
      if (!placeExists) {
        updatedDayLists[dayIdx] = [...updatedDayLists[dayIdx], place];
      }
      return updatedDayLists;
    });
  };

  // Creating tab panes for each day
  const tabPanes = Array.from({ length: stayDays }, (_, i) => ({
    key: i,
    label: `Day ${i + 1}`,
    children: (
      <AddLocation
        dayIdx={dayIdx}
        dayLists={dayLists}
        showRoute={showRoute}
        setShowRoute={setShowRoute}
      />
    ),
  }));

  const onChange = (key) => {
    console.log("key: " + key);
    setDayIdx(key);
  };

  return (
    <Layout style={{ height: "100%" }}>
      <Content style={{ padding: "40px" }}>
        <Row style={{ height: "100%" }}>
          <Col
            style={{
              width: "600px",
              height: "100%",
              flexShrink: 0, // Prevent the column from shrinking below 600px
            }}
          >
            <GoogleMap
              dayIdx={dayIdx}
              addPlaceToDay={addPlaceToDay}
              showRoute={showRoute}
              dayLists={dayLists}
              style={{ height: "100%", width: "100%" }}
            />
          </Col>
          <Col
            style={{
              flex: 1,
              height: "100%",
              padding: "30px", // Add some spacing between columns
              paddingLeft: "40px",
              backgroundColor: "#fff",
            }}
          >
            <Tabs defaultActiveKey="0" items={tabPanes} onChange={onChange} />
          </Col>
        </Row>
      </Content>
      <Sider
        width={"300px"}
        style={{ padding: "20px", backgroundColor: "#fff" }}
      >
        <DailyTimeLine></DailyTimeLine>
      </Sider>
    </Layout>
  );
};

export default NewPlanPage;
