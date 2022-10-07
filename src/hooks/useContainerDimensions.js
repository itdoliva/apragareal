import { useState, useEffect } from "react";

const initState = { width: 0, height: 0 }

const useContainerDimensions = (myRef) => {
    const getDimensions = () => !myRef.current 
      ? initState
      : {
        width: myRef.current.offsetWidth, 
        height: myRef.current.offsetHeight 
      }
    

    const [dimensions, setDimensions] = useState(initState)
  
    useEffect(() => {
      const handleResize = () => {
        setDimensions(getDimensions())
      }
  
      if (myRef.current) {
        setDimensions(getDimensions())
      }
  
      window.addEventListener("resize", handleResize)
  
      return () => {
        window.removeEventListener("resize", handleResize)
      }
    }, [myRef])
  
    return dimensions;
  }

export default useContainerDimensions