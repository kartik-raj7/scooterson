import React from 'react'
import Transition from '../utils/ui/Transition'
import { useLocation } from 'react-router-dom';
import { Image } from 'antd';
import style from '../styles/viewadindetail.module.scss'
const Viewadindetail = () => {
  const { state } = useLocation();
  console.log(state)
  return (
    <>
    <Transition>
        <div className={style.viewad}>
          <div className={style.viewaddiv}>
          {state.ad_multimedia.includes("mp4")?(
             <video controls width="100%">
             <source src={state.ad_multimedia} type="video/mp4" />
             Your browser does not support the video tag.
           </video>
         ) : (
        <Image src={state.ad_multimedia} preview={false}/>
         )}
        <div className={style.ad_headline}>{state.ad_headline}</div>
        <div className={style.ad_detail}>{state.ad_detail}</div>
        <div className={style.ad_description}>{state.ad_description}</div>
        <div className={style.ad_scheduled_time}>{state.ad_scheduled_time}</div>
        <div className={style.ad_creator}>{state.ad_creator}</div>
        </div>
        </div>
    </Transition>
    </>
  )
}

export default Viewadindetail