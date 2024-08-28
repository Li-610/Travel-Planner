import { message, List, Card, Button } from "antd";
import { useState, useEffect } from "react";
import { getPlan } from "../utils";

const MyPlans = (handleShowDetail) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      // const resp = await getStaysByHost();
      const resp = [
        {
          start_location: "New York, USA",
          start_date: "2024-08-01",
          end_date: "2024-08-10",
        },
        {
          start_location: "Tokyo, Japan",
          start_date: "2024-09-05",
          end_date: "2024-09-15",
        },
        {
          start_location: "Paris, France",
          start_date: "2024-10-10",
          end_date: "2024-10-20",
        },
      ];
      setData(resp);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <List
      loading={loading}
      grid={{ gutter: 16, column: 1 }}
      dataSource={data}
      style={{ margin: "20px" }}
      renderItem={(item) => (
        <List.Item>
          <Card>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div style={{ marginRight: "5px" }}>
                <strong>Location:</strong> {item.start_location}
              </div>
              <div style={{ marginRight: "5px" }}>
                <strong>Start Date:</strong> {item.start_date}
              </div>
              <div style={{ marginRight: "5px" }}>
                <strong>End Date:</strong> {item.end_date}
              </div>
              <Button
                onClick={handleShowDetail}
                style={{
                  backgroundColor: "#007AFF",
                  color: "white",
                  borderRadius: "15px",
                }}
              >
                Details
              </Button>
              <Button>Delete</Button>
            </div>
          </Card>
        </List.Item>
      )}
    />
  );
};

export default MyPlans;
