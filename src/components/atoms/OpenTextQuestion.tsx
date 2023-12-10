import React from "react";

interface OpenTextQuestionProps {
  title: string;
  onChange: (value: string) => void;
}

const OpenTextQuestion: React.FC<OpenTextQuestionProps> = ({
  title,
  onChange,
}) => {
  return (
    <div className="bg-slate-700 p-4 rounded-lg">
      <h2 className="text-white text-lg mb-2">{title}</h2>
      <textarea
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 rounded-lg bg-slate-700"
      ></textarea>
    </div>
  );
};

export default OpenTextQuestion;
