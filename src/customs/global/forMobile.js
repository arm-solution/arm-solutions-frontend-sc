import { useEffect, useState} from 'react'

const checkWidth = () => {
    return window.innerWidth < 900;
  };
  
  export const useScreenWidth = () => {
    const [isWidth900, setIsWidth900] = useState(checkWidth());
  
    useEffect(() => {
      const handleResize = () => {
        setIsWidth900(checkWidth());
      };
  
      window.addEventListener('resize', handleResize); // Add event listener for window resize
  
      return () => {
        window.removeEventListener('resize', handleResize); // Clean up event listener on component unmount
      };
    }, []);
  
    return isWidth900;
  };



  