import React from 'react'
import { useLocation } from 'react-router-dom';
import AnalyticsCard from '../utils/ui/AnalyticsCard';
import style from '../styles/analytics.module.scss'
import Transition from '../utils/ui/Transition';
const Adanalytics = () => {
  const { state } = useLocation();
  console.log(state);
  return (
    <>
    <Transition>
    <div className={style.analyticspage}>
        <div className={style.analyticscontainer}>
            <AnalyticsCard data={{ title: "Clicks", percentage: "45", metrics: state.metrics.ad_clicks }}/>
            <AnalyticsCard data={{ title: "Views", percentage: "37", metrics: state.metrics.ad_view }}/>
            <AnalyticsCard data={{ title: "Conversions", percentage: "0", metrics: state.metrics.ad_clicks/state.metrics.ad_view }}/>
        </div>
    </div>
    </Transition>
    </>
  )
}

export default Adanalytics