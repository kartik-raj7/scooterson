import React from 'react'
import style from '../../styles/homepage.module.scss'
import { Button, Carousel, Col, Image, Row, Space } from 'antd'
const Herosection = () => {
  return (
    <div className={style.herostyle}>
    <div className={style.herodiv}>
    <Row>
    <Col className={style.leftsidehero} span={12}>
    <div className={style.heroheading}>Lorem ipsum dolor</div>
        <div className={style.herosubheading}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero provident mollitia temporibus id dicta accusantium quibusdam, quas nam tempore maxime ullam consectetur ad sapiente at debitis itaque quia adipisci ipsum!</div>
        <Space className={style.authbtns}>
            <Button className={style.registerbtn}>Register</Button>
            <Button className={style.loginbtn}>Sign In</Button>
        </Space>
        
       </Col>
    <Col className={style.rightsidehero} span={12}>
        <div className={style.rightsidecarouseldiv}>
        <Carousel autoplay>
            {/* <div><Image src='../../../ad1r.png' preview={false} className={style.carouselimage}/></div> */}
            <div><Image src='../../../ad5r.png' preview={false} className={style.carouselimage}/></div>
            {/* <div><Image src='../../../ad3r.png' preview={false} className={style.carouselimage}/></div> */}
        </Carousel>
        </div>
    </Col>
    </Row>
    </div>
    
    </div>
  )
}

export default Herosection