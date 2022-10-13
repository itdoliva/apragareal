import { useState, useEffect } from "react";
import * as d3 from 'd3';

const initState = { width: 0, height: 0, size: 0 }

const useContainerDimensions = (myRef) => {
    const getDimensions = () => !myRef.current 
      ? initState
      : {
        width: myRef.current.getBoundingClientRect().width, 
        height: myRef.current.getBoundingClientRect().height,
        size: d3.min([
          myRef.current.getBoundingClientRect().width,
          myRef.current.getBoundingClientRect().height
        ])
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