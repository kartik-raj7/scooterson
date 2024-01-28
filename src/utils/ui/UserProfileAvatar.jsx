import React from 'react';
import { Avatar, Tooltip } from 'antd';
import { motion } from 'framer-motion';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import style from '../../styles/homepage.module.scss';
import { Navigate, useNavigate} from 'react-router-dom';

const UserProfileAvatar = ({ user,logOut }) => {
const history  = useNavigate();
  function onLogout(){
        // Delete user key from local storage
        console.log('here')
        localStorage.removeItem('user');
        logOut();
        history('/login')
        // return <Navigate to="/dashboard" replace />
  }
  const tooltipContent = (
    <div>
      <p>Name- {user.name}</p>
      <p>Email- {user.email}</p>
      <p>Type- {user.type}</p>
      <div onClick={onLogout} className={style.logoutoption}>
        <LogoutOutlined />
        <span className={style.logout}>Logout</span>
      </div>
    </div>
  );

  return (
    <Tooltip title={tooltipContent} placement="bottom">
      <motion.div whileTap={{ scale: 0.85 }}>
        <Avatar
          src={`https://ui-avatars.com/api/?name=${user.name}`}
          alt="User Avatar"
          className={style.useravatar}
        />
      </motion.div>
    </Tooltip>
  );
};

export default UserProfileAvatar;
