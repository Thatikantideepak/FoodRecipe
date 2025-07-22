import React from 'react'
import NavBar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
function MainNavigation() {
  return (
    <>
        <NavBar/>
        <Outlet/>
        <Footer/>
    </>
  )
}

export default MainNavigation
