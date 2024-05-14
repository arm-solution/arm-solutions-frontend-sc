"use client"
import React from 'react';
import { FacebookProvider, CustomChat } from 'react-facebook';

const MessengerChat = () => {
  return (
    <>    
      <FacebookProvider appId="1591690274711942" chatSupport>
        <CustomChat pageId="285281771341965" minimized={true}/>
      </FacebookProvider> 
    </>
  )
}

export default MessengerChat