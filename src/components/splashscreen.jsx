import React, { useEffect, useState } from "react";
import './splashscreen.css';
import LoadScreen from '.././assets/LoadScreen.jpg'

const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    isVisible && (
      <div className="splash-screen">
        <img src={LoadScreen} className="splash-image" />
      </div>
    )
  );
};
  
export default SplashScreen;