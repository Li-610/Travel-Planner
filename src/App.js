import { Layout, Dropdown, Menu, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import React, { useState, useEffect, useContext, createContext } from "react";
import LoginPage from "./components/LoginPage";
import HistoryPage from "./components/HistoryPage";
import NewPlanPage from "./components/NewPlanPage";

const { Header, Content } = Layout;
const AuthContext = createContext();

const App = () => {
  const [authed, setAuthed] = useState(false);
  const [stayDays, setStayDays] = useState(null);

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
    if (authed) {
      return <LoginPage handleLoginSuccess={handleLoginSuccess} />;
    }
    if (stayDays != null) {
      return <NewPlanPage stayDays={stayDays} />;
    }
    return <HistoryPage setStayDays={setStayDays} />;
  };

  return (
    <AuthContext.Provider value={{ authed, handleLoginSuccess, handleLogOut }}>
      <Layout style={{ height: "100vh" }}>
        <Header
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundImage: "linear-gradient(to right, #00008B, #ADD8E6)",
            height: "10vh",
          }}
        >
          <div
            className="protest-riot-regular"
            style={{ fontSize: 50, fontWeight: 800, color: "#fff" }}
          >
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
            width: "100%",
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
