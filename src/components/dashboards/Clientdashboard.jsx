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
  const updateClick = async (id) => {
    const getMediaUrl = apiRouter.ADD_METRICS;
    const data={
      clicks:[{
        ad_id:id,
        count:1,
      }],
      views:[{
        ad_id:id,
        count:1,
      }],
    }
    try {
      const myContentresponse = await axiosPost(
        getMediaUrl,
        data,
        'application/json',
        null,
        'get'
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
  useEffect(()=>{
      getAds();
  },[])
  const slidesToShow = isMobileOnly ? 1 : isTablet ? 2 : 3;
  const viewAd = (data) => {
    updateClick(data._id)
    navigate(`/viewad/id=${data?._id}`, { state: data });
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    swipeToSlide: true,
    // ...(isMobileOnly ? {} : { prevArrow: <CustomPrevArrow /> }),
    // ...(isMobileOnly ? {} : { nextArrow: <CustomNextArrow />}),
  };

  return (
    <div className={style.clientdashboard}>
      <Row className={style.featuredads}>Featured ads</Row>
      <div className={style.adcarouseldiv}>
      <Slider {...settings} className={style.adcarousel}>
        {ads.map((data, index) => (
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