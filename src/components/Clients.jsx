import React, {useState,  useEffect } from 'react'
import backVid from './../assets/images/backVid.mp4'


const Clients = () => {

  return (
    <>
   
   <div className="video-background">
      <video autoPlay loop muted>
        <source src={backVid} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content-overlay">
        <h1>Welcome to My Website</h1>
        <p>This is some text overlaying the video background.</p>
      </div>
    </div>

    </>
  )
}

export default Clients