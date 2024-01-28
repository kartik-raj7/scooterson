import React from 'react'
import Herosection from '../components/homepage/Herosection'
import style from '../styles/homepage.module.scss'
import Layout from '../utils/ui/Layout'
import {motion} from "framer-motion"
import Transition from '../utils/ui/Transition'
const Homepage = () => {
  return (
    <>
    <Transition>
    <Layout>
    <Herosection/>
    </Layout>
    </Transition>
    </>
  )
}

export default Homepage