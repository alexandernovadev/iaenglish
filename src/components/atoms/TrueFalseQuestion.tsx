import React from "react";
import { Question } from "./props";
import { AlertsResponse } from "./AlertsResponse";

interface Props {
  question: Question;
  onChange: (option: boolean) => void;
}

const TrueFalseQuestion = ({
  question: { title, htmlContent, feedback },
  onChange,
}: Props) => {
  return (
    <div className="bg-slate-700 p-4 rounded-lg">
      <h2 className="text-white text-lg mb-2">{title}</h2>
      <p>{htmlContent}</p>
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
      {feedback && <AlertsResponse feedback={feedback} status="correct" />}

    </div>
  );
};

export default TrueFalseQuestion;
