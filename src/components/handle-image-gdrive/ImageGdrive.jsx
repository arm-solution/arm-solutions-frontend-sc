import React, { useState } from 'react'

const ImageGdrive = (props) => {
  
  const [imageUrl, setImageUrl] = useState(props.src)

  const handleImageError = () => {
    setImageUrl(props.fallbackSrc)
  }

  return (
    <img src={imageUrl} className="card-img-top" onError={handleImageError} alt="..." />
  )
}

export default ImageGdrive