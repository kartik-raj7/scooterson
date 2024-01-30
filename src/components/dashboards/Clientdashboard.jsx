import React, { useEffect, useState } from 'react'
import { apiRouter } from '../../services/ApiRouter';
import { axiosGet, axiosPost } from '../../services/Api/axios';
import { openNotificationWithIcon } from '../../utils/utils';
import style from '../../styles/dashboard.module.scss'
import Slider from 'react-slick';
import { isMobileOnly, isTablet } from 'react-device-detect';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css'
import Adcard from '../../utils/ui/AdCard';
import { Row } from 'antd';
import { useNavigate } from 'react-router-dom';
const Clientdashboard = () => {
  const navigate = useNavigate();
  const [ads,setAds] = useState([]);
const [currentSlide, setCurrentSlide] = useState(0)
const [slider1, setSlider1] = useState(null);
const [adview,setAdView] = useState(true);
useEffect(()=>{
  const data = {
    clicks:[{
      ad_id:ads[currentSlide]?._id,
      count:0,
    }],
    views:[{
      ad_id:ads[currentSlide]?._id,
      count:1,
    }],
  }
  updateClickandViews(ads[currentSlide]?._id,'Views',data);
},[currentSlide])
  const getAds = async () => {
    const getMediaUrl = apiRouter.GET_ADS;
    try {
      const myContentresponse = await axiosGet(
        getMediaUrl,
        {},
        'application/json',
      );
      if (myContentresponse.status) {
        setAds(myContentresponse.data);
      } else {
        openNotificationWithIcon('error', myContentresponse.message);
      }
    } catch (error) {
      openNotificationWithIcon('error', 'Something went wrong');
    }
  };
  const updateClickandViews = async (id,type,data) => {
    const updateMetricsUrl = apiRouter.ADD_METRICS;
    const clicksData={
      clicks:[{
        ad_id:id,
        count:1,
      }],
      views:[{
        ad_id:id,
        count:1,
      }],
    }
    if(type=='Clicks'){
       console.log(clicksData)
    }
    else{
       console.log(data)
    }
    try {
      const myContentresponse = await axiosPost(
        updateMetricsUrl,
        type=='Clicks'?clicksData:data,
        'application/json',
        null,
        'get'
      );
      if (myContentresponse.status) {
        console.log('update api called');
      } else {
        openNotificationWithIcon('error', myContentresponse.message);
      }
    } catch (error) {
      openNotificationWithIcon('error', 'Something went wrong');
    }
  };
  useEffect(()=>{
     console.log('fresh render');
      if(adview){
        getAds();
        setAdView(false);
      }
  },[adview])
  const slidesToShow = isMobileOnly ? 1 : isTablet ? 2 : 3;
  const viewAd = (data) => {
    updateClickandViews(data._id,'Clicks')
    navigate(`/viewad/id=${data?._id}`, { state: data });
  };

  const settings = {
    onReInit: () => setCurrentSlide(slider1?.innerSlider.state.currentSlide),
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    swipeToSlide: true,
  };

  return (
    <div className={style.clientdashboard}>
      <Row className={style.featuredads}>Featured ads</Row>
      <div className={style.adcarouseldiv}>
      <Slider {...settings} className={style.adcarousel}
                  ref={(slider) => setSlider1(slider)}
      >
        {ads?.map((data, index) => (
          <div key={index} onClick={()=>viewAd(data)} style={{cursor:'pointer'}}>
          <Adcard ad={data} />
          </div>
        ))}
      </Slider>
      </div>
    </div>
  );
};

export default Clientdashboard;