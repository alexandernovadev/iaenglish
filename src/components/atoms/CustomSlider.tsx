import React, { useEffect, useRef, useState } from "react";

interface CustomSliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
}

const CustomSlider: React.FC<CustomSliderProps> = ({
  min,
  max,
  value,
  onChange,
}) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const calculateValue = (clientX: number) => {
    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const relativeX = Math.min(Math.max(0, clientX - rect.left), rect.width);
    const newValue = (relativeX / rect.width) * (max - min) + min;
    return newValue;
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    const newValue = calculateValue(e.clientX);
    onChange(newValue!);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      const newValue = calculateValue(e.clientX);
      onChange(newValue!);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const thumbPosition = ((value - min) / (max - min)) * 100;

  return (
    <div
      ref={sliderRef}
      className="mx-3 w-[200px] bg-gray-200 h-2 cursor-pointer relative rounded-lg"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        className="absolute bg-blue-500 h-2"
        style={{ width: `${thumbPosition}%` }}
      ></div>
      <div
        className="absolute w-6 h-6 bg-green-500 rounded-full"
        style={{
          left: `${thumbPosition}%`,
          transform: "translateX(-50%)",
          top: "-7px",
        }}
      ></div>
    </div>
  );
};

export default CustomSlider;
