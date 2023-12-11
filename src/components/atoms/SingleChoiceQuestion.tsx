import React from "react";
import { Question } from "./props";
import { AlertsResponse } from "./AlertsResponse";

interface Props {
  question: Question;
  onChange: (option: string) => void;
}

const SingleChoiceQuestion = ({
  question: { title, htmlContent, options, answer, feedback },
  onChange,
}: Props) => {
  return (
    <div className="bg-slate-700 p-4 rounded-lg">
      <h2 className="text-white text-lg mb-2">{title}</h2>
      <p>{htmlContent}</p>
      <div>
        {options?.map((option) => (
          <label key={option} className="block mb-2">
            <input
              type="radio"
              name={`sq-|${title}`}
              value={option}
              onChange={() => onChange(option)}
              className="mr-2"
            />
            {option}
          </label>
        ))}
      </div>

      {feedback && <AlertsResponse feedback={feedback} status="correct" />}
    </div>
  );
};

export default SingleChoiceQuestion;
