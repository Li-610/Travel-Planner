import React from "react";
import { Form, Button, Input, Space, Checkbox, message, Modal } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { login, register } from "../utils";

class Register extends React.Component {
  formRef = React.createRef();
  state = {
    modalVisible: false,
  };

  onFinish = () => {
    console.log("finish form");
  };

  handleClose = () => {
    this.setState({
      modalVisible: false,
    });
  };

  handleRegister = () => {
    this.setState({
      modalVisible: true,
    });
  };

  handleSubmit = async () => {
    const formInstance = this.formRef.current;

    try {
      await formInstance.validateFields();
    } catch (error) {
      return;
    }

    this.setState({
      loading: true,
    });

    try {
      await register({
        ...formInstance.getFieldsValue(true),
        role: this.state.asHost ? "ROLE_HOST" : "ROLE_GUEST",
      });
      message.success("Register Successfully");
      this.handleClose();
    } catch (error) {
      message.error(error.message);
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    return (
      <>
        <p>
          Or{" "}
          <span
            onClick={this.handleRegister}
            style={{ cursor: "pointer", color: "blue" }}
          >
            Register now
          </span>
        </p>
        <Modal
          title="Register"
          visible={this.state.modalVisible}
          onCancel={this.handleClose}
          footer={null}
        >
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <Input
                disabled={this.state.loading}
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input.Password
                disabled={this.state.loading}
                placeholder="Password"
              />
            </Form.Item>
          </Form>
          <Space>
            <Button
              onClick={this.handleSubmit}
              disabled={this.state.loading}
              shape="round"
              type="primary"
            >
              Register
            </Button>
          </Space>
        </Modal>
      </>
    );
  }
}

class LoginPage extends React.Component {
  formRef = React.createRef();
  state = {
    loading: false,
  };

  onFinish = () => {
    console.log("finish form");
  };

  handleLogin = async () => {
    const formInstance = this.formRef.current;

    try {
      await formInstance.validateFields();
    } catch (error) {
      return;
    }

    this.setState({
      loading: true,
    });

    try {
      const resp = await login(formInstance.getFieldsValue(true));
      this.props.handleLoginSuccess(resp.token);
    } catch (error) {
      message.error(error.message);
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  handleRegister = async () => {
    const formInstance = this.formRef.current;

    try {
      await formInstance.validateFields();
    } catch (error) {
      return;
    }

    this.setState({
      loading: true,
    });

    try {
      await register({
        ...formInstance.getFieldsValue(true),
      });
      message.success("Register Successfully");
    } catch (error) {
      message.error(error.message);
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    return (
      <div style={{ width: 500, margin: "20px auto" }}>
        <Form ref={this.formRef} onFinish={this.onFinish}>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              disabled={this.state.loading}
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              disabled={this.state.loading}
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Checkbox disabled={this.state.loading}>Remeber me</Checkbox>
          </Form.Item>
        </Form>

        <Button
          onClick={this.handleLogin}
          disabled={this.state.loading}
          type="primary"
          style={{ borderRadius: "6px", width: 500 }}
        >
          Log in
        </Button>
        <Register />
      </div>
    );
  }
}

export default LoginPage;
