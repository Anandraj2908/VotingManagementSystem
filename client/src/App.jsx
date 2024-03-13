import { useState, useEffect } from 'react'
import {useDispatch } from 'react-redux'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import './App.css'
import { Outlet } from 'react-router-dom'
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"

function App() {

  return (
    <div className="h-screen  flex flex-col justify-between">
      <Header/>
      <Outlet />
      <Footer/>
    </div>
      
  
  )
}

export default App
