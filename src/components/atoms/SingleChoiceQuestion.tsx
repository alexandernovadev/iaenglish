import React from "react";

interface SingleChoiceQuestionProps {
  title: string;
  options: string[];
  onChange: (value: string) => void;
}

const SingleChoiceQuestion: React.FC<SingleChoiceQuestionProps> = ({
  title,
  options,
  onChange,
}) => {
  return (
    <div className="bg-slate-700 p-4 rounded-lg">
      <h2 className="text-white text-lg mb-2">{title}</h2>
      <div>
        {options.map((option) => (
          <label key={option} className="block mb-2">
            <input
              type="radio"
              name="singleChoice"
              value={option}
              onChange={() => onChange(option)}
              className="mr-2"
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

export default SingleChoiceQuestion;
