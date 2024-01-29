import { Card, Col, Row } from 'antd'
import React from 'react'
import { IoTriangle } from "react-icons/io5";
import style from '../../styles/analyticscard.module.scss'
import { TbTriangleInvertedFilled } from "react-icons/tb";
import {motion} from 'framer-motion'
const AnalyticsCard = ({data}) => {
    // function MetricSymbol(){
    //     if(data.)
    // }
  return (
    <motion.button whileHover={{ scale: 0.92 }} className={style.analyticscard}>
    {/* <Card > */}
    <Row className={style.analyticstitle}>Number of {data.title}</Row>
    <Row className={style.analyticsdetaildiv}>
    <Col className={style.analyticsdetail} span={24}>{data.metrics}</Col>
    </Row>
    <Row className={style.analyticspercentagediv}>
        <Col className={style.anayticstriangle}><IoTriangle style={{color:'white'}}/></Col>
        <Col className={style.analyticspercentage}>{data.percentage} %</Col>
    </Row>
    {/* </Card> */}
    </motion.button>
  )
}

export default AnalyticsCard