import React, { useState } from "react";

interface MultipleChoiceQuestionProps {
  onChange: (selectedOptions: string[]) => void;
  multiple?: boolean;
  questions: string[];
  title: string;
}

const MultipleUniqueOptions: React.FC<MultipleChoiceQuestionProps> = ({
  onChange,
  multiple = false,
  questions,
  title,
}) => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleOnChange = (question: string) => {
    let newSelected: string[];

    if (multiple) {
      newSelected = selected.includes(question)
        ? selected.filter((item) => item !== question)
        : [...selected, question];
    } else {
      newSelected = selected.includes(question) ? [] : [question];
    }

    setSelected(newSelected);
    // Send Singnal
    onChange(newSelected);
  };

  return (
    <div className="border border-gray-200 p-2 rounded-2xl p-3 my-3">
      <h1 className="text-3xl font-semibold mb-2 text-white">{title}</h1>
      <span className="text-white-800 text-sm">
        {multiple ? "Multiple" : "Unique"} choice
      </span>

      <div className="flex flex-col">
        {questions.map((question, index) => (
          <div
            key={index}
            className={`inline-flex items-center mt-3 border text-white border-blue-200 rounded-xl cursor-pointer ${
              selected.includes(question) ? "bg-gray-700" : ""
            }`}
            onClick={() => handleOnChange(question)}
          >
            <span className="ml-2 text-white">
              {String.fromCharCode(65 + index)}) {question}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultipleUniqueOptions;
