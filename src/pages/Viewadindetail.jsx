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
             <video controls width="100%" className={style.admultimedia}>
             <source src={state.ad_multimedia} type="video/mp4" />
             Your browser does not support the video tag.
           </video>
         ) : (
        <Image src={state.ad_multimedia} preview={false} className={style.admultimedia}/>
         )}
        <div className={style.adheadline}>{state.ad_headline}</div>
        <div className={style.addetail}>{state.ad_detail}</div>
        <div className={style.addescription}>{state.ad_description}</div>
        {/* <div className={style.adscheduled_time}>{state.ad_scheduled_time}</div> */}
        <div className={style.adcreator}><span className={style.postedby}>Posted By- </span><span>{state.ad_creator}</span></div>
        </div>
        </div>
    </Transition>
    </>
  )
}

export default Viewadindetail