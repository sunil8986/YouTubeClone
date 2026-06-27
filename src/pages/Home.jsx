import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Video from '../components/Video'

const Home = () => {

  const [categ, setCateg] = useState(0);
    
  return (
    <div className="flex relative">
      <Navbar categ={categ} setCateg={setCateg} />
      <Video categ={categ} />
    </div>
  )
}

export default Home