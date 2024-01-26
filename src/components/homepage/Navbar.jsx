import { Button, Col, Image, Row } from 'antd'
import React from 'react'
import style from '../../styles/homepage.module.scss'
import { GrAnnounce } from "react-icons/gr";
const Navbar = () => {
  return (
    <>
    <Row className={style.navbar}>
    <Col className={style.companylogo}>AdVantageHub <GrAnnounce/></Col>
    {/* <Image src='/logo.png'/> */}
    <Col>
    <Button className={style.homepagenavbtn}>
    Get Started
    </Button>
    </Col>
    </Row>
    </>
  )
}

export default Navbar