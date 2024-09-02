import React, { useState, useEffect } from "react";
import { Button, Layout, message, Modal, DatePicker } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import MyPlans from "./MyPlans";
import { deletePlan } from "../utils";
import CreatePlan from "./CreatePlan";

const { Header, Content } = Layout;

const HistoryPage = ({ handleShowDetail, setStayDays }) => {
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
    <Layout style={{ padding: "40px" }}>
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
            <Button className="inputSize" type="primary" onClick={handleCreate}>
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
        <CreatePlan handleClose={handleClose} setStayDays={setStayDays} />
      </Modal>
      <MyPlans handleShowDetail={handleShowDetail} />
    </Layout>
  );
};

export default HistoryPage;
