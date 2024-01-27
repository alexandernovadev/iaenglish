import React from "react";

import { AlertsResponse } from "./AlertsResponse";
import { Question } from "@/redux/examReducer/types";

interface Props {
  question: Question;
  onChange: (option: string) => void;
}
const OpenTextQuestion = ({
  question: { title, htmlContent, feedback,status ='skipped' },
  onChange,
}: Props) => {
  return (
    <div className="bg-slate-700 p-4 rounded-lg">
      <h2 className="text-white text-lg mb-2">{title}</h2>
      <p>{htmlContent}</p>
      <textarea
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 rounded-lg bg-slate-700 border border-white"
      ></textarea>

      {feedback && <AlertsResponse feedback={feedback} status={status} />}
    </div>
  );
};

export default OpenTextQuestion;
