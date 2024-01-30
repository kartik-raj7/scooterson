import { Image, Row } from 'antd'
import React from 'react'
import style from '../../styles/adcard.module.scss'
const Adcard = ({ad}) => {
  return (
    // <div className={style.feedbackcardwrapper}>
    <div className={style.adcard}>
        {ad.ad_multimedia.includes("mp4")?(
             <video controls width="100%">
             <source src={ad.ad_multimedia} type="video/mp4" />
             Your browser does not support the video tag.
           </video>
         ) : (
        <Image src={ad.ad_multimedia} preview={false} className={style.adimage}/>
         )}
        <Row className={style.adheadline}><span className={style.tapered}>{ad.ad_headline}</span></Row>
        <Row className={style.addetail}>{ad.ad_detail}</Row>
        <Row className={style.addescription}>{ad.ad_description}</Row>
    </div>
    // </div>
  )
}

export default Adcard