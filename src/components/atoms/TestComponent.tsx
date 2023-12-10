import React from "react";
import SingleChoiceQuestion from "./SingleChoiceQuestion";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import TrueFalseQuestion from "./TrueFalseQuestion";
import OpenTextQuestion from "./OpenTextQuestion";

interface Question {
  id: string;
  type: string;
  title: string;
  options?: string[];
}

interface TestComponentProps {
  questions: Question[];
}

const TestComponent: React.FC<TestComponentProps> = ({ questions }) => {
  const [answers, setAnswers] = React.useState<{ [key: string]: any }>({});

  const handleAnswerChange = (questionId: string, answer: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const renderQuestion = (question: Question) => {
    switch (question.type) {
      case "single_choice":
        return (
          <SingleChoiceQuestion
            title={question.title}
            options={question.options!}
            onChange={(value) => handleAnswerChange(question.id, value)}
          />
        );
      case "multiple_choice":
        return (
          <MultipleChoiceQuestion
            title={question.title}
            options={question.options!}
            onChange={(selected) => handleAnswerChange(question.id, selected)}
          />
        );
      case "true_false":
        return (
          <TrueFalseQuestion
            title={question.title}
            onChange={(value) => handleAnswerChange(question.id, value)}
          />
        );
      case "open_text":
        return (
          <OpenTextQuestion
            title={question.title}
            onChange={(value) => handleAnswerChange(question.id, value)}
          />
        );
      default:
        return null;
    }
  };

  const handleSubmit = () => {
    console.log("Final Answers:", answers);
  };

  return (
    <div className="bg-slate-800 p-6 rounded-lg">
      <h1 className="text-2xl text-white mb-4">
        B1 Level English Proficiency Test
      </h1>
      {questions.map((question) => (
        <div key={question.id} className="mb-4">
          {renderQuestion(question)}
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white p-2 rounded-lg"
      >
        Submit
      </button>
    </div>
  );
};

export default TestComponent;
