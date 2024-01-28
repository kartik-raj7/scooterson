import { Avatar, Button, Col, Image, Row } from 'antd'
import React from 'react'
import style from '../../styles/homepage.module.scss'
import { GrAnnounce } from "react-icons/gr";
import {motion} from 'framer-motion'
import { GrLogout } from 'react-icons/gr';
import UserProfileAvatar from '../../utils/ui/UserProfileAvatar';
const Navbar = ({user,logOut}) => {
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