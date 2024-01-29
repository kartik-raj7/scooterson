import { Button, Form, Row, Select } from "antd";
import React, { useState } from "react";
const { Option } = Select;
import style from '../../styles/dashboard.module.scss'
import { axiosGet, axiosPost } from "../../services/Api/axios";
import { apiRouter } from "../../services/ApiRouter";
import { openNotificationWithIcon } from "../../utils/utils";
import {motion} from 'framer-motion'
const AdminDashboard = () => {
    const [data,setData] = useState([]);
    const [form] = Form.useForm();
    const [selecteduserrole,setSelectedUserRole] = useState(null);
    const [loading,setLoading] = useState(false);
  const onChange = (value) => {
    const selectedUser = JSON.parse(value);
    console.log(selectedUser.type)
    form.setFieldsValue({
         role:selectedUser.type
    })
  };
  const onSearch = async (value) => {
    const searchUrl = apiRouter.USER_SEARCH;
    try {
        const searchResponse = await axiosGet(searchUrl, {search:value}, 'application/json')
        console.log(searchResponse)
        if (searchResponse.status) {
            setData([]); 
            setSelectedUserRole(null);
            searchResponse.data.forEach((user) => {
              setData((prevData) => [
                ...prevData,
                { value: JSON.stringify(user), label: `${user.name} ${user.email}` },
              ]);
            });
          } else {
          console.log(searchResponse)
          openNotificationWithIcon('error',searchResponse.message)
        }
      } catch (error) {
        openNotificationWithIcon('error','Something went wrong')
      }
  };
  const updateRole = async(value)=>{
        setLoading(true);
        const {user,role} = value;
        const {_id} = JSON.parse(user);
        const updateRoleURl = `${apiRouter.UPDATE_ROLE}/${_id}`;
        try {
          const myContentresponse = await axiosPost(
            updateRoleURl,
            {user_role:role},
            'application/json',
            null,
            'get'
          );
          if (myContentresponse.status==='success') {
             openNotificationWithIcon('success','Role Updated successfully');
             setLoading(false);
          } else {
            openNotificationWithIcon('error', myContentresponse.message);
            setLoading(false);
          }
        } catch (error) {
          openNotificationWithIcon('error', 'Something went wrong');
          setLoading(false);
        }
      }
  const onFinish=(values)=>{
    updateRole(values);
  }
  const onFinishFailed=(errors)=>{
    console.log(errors);
  }
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  return (
    <div className={style.admindashboard}>
        <div className={style.admindashboardcomponent}>
      <Row className={style.admindashboardheading}>ADMIN DASHBOARD</Row>
      <Form
            name="registrationForm"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            form={form}
            className={style.admindashboardform}
            disabled={loading}
          >
      <Row>
      <Form.Item
              name="user"
              label="user"
              rules={[{ required: true, message: "Please select a user" }]}
              className={style.admindashboardformitem}
            >
        <Select
          showSearch
          placeholder="Select a person"
          optionFilterProp="children"
          onChange={onChange}
          onSearch={onSearch}
          filterOption={filterOption}
          options={data}
        />
        </Form.Item>
      </Row>
      <Form.Item
              name="role"
              label="Role"
              rules={[{ required: true, message: "Please select a role!" }]}
              className={style.admindashboardformitem}
            >
              <Select placeholder="Select Role" className={style.forminputselect}>
                <Option value="Client">Client</Option>
                <Option value="Advertiser">Advertiser</Option>
                <Option value="Content Creator">Content Creator</Option>
              </Select>
            </Form.Item>
            <Form.Item className={style.admindashboardsubmitbtndiv}>
            <motion.button whileTap={{ scale: 0.85 }} type="primary" htmlType="submit" className={style.admindashboardsubmitbtn}>
                Update Role
                </motion.button>
            </Form.Item>
            </Form>
    </div>
    </div>
  );
};

export default AdminDashboard;
