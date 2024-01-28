import React from 'react'
import Transition from '../utils/ui/Transition'
import Navbar from '../components/common/Navbar'
import { useLocation } from 'react-router-dom';
import { Image } from 'antd';
import style from '../styles/viewadindetail.module.scss'
const Viewadindetail = () => {
  const { state } = useLocation();
  console.log(state)
  return (
    <>
    <Transition>
        <Navbar/>
        <div className={style.viewad}>
          <div className={style.viewaddiv}>
        <Image src={state.ad_multimedia} preview={false}/>
        <div>{state.ad_headline}</div>
        <div>{state.ad_detail}</div>
        <div>{state.ad_description}</div>
        <div>{state.ad_scheduled_time}</div>
        <div>{state.ad_creator}</div>
        </div>
        </div>
    </Transition>
    </>
  )
}

export default Viewadindetail