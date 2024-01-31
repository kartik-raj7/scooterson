import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  DatePicker,
  Button,
  Select,
  message,
  Upload,
  Row,
  Col,
  Image,
  Modal,
} from "antd";
import { GrAddCircle, GrUpload } from "react-icons/gr";
import {
  UploadOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import style from "../../styles/postad.module.scss";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { apiRouter } from "../../services/ApiRouter";
import { axiosGet, axiosPatch, axiosPost } from "../../services/Api/axios";
import { convertBase64, openNotificationWithIcon } from "../../utils/utils";
const { TextArea } = Input;
const { Option } = Select;

const AdForm = ({data,type}) => {
console.log(data)
  const { RangePicker } = DatePicker;
  const [form] = Form.useForm();
  const [myMedia, setMyMedia] = useState([]);
  const [selectedMediaType, setSelectedMediaType] = useState("existing");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadMedia, setUploadMedia] = useState(null);
  const [selectexisitingmedia,setSelectExistingMedia] = useState(type=='edit'?data:null);
  const [prefilleddates,setPrefilledDates] = useState();
  useEffect(()=>{
      if(type=='edit'){
        form.setFieldsValue({
            ad_multimedia: data.ad_multimedia,
            ad_headline:data.ad_headline,
            ad_detail:data.ad_detail,
            ad_description:data.ad_description,
            ad_location:data.ad_location,
            ad_scheduledtime: [dayjs(data.ad_scheduledtime),dayjs(data.ad_expirationtime)]
          });
      }
  },[])
//   form.setFieldsValue({
//     ad_scheduledtime:[moment(data.ad_scheduledtime), moment(data.ad_expirationtime)]
//   })
  const navigate = useNavigate();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    if(type!='edit'){
    setUploadMedia(null);
    setSelectExistingMedia(null)
    }
  };
  console.log('data=',selectexisitingmedia)
  const getContents = async () => {
    const getMediaUrl = apiRouter.GET_MEDIA;
    try {
      const myContentresponse = await axiosGet(
        getMediaUrl,
        {},
        "application/json"
      );
      if (myContentresponse.status) {
        setMyMedia(myContentresponse.data);
      } else {
        openNotificationWithIcon("error", myContentresponse.message);
      }
    } catch (error) {
      openNotificationWithIcon("error", "Something went wrong");
    }
  };
  useEffect(() => {
    getContents();
  }, []);
  const disabledDate = (current) => {
    return current && current < dayjs().endOf('day');
  };
  const onFinish = async (values) => {
    const postadUrl = apiRouter.POST_AD;
    var reqdata={
      ad_headline:values.ad_headline,
      ad_detail:values.ad_detail,
      ad_description:values.ad_description,
      ad_scheduledtime:values.ad_scheduledtime[0]['$d'],
      ad_expirationtime:values.ad_scheduledtime[1]['$d'],
      ad_location:values.ad_location
    }
    if(values.ad_multimedia.includes('http')){
      reqdata = {
        ...reqdata,ad_url:values.ad_multimedia,
      }
    }
    else{
      reqdata = {
        ...reqdata,ad_multimedia:values.ad_multimedia,
      }
    }
    setLoading(true);
    if(type=='edit'){
        try {
            const postMediaResponse = await axiosPatch(
              `${apiRouter.AD}/${data._id}`,
              reqdata,
              'application/json',
            );
      
            if (postMediaResponse.status === "success") {
              openNotificationWithIcon("success", "Ad editted successfully");
              setLoading(false);
              navigate('/dashboard')
            } else {
              openNotificationWithIcon("error", postMediaResponse.message);
              setLoading(false);
            }
          } catch (error) {
            openNotificationWithIcon("error", "Something went wrong");
            setLoading(false);
          }
    }
    else{
    try {
      const postMediaResponse = await axiosPost(
        postadUrl,
        reqdata,
        'application/json',
        null,
        'get'
      );

      if (postMediaResponse.status === "success") {
        openNotificationWithIcon("success", "Ad posted successfully");
        setLoading(false);
        navigate('/dashboard')
      } else {
        openNotificationWithIcon("error", postMediaResponse.message);
        setLoading(false);
      }
    } catch (error) {
      openNotificationWithIcon("error", "Something went wrong");
      setLoading(false);
    }}
  };
  const uploadMultimedia = async (event) => {
    const files = event.fileList;
    const isImageOrVideo =
      files[0].originFileObj.type.startsWith("image/") ||
      files[0].originFileObj.type.startsWith("video/");
    if (!isImageOrVideo) {
      message.error("You can only upload images and videos!");
      return;
    }
    if (files.length === 1) {
      const base64 = await convertBase64(files[0].originFileObj);
      setUploadMedia(base64);
      setSelectExistingMedia(null)
      form.setFieldsValue({
        ad_multimedia: uploadMedia
      });
      return;
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const selectExistingMedia = (media)=>{
     console.log(media);
     setSelectExistingMedia(media)
     setUploadMedia(null)
     form.setFieldsValue({
      ad_multimedia: media.url
    });
  }
  return (
    <div>
      <Row className={style.postad}>
        {/* <div className={style.postadform}> */}
        <Col xs={24} lg={12}>
          <Image
            src="/postad.png"
            className={style.postadimage}
            preview={false}
          />
        </Col>
        <Col xs={24} lg={12} className={style.postadformdiv}>
          <Row className={style.postadheading}>{type?"Edit Ad":"Post Ad"}</Row>
          <Form
            form={form}
            name="postAdForm"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className={style.postadform}
            layout="vertical"
            disabled={loading}
            // style={{width:'100%'}}
          >
            <Form.Item
              label="Ad Headline"
              name="ad_headline"
              rules={[
                { required: true, message: "Please enter the ad headline" },
              ]}
              className="postadformitem"
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Ad Multimedia"
              name="ad_multimedia"
              rules={[
                {
                  required: true,
                  message: "Please select or upload the ad multimedia",
                },
              ]}
                className="postadformitem"
            >
              <Button onClick={showModal}>
                <GrAddCircle />
              </Button>
              <Modal
                title="Multimedia Modal"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                className={style.multimediaselectionmodal}
                destroyOnClose={true}
              >
                <div className={style.multimediacontainer}>
                  <Upload
                    onChange={uploadMultimedia}
                    disabled={loading}
                    listType="picture"
                    className={style.multimediaupload}
                    beforeUpload={()=>{return false}}
                  >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </Upload>
                  {myMedia.map((media, ind) => (
                    <div key={ind} className={`${style.multimediadiv} ${selectexisitingmedia&&(selectexisitingmedia.url===media.url||selectexisitingmedia.ad_multimedia===media.url)&&style.selectedmultimedia}`} onClick={()=>selectExistingMedia(media)} >
                      {media.resource_type === "video" ? (
                        <video controls width="100%">
                          <source src={media.url} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <Image src={media.url} />
                      )}
                    </div>
                  ))}
                </div>
              </Modal>
            </Form.Item>

            <Form.Item
              label="Ad Detail"
              name="ad_detail"
              rules={[
                { required: true, message: "Please enter the ad detail" },
              ]}
                className="postadformitem"
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Ad Description"
              name="ad_description"
              rules={[
                { required: true, message: "Please enter the ad description" },
              ]}
                className="postadformitem"
            >
              <TextArea />
            </Form.Item>
            <Form.Item
              label="Ad Scheduled Time"
              name="ad_scheduledtime"
              rules={[
                { required: true, message: "Please select the scheduled time" },
              ]}
                className="postadformitem"
            >
              <RangePicker format="DD-MM-YYYY" disabledDate={disabledDate}/>
            </Form.Item>
            <Form.Item
              label="Ad Location"
              name="ad_location"
              rules={[
                { required: true, message: "Please select the ad location" },
              ]}
                className="postadformitem"
            >
              <Select>
                <Option value="Delhi">Delhi</Option>
                <Option value="Delhi">Gurgaon</Option>
                <Option value="Delhi">Mumbai</Option>
                <Option value="Delhi">Bangalore</Option>
                <Option value="Delhi">Noida</Option>
                <Option value="Delhi">Delhi</Option>
                {/* Add other location options as needed */}
              </Select>
            </Form.Item>

            <Form.Item className={style.posteditadbtndiv}>
              <Button type="primary" htmlType="submit" loading={loading} className={style.posteditadbtn}>
                {type=='edit'?"Edit ad":"Post Ad"}
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      {/* </div> */}
    </div>
  );
};

export default AdForm;
