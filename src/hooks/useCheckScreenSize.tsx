import { useEffect, useState } from 'react';

export const useCheckScreenSize = () => {
  const [screenSize, setScreenSize] = useState<number>(window.innerWidth);

  const handleResize = () => {
    if (window.innerWidth) {
      setScreenSize(window.innerWidth);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return screenSize;
};
