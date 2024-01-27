import React, { useState } from "react";
import { FaCircleCheck, FaCircleUp, FaCircleXmark } from "react-icons/fa6";
import { MdOutlineSmartToy } from "react-icons/md";
import { FeedBack } from "../ui/FeedBack";

interface OpenAnswerProps {
  onChange: (answer: string) => void;
  title: string;
}

export const OpenAnswer: React.FC<OpenAnswerProps> = ({ onChange, title }) => {
  const [answer, setAnswer] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(event.target.value);
    onChange(event.target.value); // Notificar al componente padre
  };

  return (
    <div className="border border-gray-200 p-2 rounded-2xl my-3">
      <h1 className="text-3xl font-semibold mb-1 text-white">{title}</h1>
      <span className="text-white-800 text-sm">Open answer</span>
      <textarea
        className="w-full p-2 mt-2 text-white bg-gradient-to-r from-gray-800 to-gray-900 border border-blue-200 rounded-xl focus:bg-blue-500 focus:outline-none"
        value={answer}
        rows={4}
        onChange={handleChange}
        placeholder="Write somethig coherent here :D"
      />

      <FeedBack status={"WELLDONE"} />
    </div>
  );
};
