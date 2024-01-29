import React from 'react'
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import style from '../../styles/homepage.module.scss'
const Layout = ({children}) => {
  return (
    <>
    {children}
    <Footer/>
    </>
  )
}

export default Layout