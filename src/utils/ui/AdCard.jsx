import { Image, Row } from 'antd'
import React from 'react'
import style from '../../styles/adcard.module.scss'
import { truncateWords } from '../utils'
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
        <Row className={style.addetail}>{truncateWords(ad.ad_detail,10)}</Row>
        <Row className={style.addescription}>{truncateWords(ad.ad_description,20)}</Row>
    </div>
    // </div>
  )
}

export default Adcard