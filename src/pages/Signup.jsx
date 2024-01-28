
import React from 'react'
import AuthComp from '../components/authpage/Signup'
import {motion} from 'framer-motion'
import Layout from '../utils/ui/Layout'
import Transition from '../utils/ui/Transition'
const Signup = () => {
  return (
   <Transition>
     <Layout>
        <AuthComp/>
     </Layout>
     </Transition>
    
  )
}

export default Signup