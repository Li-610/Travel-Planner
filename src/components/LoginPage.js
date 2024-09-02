import React, { useState, useRef } from "react";
import { Form, Button, Input, Space, Checkbox, message, Modal } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { login, register } from "../utils";

const Register = () => {
  const formRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setModalVisible(false);
  };

  const handleRegister = () => {
    setModalVisible(true);
  };

  const handleSubmit = async () => {
    const formInstance = formRef.current;

    try {
      await formInstance.validateFields();
    } catch (error) {
      return;
    }

    setLoading(true);

    try {
      await register({
        ...formInstance.getFieldsValue(true),
        role: "ROLE_GUEST",
      });
      message.success("Register Successfully");
      handleClose();
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <p>
        Or{" "}
        <span
          onClick={handleRegister}
          style={{ cursor: "pointer", color: "blue" }}
        >
          Register now
        </span>
      </p>
      <Modal
        title="Register"
        visible={modalVisible}
        onCancel={handleClose}
        footer={null}
        width={400}
      >
        <Form ref={formRef} onFinish={() => console.log("finish form")}>
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
              disabled={loading}
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
            <Input.Password disabled={loading} placeholder="Password" />
          </Form.Item>
        </Form>
        <Space>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="inputSize"
            type="primary"
          >
            Register
          </Button>
        </Space>
      </Modal>
    </>
  );
};

const LoginPage = ({ handleLoginSuccess }) => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    const formInstance = formRef.current;

    try {
      await formInstance.validateFields();
    } catch (error) {
      return;
    }

    setLoading(true);

    try {
      const resp = await login(formInstance.getFieldsValue(true));
      handleLoginSuccess(resp.token);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: 400, margin: "150px auto" }}>
      <Form ref={formRef} onFinish={() => console.log("finish form")}>
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
            className="inputSize"
            disabled={loading}
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
            className="inputSize"
            disabled={loading}
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Checkbox disabled={loading}>Remember me</Checkbox>
        </Form.Item>
      </Form>

      <Button
        className="inputSize"
        onClick={handleLogin}
        disabled={loading}
        type="primary"
        style={{ width: 400 }}
      >
        Log in
      </Button>
      <Register />
    </div>
  );
};

export default LoginPage;
