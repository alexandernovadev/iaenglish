import React, { useState } from "react";
import type { Question, Feedback } from "@/interfaces/Exam";
import { FeedBack } from "../ui/FeedBack";
interface MultipleChoiceQuestionProps {
  question: Question;
  onChange: (questionId: string, selectedOptions: string[]) => void;
  multiple?: boolean;
  feedback?: Feedback;
}

const MultipleUniqueOptions = ({
  question,
  onChange,
  multiple = false,
  feedback,
}: MultipleChoiceQuestionProps) => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleOnChange = (option: string) => {
    let newSelected: string[];

    if (multiple) {
      newSelected = selected.includes(option)
        ? selected.filter((item) => item !== option)
        : [...selected, option];
    } else {
      newSelected = selected.includes(option) ? [] : [option];
    }

    setSelected(newSelected);
    onChange(question.id, newSelected);
  };

  return (
    <div className="border border-gray-200 p-2 rounded-2xl my-3">
      <h1 className="text-xl my-3 text-white">{question.title}</h1>
      <span className="text-white-800 text-sm">
        {multiple ? "Multiple" : "Unique"} choice
      </span>

      <div className="flex flex-col">
        {question.options.map((option, index) => (
          <div
            key={index}
            className={`inline-flex items-center mt-3 border text-white border-blue-200 rounded-xl cursor-pointer ${
              selected.includes(option) ? "bg-gray-700" : ""
            }`}
            onClick={() => handleOnChange(option)}
          >
            <span className="ml-2 text-white">
              {String.fromCharCode(65 + index)}) {option}
            </span>
          </div>
        ))}
      </div>

      {feedback?.feedback && (
        <FeedBack status={feedback.status || "WELLDONE"} />
      )}
    </div>
  );
};

export default MultipleUniqueOptions;
