import { Image, Row } from 'antd'
import React from 'react'
import style from '../../styles/adcard.module.scss'
import{Rate} from 'antd'
const Adcard = ({ad}) => {
  return (
    // <div className={style.feedbackcardwrapper}>
    <div className={style.adcard}>
        <Image src={ad.ad_multimedia} preview={false} className={style.adimage}/>
        <Row className={style.adheadline}>{ad.ad_headline}</Row>
        <Row className={style.addetail}>{ad.ad_detail}</Row>
        <Row className={style.adscheduledtime}>{ad.ad_scheduledtime}</Row>
        <Row className={style.adcreator}>{ad.ad_creator}</Row>
    </div>
    // </div>
  )
}

export default Adcard