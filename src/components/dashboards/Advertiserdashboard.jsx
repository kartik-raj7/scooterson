import React, { useEffect, useState } from 'react';
import { List, Card, Button, Space, Row, Image, Col } from 'antd';
import { apiRouter } from '../../services/ApiRouter';
import { openNotificationWithIcon } from '../../utils/utils';
import { axiosDelete, axiosGet } from '../../services/Api/axios';
import { Link, useNavigate } from 'react-router-dom';
import { RiEdit2Line, RiDeleteBinLine } from 'react-icons/ri';
import style from '../../styles/dashboard.module.scss'
import {motion} from 'framer-motion'
const Advertiserdashboard = () => {
  const navigate = useNavigate();
  const [ads, setAds] = useState([]);

  const getMyAds = async () => {
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
  const deleteAd= async(id)=>{
    const getMediaUrl = `${apiRouter.AD}/${id}`;
    try {
      const myContentresponse = await axiosDelete(
        getMediaUrl,
        {},
        'application/json',
      );
      if (myContentresponse.status) {
         openNotificationWithIcon('success','Add deleted successfully')
         getMyAds();
      } else {
        openNotificationWithIcon('error', myContentresponse.message);
      }
    } catch (error) {
      openNotificationWithIcon('error', 'Something went wrong');
    }
  }
  useEffect(() => {
    getMyAds();
  }, []);

  const handleEdit = (ad) => {
      navigate(`/editad/id=${ad?._id}`, { state: ad });
    };

  const handleDelete = (adId) => {
    deleteAd(adId);
  };

  return (
    <div className={style.advertiserdashboard}>
    <div className={style.advertiserdashboardcomp}>
      <Row className={style.advertiserdashboardheadingdiv}>
      <Row className={style.advertiserdashboardheading}>My Ads</Row>
      <Link to='/postad'><Button className={style.postadbtn}>Post new Ad</Button></Link>
      </Row>
      <Row className={style.advertiserdashboardlist}>
      <List
        className={style.advertiserdashboardlist}
        dataSource={ads}
        renderItem={(ad, index) => (
          <motion.div
          className="card"
          initial={{
            opacity: 0,
            x: index % 2 === 0 ? 50 : -50
          }}
          whileInView={{
            opacity: 1,
            x: 0, 
            transition: {
              duration: 1 
            }
          }}
          viewport={{ once: true }}
        >
          <List.Item className={style.advertiserdashboardlistitem}>
            <Card className={style.advertiserdashboardlistcard}>
            <Row className={style.adactionbtns}>
                <Button type="primary" icon={<RiEdit2Line />} onClick={() => handleEdit(ad)}>
                  Edit
                </Button>
                <Button type="danger" icon={<RiDeleteBinLine style={{color:'red'}}/>} onClick={() => handleDelete(ad._id)}>
                  Delete
                </Button>
              </Row>
              <Row style={{display:'flex',justifyContent:'center'}}><Col>
              {ad.ad_multimedia.includes('mp4')? <video controls width="100%">
                        <source src={ad.ad_multimedia} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>:
              <Image src={ad.ad_multimedia} className={style.advertiseradsimage}/>
               }
              </Col></Row>
              <h3>{ad.ad_headline}</h3>
              <p>{ad.ad_detail}</p>
              <Space>
                <span>{`Scheduled Time: ${ad.ad_scheduledtime}`}</span>
                <span>{`Expiration Time: ${ad.ad_expirationtime}`}</span>
              </Space>
            </Card>
          </List.Item>
          </motion.div>
        )}
      />
      </Row>
      </div>
    </div>
  );
};

export default Advertiserdashboard;
