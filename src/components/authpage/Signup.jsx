import React, { useState } from "react";
import { Button, Col, Form, Image, Input, Row, Select } from "antd";
import style from "../../styles/auth.module.scss";
import {motion} from 'framer-motion'
import { axiosPost } from "../../services/Api/axios";
import { apiRouter } from "../../services/ApiRouter";
import { openNotificationWithIcon } from "../../utils/utils";
import { Link } from "react-router-dom";
const { Option } = Select;

const AuthComp = () => {
const [role,selectRole] = useState('client');
  const [form] = Form.useForm(); // Add this line
  const Signup = async (values) => {
    const signupUrl = apiRouter.SIGNUP;
    var signupData = {
      name: values.name,
      email: values.email,
      password: values.password,
      type:values.role
    };
    if(values.role=='client'){
      signupData={...signupData,location:values.location}
    }
    try {
      const signupResponse = await axiosPost(signupUrl, signupData, 'application/json', null, 'auth');
      console.log(signupResponse)
      if (signupResponse.status=='success') {
         openNotificationWithIcon('success','Signup successful redirecting you to Login page');
         setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else {
        console.log(signupResponse)
        openNotificationWithIcon('error',signupResponse.message)
      }
    } catch (error) {
      openNotificationWithIcon('error','Something went wrong')
    }
  };
  
  const onFinish = (values) => {
    Signup(values)
  };
  console.log(role)
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={style.signupdiv}>
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
        <Col className={style.signupright} span={12}>
        <div className={style.signuprightdiv}>
          <Row className={style.signupheading}>
              <div>Already have an account?</div>
              <Link to='/login'><Button className={style.signuploginbtn}>Login</Button></Link>
          </Row>
          <Row className={style.signupwelcome}><span>Welcome to <span className={style.signupcompanyname}>AdvantageHub</span></span> </Row>
          <Row className={style.signupregister}>Register your account</Row>
          <Form
            name="registrationForm"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={{ role: "client" }}
            className={style.signupform}
          >
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Please enter your name!" }]}
            >
              <Input placeholder="Name" className={style.forminputs}/>
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please enter your email!" },
                { type: "email", message: "Invalid email address!" },
              ]}
            >
              <Input placeholder="Email" className={style.forminputs}/>
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please enter your password!" },
              ]}
            >
              <Input.Password placeholder="Password" className={style.forminputs}/>
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match!"));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm Password" className={style.forminputs}/>
            </Form.Item>
            <Form.Item
              name="role"
              rules={[{ required: true, message: "Please select a role!" }]}
            >
              <Select placeholder="Select Role" onChange={(e)=>selectRole(e)} className={style.forminputselect}>
                <Option value="Client">Client</Option>
                <Option value="Advertiser">Advertiser</Option>
                <Option value="Content Creator">Content Creator</Option>
              </Select>
            </Form.Item>
            {role=='client'&&
              <Form.Item
                name="location"
                rules={[
                  { required: true, message: "Please enter your location!" },
                ]}
              >
                <Input placeholder="Location" className={style.forminputs}/>
              </Form.Item>}
            <Form.Item style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
              <Button type="primary" htmlType="submit" className={style.signupbtn}>
                Register
              </Button>
            </Form.Item>
          </Form>
          </div>
        </Col>
        
      </Row>
    </div>
  );
};

export default AuthComp;
