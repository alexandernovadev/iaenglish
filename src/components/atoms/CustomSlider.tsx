import React, { useState, useRef, useCallback } from "react";

interface CustomSliderProps {
  min: number;
  max: number;
  onChange: (value: number) => void;
}

const CustomSlider: React.FC<CustomSliderProps> = ({ min, max, onChange }) => {
  const [value, setValue] = useState<number>(min);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const calculateValue = useCallback(
    (clientX: number) => {
      if (!sliderRef.current) return;

      const rect = sliderRef.current.getBoundingClientRect();
      const newValue =
        (Math.min(Math.max(0, clientX - rect.left), rect.width) / rect.width) *
          (max - min) +
        min;
      setValue(newValue);
      onChange(newValue);
    },
    [min, max, onChange]
  );

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    calculateValue(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      calculateValue(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const thumbPosition = ((value - min) / (max - min)) * 100;

  return (
    <div
      ref={sliderRef}
      className="mx-2 w-[200px] bg-gray-200 h-2 cursor-pointer relative rounded-lg"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // Para manejar casos en los que el mouse sale del slider mientras arrastra
    >
      <div
        className="absolute bg-blue-500 h-2"
        style={{ width: `${thumbPosition}%` }}
      ></div>
      <div
        className="absolute w-6 h-6 bg-green-500 rounded-full"
        style={{ left: `${thumbPosition}%`, transform: "translateX(-50%)" ,top:'-7px'}}
      ></div>
    </div>
  );
};

export default CustomSlider;
