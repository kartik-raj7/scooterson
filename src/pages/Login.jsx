import React from 'react'
import AuthComp from '../components/authpage/Signup'
import {motion} from 'framer-motion'
import Layout from '../utils/ui/Layout'
import LoginComponent from '../components/authpage/Login'
const Login = () => {
  return (
    <motion.main 
     initial={{opacity:0}}
     animate={{opacity:1}}
     exit={{opacity:0}}
     transition={{duration:0.75,ease:"easeOut"}}
     >
     <Layout>
        <LoginComponent/>
     </Layout>
     </motion.main>
    
  )
}

export default Login