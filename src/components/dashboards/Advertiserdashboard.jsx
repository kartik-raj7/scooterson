import React, { useEffect, useState } from 'react';
import { List, Card, Button, Space, Row, Image, Col, Modal } from 'antd';
import { apiRouter } from '../../services/ApiRouter';
import { openNotificationWithIcon } from '../../utils/utils';
import { axiosDelete, axiosGet } from '../../services/Api/axios';
import { Link, useNavigate } from 'react-router-dom';
import { RiEdit2Line, RiDeleteBinLine } from 'react-icons/ri';
import { TbDeviceAnalytics } from "react-icons/tb";
import style from '../../styles/dashboard.module.scss'
import { IoIosAddCircleOutline } from "react-icons/io";
import {motion} from 'framer-motion'
const Advertiserdashboard = () => {
  const navigate = useNavigate();
  const [ads, setAds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adtodelete,setAdToDelete] = useState(null);
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
  const viewAnalytics = (ad)=>{
    navigate(`/adanalytics/id=${ad?._id}`, { state: ad });
  }
  const handleDelete = (adId) => {
     showModal();
     setAdToDelete(adId);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    deleteAd(adtodelete);
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setAdToDelete(null);
  };
  return (
    <div className={style.advertiserdashboard}>
    <div className={style.advertiserdashboardcomp}>
      <Row className={style.advertiserdashboardheadingdiv}>
      <Row className={style.advertiserdashboardheading}>My Ads</Row>
      <Link to='/postad'><Button className={style.postadbtn}><IoIosAddCircleOutline style={{color:'#7336fe',paddingRight:'6px'}}/>Post new Ad</Button></Link>
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
                <Button type="ghost" icon={<RiEdit2Line style={{color:'black'}}/>} onClick={() => handleEdit(ad)}  className={style.adactionbtn}>
                  Edit
                </Button>
                <Button type="danger" icon={<RiDeleteBinLine style={{color:'black'}}/>} onClick={() => handleDelete(ad._id)}  className={style.adactionbtn}>
                  Delete
                </Button>
                <Button type="danger" icon={<TbDeviceAnalytics style={{color:'black'}}/>} onClick={() => viewAnalytics(ad)}  className={style.adactionbtn}>
                  Analytics
                </Button>
              </Row>
              <Row style={{display:'flex',justifyContent:'center'}}><Col className={style.advertisermultimediacontainer}>
              {ad.ad_multimedia.includes('mp4')? <video controls width="100%" autoPlay={true} className={style.advertiseradsvideo}>
                        <source src={ad.ad_multimedia} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>:
              <Image src={ad.ad_multimedia} className={style.advertiseradsimage}/>
               }
              </Col></Row>
              <h3 className={style.advertiserad}>{ad.ad_headline}</h3>
              <p className={style.advertiseraddetail}>{ad.ad_description}</p>
              <Space className={style.adtimeperiod}>
                <span><span style={{color:'white',fontWeight:'bold',paddingRight:'5px'}}>Scheduled Time:</span> <span>{ad.ad_scheduledtime.slice(0,10)}</span></span>
                <span><span style={{color:'white',fontWeight:'bold',paddingRight:'5px'}}>Expiration Time:</span> <span>{ad.ad_expirationtime.slice(0,10)}</span></span>
              </Space>
            </Card>
          </List.Item>
          </motion.div>
        )}
      />
      </Row>
      <Modal title="Delete ad" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                Are you sure you want to delete this ad?
              </Modal>
      </div>
    </div>
  );
};

export default Advertiserdashboard;
