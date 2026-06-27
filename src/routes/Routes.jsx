import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home.jsx'
import VideoDetail from '../pages/VideoDetail.jsx'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/video/:categ/:id" element={<VideoDetail />} />
        <Route path="/" element={<Home />} />
      </Routes>
  )
}

export default AllRoutes