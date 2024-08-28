import React, { useState, useEffect } from "react";
import { Button, Layout, message, Modal, DatePicker } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import MyPlans from "./MyPlans";
import { deletePlan } from "../utils";
import CreatePlan from "./CreatePlan";

const { Header, Content } = Layout;

const GuestHomePage = (handleShowDetail) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleClose = () => {
    setModalVisible(false);
  };

  const handleCreate = () => {
    setModalVisible(true);
  };

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "transparent",
          borderBottom: "2px solid #007AFF",
        }}
      >
        <div>User Name</div>
        {
          <div>
            <Button
              onClick={handleCreate}
              style={{
                backgroundColor: "#007AFF",
                color: "white",
                borderRadius: "15px",
              }}
            >
              <PlusOutlined className="site-form-item-icon" />
              Create Plan
            </Button>
          </div>
        }
      </Header>
      <Modal
        title="Create Plan"
        visible={modalVisible}
        onCancel={handleClose}
        footer={null}
      >
        <CreatePlan handleClose={handleClose} />
      </Modal>
      <MyPlans handleShowDetail={handleShowDetail} />
    </Layout>
  );
};

export default GuestHomePage;
