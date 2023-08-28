import React from "react";
import { Form, Input, Button, message } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import "../resourses/layout.css";

function ForgotPassword() {
  const onFinish = async (values) => {
    try {
      const response = await axios.post("/api/users/forgot-password", values);
      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div className="h-screen d-flex justify-content-center align-items-center auth">
      <div className="w-400 card p-3">
        <h1 className="text-lg">Forgot Password</h1>
        <hr />
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email address",
              },
              {
                type: "email",
                message: "Please enter a valid email address",
              },
            ]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item>
            <Button className="reset-btn my-3" type="primary" htmlType="submit">
              Reset
            </Button>
          </Form.Item>
          <div className="d-flex justify-content-between align-items-center my-3">
            <Link to="/login">
              <b>Return to Login</b>
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default ForgotPassword;
