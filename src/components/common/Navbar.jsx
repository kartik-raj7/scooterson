import { Col, Row } from 'antd'
import React from 'react'
import style from '../../styles/homepage.module.scss'
import { GrAnnounce } from "react-icons/gr";
import {motion} from 'framer-motion'
import UserProfileAvatar from '../../utils/ui/UserProfileAvatar';
import { useSelector } from 'react-redux';
const Navbar = ({logOut}) => {
  const data = useSelector((state) => state.user);
  const {user} = data;
  return (
    <>
    <Row className={style.navbar}>
    <Col className={style.companylogo}>AdVantageHub <GrAnnounce/></Col>
    <Col>
    {user?<>
     <UserProfileAvatar user={user} logOut={logOut}/>
    </>:
    <motion.button whileTap={{ scale: 0.85 }} className={style.homepagenavbtn}>
    Get Started
    </motion.button>
}
    </Col>
    </Row>
    </>
  )
}

export default Navbar