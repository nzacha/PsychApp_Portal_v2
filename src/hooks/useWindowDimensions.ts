import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

function getWindowDimensions() {
  const { innerWidth: windowWidth, innerHeight: windowHeight } = window;
  return {
    windowWidth,
    windowHeight
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const dispatch = useDispatch();
  
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch]);

  return {...windowDimensions, isSmallScreen: windowDimensions.windowWidth <= 600, isMediumScreen: windowDimensions.windowWidth <= 1000, isLargeScreen: windowDimensions.windowWidth > 1000};
}