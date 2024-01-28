import React, { useEffect, useState } from 'react';
import { convertBase64, openNotificationWithIcon } from '../../utils/utils';
import { axiosGet, axiosPost } from '../../services/Api/axios';
import { apiRouter } from '../../services/ApiRouter';
import { List, Card, Image, Row, Col, Button, Modal, Upload, message } from 'antd';
import { UploadOutlined, CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import style from '../../styles/dashboard.module.scss';

const Contentcreatordashboard = () => {
  const [myMedia, setMyMedia] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading,setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const getContents = async () => {
    const getMediaUrl = apiRouter.GET_MEDIA;
    try {
      const myContentresponse = await axiosGet(
        getMediaUrl,
        {},
        'application/json',
      );
      if (myContentresponse.status) {
        setMyMedia(myContentresponse.data);
      } else {
        openNotificationWithIcon('error', myContentresponse.message);
      }
    } catch (error) {
      openNotificationWithIcon('error', 'Something went wrong');
    }
  };
  const uploadContent = async () => {
    console.log('calling to upload')
    const getMediaUrl = apiRouter.UPLOAD_MEDIA;
    var multimedia = {
        ad_multimedia:selectedImage
    }
    try {
      const myContentresponse = await axiosPost(
        getMediaUrl,
        multimedia,
        'application/json',
        null,
        'get'
      );
      if (myContentresponse.status) {   
        openNotificationWithIcon('success', 'Image Uploaded Successfully');
        getContents();
        setIsModalVisible(false);
        setLoading(false);
      } else {
        openNotificationWithIcon('error', myContentresponse.message);
        setIsModalVisible(false);
        setLoading(false);
      }
    } catch (error) {
      openNotificationWithIcon('error', 'Something went wrong');
      setIsModalVisible(false);
      setLoading(false);
    }

  };

  useEffect(() => {
    getContents();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedImage(null)
  };

  const handleDone = () => {
    if (selectedImage) {
        uploadContent(selectedImage);
        setLoading(true);
        setSelectedImage(null);
  };}
  const uploadMultimedia = async (event) => {
    const files = event.fileList;
    const isImageOrVideo = files[0].originFileObj.type.startsWith('image/') || files[0].originFileObj.type.startsWith('video/');
    if(!isImageOrVideo){
        message.error('You can only upload images and videos!');
        return ;
    }  
     if (files.length === 1) {
      const base64 = await convertBase64(files[0].originFileObj);
      setSelectedImage(base64);
    //   uploadContent(base64);
      return;
    }
    // const base64s = [];
    // for (var i = 0; i < files.length; i++) {
    //   var base = await convertBase64(files[i]);
    //   base64s.push(base);
    // }
    // uploadMultipleImages(base64s);
  };

  return (
    <div className={style.contentcreatordashboard}>
      <div className={style.mymediacontainer}>
        <Row className={style.mymediaheadingdiv}>
          <Col span={14} className={style.mymediaheading}>My Media</Col>
          <Col span={10} className={style.mymediabtndiv}>
            <Button className={style.addmediabtn} onClick={showModal}>
              Add
            </Button>
          </Col>
        </Row>
        <List
          dataSource={myMedia}
          grid={{ gutter: 20, column: 4 }}
          className={style.mymedialist}
          renderItem={(data, index) => (
            data.resource_type === 'video'?<List.Item key={index}>
                    <Card>
                      <video controls width="100%">
                        <source src={data.url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </Card>
                  </List.Item>
                 :
                  <List.Item key={index}>
                    <Card cover={<Image src={data.url} preview={false} />} style={{ width: 160 }}>
                    </Card>
                  </List.Item>
          )}
        />
      </div>

      {/* Modal for Upload */}
      <Modal
        title="Upload Media"
        open={isModalVisible}
        onCancel={handleCancel}
        destroyOnClose={true}
        footer={[
          <Button key="cancel" icon={<CloseCircleOutlined />} onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="done" type="primary" icon={<CheckCircleOutlined />} onClick={handleDone} loading={loading}>
            Done
          </Button>,
        ]}
      >
        <Upload onChange={uploadMultimedia} disabled={loading}>
          <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload>
      </Modal>
    </div>
  );
};

export default Contentcreatordashboard;
