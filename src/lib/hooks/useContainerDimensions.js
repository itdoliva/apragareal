import { useState, useEffect } from "react";

const initState = { width: 0, height: 0, size: 0 }

const useContainerDimensions = (ref) => {

    const [dimensions, setDimensions] = useState(initState)
    
    function handleResize() {
      if (!ref.current) return setDimensions(initState)

      const rect = ref.current.getBoundingClientRect()
      setDimensions({
        width: rect.width,
        height: rect.height,
        size: Math.min(rect.width, rect.height)
      })
    }
  
    // Any changes in ref element triggers getDimensions()
    useEffect(() => {
      if (ref.current) handleResize()

      window.addEventListener("resize", handleResize)
      return () => {
        window.removeEventListener("resize", handleResize)
      }
    }, [ref])
  
    return dimensions;
  }

export default useContainerDimensions