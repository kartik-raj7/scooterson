import React, { useState } from "react";
import { Button, Col, Form, Image, Input, Row, Select } from "antd";
import style from "../../styles/auth.module.scss";
import { motion } from "framer-motion";
import { axiosPost } from "../../services/Api/axios";
import { apiRouter } from "../../services/ApiRouter";
import { openNotificationWithIcon } from "../../utils/utils";
import { Link } from "react-router-dom";
const { Option } = Select;

const LoginComponent = () => {
  const [form] = Form.useForm(); // Add this line
  const Login = async (values) => {
    const LoginUrl = apiRouter.LOGIN;
    var LoginDetails = {
      email: values.email,
      password: values.password,
    };
    try {
      const Loginresponse = await axiosPost(
        LoginUrl,
        LoginDetails,
        "application/json",
        null,
        "normal"
      );
      if (Loginresponse.status == "success") {
        openNotificationWithIcon("success", "Login Successful");
        // Store token and type in local storage
        localStorage.setItem(
          "user",
          JSON.stringify({
            token: Loginresponse.token,
            type: Loginresponse.type,
          })
        );
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 500);
      } else {
        console.log(Loginresponse);
        openNotificationWithIcon("error", Loginresponse.message);
      }
    } catch (error) {
      openNotificationWithIcon("error", "Something went wrong");
    }
  };

  const onFinish = (values) => {
    Login(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={style.logindiv}>
      <Row className={style.signup}>
        <Col className={style.signupleft} span={12}>
          <motion.img
            src="/login.png"
            alt="Moving Image"
            className={style.carouselimage}
            initial={{ y: 0 }}
            animate={{
              y: [0, 30, 0], // Values for y position: start, middle, end
            }}
            transition={{
              repeat: Infinity, // Loops the animation indefinitely
              duration: 3, // Duration of each animation cycle
              ease: "easeInOut", // Easing function for smoother animation
            }}
          />
        </Col>
        <Col className={style.loginright} span={12}>
          <Row className={style.signupheading}>
            <div>Dont have an account?</div>
            <Link to="/Signup">
              <Button className={style.signuploginbtn}>Signup</Button>
            </Link>
          </Row>
          <Row className={style.signupwelcome}>
            <span>
              Welcome to{" "}
              <span className={style.signupcompanyname}>AdvantageHub</span>
            </span>{" "}
          </Row>
          <Row className={style.signupregister}>Login your account</Row>
          <Form
            name="registrationForm"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={{ role: "client" }}
            className={style.loginform}
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please enter your email!" },
                { type: "email", message: "Invalid email address!" },
              ]}
            >
              <Input placeholder="Email" className={style.forminputs} />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please enter your password!" },
              ]}
            >
              <Input.Password
                placeholder="Password"
                className={style.forminputs}
              />
            </Form.Item>
            <Form.Item
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                className={style.signupbtn}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default LoginComponent;
