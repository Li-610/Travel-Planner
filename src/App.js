import { Layout, Dropdown, Menu, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import React from "react";
import LoginPage from "./components/LoginPage";
import GuestHomePage from "./components/GuestHomePage";
const { Header, Content } = Layout;

class App extends React.Component {
  state = {
    authed: false,
  };

  componentDidMount() {
    const authToken = localStorage.getItem("authToken");
    this.setState({
      authed: authToken !== null,
    });
  }

  handleLoginSuccess = (token) => {
    localStorage.setItem("authToken", token);
    this.setState({
      authed: true,
    });
  };

  handleLogOut = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("asHost");
    this.setState({
      authed: false,
    });
  };

  userMenu = (
    <Menu>
      <Menu.Item key="logout" onClick={this.handleLogOut}>
        Log Out
      </Menu.Item>
    </Menu>
  );

  renderContent = () => {
    if (!this.state.authed) {
      return <LoginPage handleLoginSuccess={this.handleLoginSuccess} />;
    }

    return <GuestHomePage />;
  };

  render() {
    return (
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
          {
            <div style={{ position: "absolute", right: 20 }}>
              <Dropdown trigger="click" overlay={this.userMenu}>
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
          }
        </Header>
        <Content
          style={{
            height: "calc(100% - 64px)",
            margin: 20,
            overflow: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {this.renderContent()}
        </Content>
      </Layout>
    );
  }
}

export default App;
