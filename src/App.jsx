
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Navbar from './components/common/Navbar.jsx'
import './App.css'

function App() {
  

  return (
    <>
      <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </>
  )
}

export default App
