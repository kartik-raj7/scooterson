import React from 'react'
import Navbar from '../components/homepage/Navbar'
import Herosection from '../components/homepage/Herosection'
import Footer from '../components/homepage/Footer'
import style from '../styles/homepage.module.scss'
const Homepage = () => {
  return (
    <><div className={style.homepage}>
    <Navbar/>
    <Herosection/>
    <Footer/>
    </div>
    </>
  )
}

export default Homepage