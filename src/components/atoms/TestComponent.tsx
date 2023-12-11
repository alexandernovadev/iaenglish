import React, { useState } from "react";
import SingleChoiceQuestion from "./SingleChoiceQuestion";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import TrueFalseQuestion from "./TrueFalseQuestion";
import OpenTextQuestion from "./OpenTextQuestion";
import answersGpt from "../../../public/califications_1.json";
interface Question {
  id: string;
  type: string;
  title: string;
  options?: string[];
}

interface TestComponentProps {
  questions: Question[];
}

const TestComponent = ({ questions }: TestComponentProps) => {
  const [answers, setAnswers] = useState<{ [key: string]: any }>({});
  const [questionData, setQuestionData] = useState(questions);

  const handleAnswerChange = (questionId: string, answer: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const renderQuestion = (question: Question) => {
    switch (question.type) {
      case "single_choice":
        return (
          <SingleChoiceQuestion
            question={question}
            onChange={(value) => handleAnswerChange(question.id, value)}
          />
        );
      case "multiple_choice":
        return (
          <MultipleChoiceQuestion
            question={question}
            onChange={(selected) => handleAnswerChange(question.id, selected)}
          />
        );
      case "true_false":
        return (
          <TrueFalseQuestion
            question={question}
            onChange={(value) => handleAnswerChange(question.id, value)}
          />
        );
      case "open_text":
        return (
          <OpenTextQuestion
            question={question}
            onChange={(value) => handleAnswerChange(question.id, value)}
          />
        );
      default:
        return null;
    }
  };

  const handleSubmit = () => {
    console.log("Final Answers:", answers);
    // First Gpt califica after i spread the answers and i get the feedback
    // After i re assign the feedback to the question, and i show the feedback
    const newRta = questions.map((question: any) => {
      const rtas = answersGpt.find((answer: any) => answer.id === question.id);
      const msgdefult =
        "We don't have feedback for this question . Im sorry My intelligence is limited. and i study english too.";

      return {
        ...question,
        feedback: rtas?.feedback || msgdefult,
        status: rtas?.status || "skipped",
      };
    });

    setQuestionData(newRta);
    console.log(newRta);
  };

  return (
    <div className="bg-slate-800 p-6 rounded-lg w-full">
      <h1 className="text-2xl text-white mb-4">
        B1 Level English Proficiency Test
      </h1>
      {questionData.map((question) => (
        <div key={question.id} className="mb-4">
          {renderQuestion(question)}
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white p-2 rounded-lg fixed right-8 top-8"
      >
        Submit
      </button>
    </div>
  );
};

export default TestComponent;
