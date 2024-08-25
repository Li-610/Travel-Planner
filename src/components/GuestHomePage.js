import React from "react";
import { Button, Layout, Dropdown } from "antd";

import { UserOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;

function GuestHomePage() {
  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "transparent",
          borderBottom: "2px solid #ccc",
        }}
      >
        <div>User Name</div>
        {
          <div>
            <Button>Create Plan</Button>
          </div>
        }
      </Header>
      <Content>
        <p>Toronto, Ontario, Canada</p>
        <p>2021/04/08 10:21:13</p>
      </Content>
    </Layout>
  );
}

export default GuestHomePage;
