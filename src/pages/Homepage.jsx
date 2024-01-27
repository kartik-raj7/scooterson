import React from 'react'
import Herosection from '../components/homepage/Herosection'
import style from '../styles/homepage.module.scss'
import Layout from '../utils/ui/Layout'
import {motion} from "framer-motion"
const Homepage = () => {
  return (
    <>
     <motion.main 
     initial={{opacity:0}}
     animate={{opacity:1}}
     exit={{opacity:0}}
     transition={{duration:0.75,ease:"easeOut"}}
     className={style.homepage}
     >
    <Layout>
    <Herosection/>
    </Layout>
    </motion.main>
    </>
  )
}

export default Homepage