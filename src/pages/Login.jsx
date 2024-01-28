import React from 'react'
import AuthComp from '../components/authpage/Signup'
import {motion} from 'framer-motion'
import Layout from '../utils/ui/Layout'
import LoginComponent from '../components/authpage/Login'
import Transition from '../utils/ui/Transition'
const Login = () => {
  return (
     <Transition>
     <Layout>
        <LoginComponent/>
     </Layout>
     </Transition>
    
  )
}

export default Login