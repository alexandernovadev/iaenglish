import React, { useState } from "react";
import { FeedBack } from "../ui/FeedBack";
import type { Feedback, Question } from "@/interfaces/Exam";

interface OpenAnswerProps {
  onChange: (questionId: string, answer: string) => void;
  question: Question;
  feedback?: Feedback;
}

export const OpenAnswer: React.FC<OpenAnswerProps> = ({
  onChange,
  question,
  feedback,
}) => {
  const [answer, setAnswer] = useState(question.userAnswer || "");

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(event.target.value);
    onChange(question.id, event.target.value);
  };

  return (
    <div className="border border-gray-200 p-2 rounded-2xl my-10">
      <h1 className="text-xl my-3 text-white">{question.title}</h1>
      <span className="text-white-800 text-sm">Open answer</span>
      <textarea
        className="w-full p-2 mt-2 text-white bg-gradient-to-r from-gray-800 to-gray-900 border border-blue-200 rounded-xl focus:bg-blue-500 focus:outline-none"
        value={answer}
        rows={4}
        onChange={handleChange}
        placeholder="Write somethig coherent here :D"
      />

      {feedback?.feedback && (
        <FeedBack
          status={feedback.status || "WELLDONE"}
          feedback={feedback.feedback}
        />
      )}
    </div>
  );
};
