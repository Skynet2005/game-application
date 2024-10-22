import React, { useState, useEffect, useMemo } from 'react';
import RingLoader from 'react-spinners/RingLoader';

export default function Loader() {
  const colors = useMemo(
    () => ['#FF0000', '#00FF00', '#0000FF', '#FFC0CB', '#800080'],
    [],
  );
  const [currentColor, setCurrentColor] = useState(colors[0]);

  useEffect(() => {
    const updateColor = () => {
      const currentIndex = colors.indexOf(currentColor);
      const nextIndex = (currentIndex + 1) % colors.length;
      setCurrentColor(colors[nextIndex]);
    };

    const intervalId = setInterval(updateColor, 1000); // Change color every 1 second
    return () => {
      clearInterval(intervalId);
    };
  }, [currentColor, colors]);

  return (
    <div className="flex justify-center items-center">
      <RingLoader color={currentColor} size={375} />
    </div>
  );
}
