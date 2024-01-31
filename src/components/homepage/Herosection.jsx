import React from 'react'
import style from '../../styles/homepage.module.scss'
import { Button, Carousel, Col, Image, Row, Space } from 'antd'
import {motion} from 'framer-motion'
import { Link } from 'react-router-dom'
const Herosection = () => {
  const text = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero provident mollitia temporibus id dicta accusantium quibusdam, quas nam tempore maxime ullam consectetur ad sapiente at debitis itaque quia adipisci ipsum!".split(" ");
  return (
    <div className={style.herostyle}>
    <div className={style.herodiv}>
    <Row >
    <Col className={style.leftsidehero} xs={24} lg={12}>
    <div className={style.heroheading}>One Stop for all advertising needs</div>
    <div className={style.herosubheading}>
    {text.map((el, i) => (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.25,
            delay: i / 10,
          }}
          key={i}
        >
          {el}{" "}
        </motion.span>
      ))}</div>
        <Space className={style.authbtns}>
        <Link to='/signup'>
        <motion.button whileTap={{ scale: 0.85 }} className={style.registerbtn}>
          
            Register
            
            </motion.button>
            </Link>
            <Link to='/login'>
            <motion.button whileTap={{ scale: 0.85 }} className={style.loginbtn}>
            Sign In
            </motion.button>
            </Link>
        </Space>
        
       </Col>
    <Col className={style.rightsidehero} xs={24} lg={12}>
        <div className={style.rightsidecarouseldiv}>
        {/* <Carousel autoplay>
            <div><Image src='../../../ad1r.png' preview={false} className={style.carouselimage}/></div> 
            <div><Image src='../../../ad5r.png' preview={false} className={style.carouselimage}/></div>
            <div><Image src='../../../ad3r.png' preview={false} className={style.carouselimage}/></div>
        </Carousel> */}
        <motion.img
            src="../../../ad5r.png"
            alt="Moving Image"
            className={style.carouselimage}
            initial={{ y: 0 }}
            animate={{
              y: [0, 30, 0], // Values for y position: start, middle, end
            }}
            transition={{
              repeat: Infinity, // Loops the animation indefinitely
              duration: 3, // Duration of each animation cycle
              ease: "easeInOut", // Easing function for smoother animation
            }}
            // whileHover={{
            //   scale: 1.1,
            //   transition: { duration: 1 },
            // }}
            // whileTap={{ scale: 0.9 }}
          />
        </div>
    </Col>
    </Row>
    </div>
    
    </div>
  )
}

export default Herosection