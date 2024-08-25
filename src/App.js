import { Layout, Dropdown, Menu, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import React, { useState, useEffect, useContext, createContext } from "react";
import LoginPage from "./components/LoginPage";
import GuestHomePage from "./components/GuestHomePage";

const { Header, Content } = Layout;
const AuthContext = createContext();

const App = () => {
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    setAuthed(authToken !== null);
  }, []);

  const handleLoginSuccess = (token) => {
    localStorage.setItem("authToken", token);
    setAuthed(true);
  };

  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("asHost");
    setAuthed(false);
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="logout" onClick={handleLogOut}>
        Log Out
      </Menu.Item>
    </Menu>
  );

  const renderContent = () => {
    if (!authed) {
      return <LoginPage handleLoginSuccess={handleLoginSuccess} />;
    }
    return <GuestHomePage />;
  };

  return (
    <AuthContext.Provider value={{ authed, handleLoginSuccess, handleLogOut }}>
      <Layout style={{ height: "100vh" }}>
        <Header
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "transparent",
            borderBottom: "2px solid #ccc",
          }}
        >
          <div style={{ fontSize: 30, fontWeight: 800, color: "#55A9F3" }}>
            Travel Planner
          </div>
          <div style={{ position: "absolute", right: 20 }}>
            <Dropdown trigger="click" overlay={userMenu}>
              <Button
                icon={<UserOutlined style={{ color: "blue" }} />}
                shape="circle"
                style={{
                  backgroundColor: "#c6e5ff",
                  borderColor: "#c6e5ff",
                }}
              />
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            height: "calc(100% - 64px)",
            padding: "0 30px",
            overflow: "auto",
            display: "flex",
          }}
        >
          {renderContent()}
        </Content>
      </Layout>
    </AuthContext.Provider>
  );
};

export default App;
