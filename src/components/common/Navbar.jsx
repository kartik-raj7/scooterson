import { Button, Col, Image, Row } from 'antd'
import React from 'react'
import style from '../../styles/homepage.module.scss'
import { GrAnnounce } from "react-icons/gr";
import {motion} from 'framer-motion'
const Navbar = () => {
  return (
    <>
    <Row className={style.navbar}>
    <Col className={style.companylogo}>AdVantageHub <GrAnnounce/></Col>
    {/* <Image src='/logo.png'/> */}
    <Col>
    <motion.button whileTap={{ scale: 0.85 }} className={style.homepagenavbtn}>
    Get Started
    </motion.button>
    
    </Col>
    </Row>
    </>
  )
}

export default Navbar