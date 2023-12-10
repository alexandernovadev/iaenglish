import React from "react";

interface TrueFalseQuestionProps {
  title: string;
  onChange: (value: boolean) => void;
}

const TrueFalseQuestion: React.FC<TrueFalseQuestionProps> = ({
  title,
  onChange,
}) => {
  return (
    <div className="bg-slate-700 p-4 rounded-lg">
      <h2 className="text-white text-lg mb-2">{title}</h2>
      <div>
        <label className="block mb-2">
          <input
            type="radio"
            name="trueFalse"
            value="true"
            onChange={() => onChange(true)}
            className="mr-2"
          />
          True
        </label>
        <label className="block mb-2">
          <input
            type="radio"
            name="trueFalse"
            value="false"
            onChange={() => onChange(false)}
            className="mr-2"
          />
          False
        </label>
      </div>
    </div>
  );
};

export default TrueFalseQuestion;
