
import React from 'react'
import AuthComp from '../components/authpage/Signup'
import {motion} from 'framer-motion'
import Layout from '../utils/ui/Layout'
const Signup = () => {
  return (
    <motion.main 
     initial={{opacity:0}}
     animate={{opacity:1}}
     exit={{opacity:0}}
     transition={{duration:0.75,ease:"easeOut"}}
     style={{height:'100vh'}}
     >
     <Layout>
        <AuthComp/>
     </Layout>
     </motion.main>
    
  )
}

export default Signup