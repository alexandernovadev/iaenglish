import MultipleUniqueOptions from "@/components/questions/MultipleUniqueOptions";
import { OpenAnswer } from "@/components/questions/OpenAnwser";
import type { Exam as ExamType } from "@/interfaces/Exam";
import { useState } from "react";

const Exam: ExamType = {
  id: "b2452hasr24",
  title: "Exam english relate to somethieng",
  difficulty: "HARD",
  level: "B2",
  score: 0,
  questions: [
    {
      id: "mul-88i7j7h",
      title: " By the time we arrive at the theater, the play __________ .",
      type: "MULTIPLE",
      options: ["has started", "will have started", "had started", "starts"],
      userAnswer: null,
      feedback: {
        feedback: null,
        status: null,
      },
      validations: {
        required: true,
      },
    },
    {
      id: "uni-whe45q45",
      title: "When something happens 'once in a blue moon', it happens.",
      type: "UNIQUE",
      options: ["has started", "will have started", "had started", "starts"],
      userAnswer: null,
      feedback: {
        feedback: null,
        status: null,
      },
      validations: {
        required: true,
      },
    },
    {
      id: "writr-3562",
      title:
        "Write a text min, 200 characters about the wheather use past tense and future",
      type: "OPENTEXT",
      options: [],
      userAnswer: null,
      feedback: {
        feedback: null,
        status: null,
      },
      validations: {
        max: 500,
        min: 200,
        required: true,
      },
    },
  ],
};

export default function Home() {
  const [exam, setExam] = useState<ExamType>(Exam);

  const handleAnswers = (questionId: string, userAnswer: string | string[]) => {
    setExam((prevExam) => {
      const updatedQuestions = prevExam.questions.map((question) => {
        if (question.id === questionId) {
          return { ...question, userAnswer };
        }
        return question;
      });

      return { ...prevExam, questions: updatedQuestions };
    });
  };

  const calificateExam = (e: any) => {
    e.preventDefault();

    const results = exam.questions.map((question) => {
      return {
        questionId: question.id,
        answer: question.userAnswer,
        title: question.title,
        questions: question.options,
      };
    });

    console.log(results);
  };

  return (
    <div className="p-4 overflow-auto h-[100vh]">
      <h1 className="text-4xl font-bold text-white-800 mb-2">{exam.title}</h1>
      <h2 className="text-2xl font-semibold text-white-700 mb-1">
        Level {exam.level}
      </h2>
      <h3 className="text-xl font-medium text-white-600 pb-4">
        Dificulty:{" "}
        <span className="bg-blue-500 text-grey-300 px-2 py-1 rounded-full text-sm">
          {exam.difficulty}
        </span>
      </h3>

      <form onSubmit={calificateExam}>
        {exam.questions.map((question) => {
          switch (question.type) {
            case "MULTIPLE":
              return (
                <MultipleUniqueOptions
                  key={question.id}
                  question={question}
                  onChange={handleAnswers}
                />
              );
            case "UNIQUE":
              return (
                <MultipleUniqueOptions
                  key={question.id}
                  question={question}
                  onChange={handleAnswers}
                  multiple
                />
              );
            case "OPENTEXT":
              return (
                <OpenAnswer
                  key={question.id}
                  question={question}
                  onChange={handleAnswers}
                  feedback={question.feedback}
                />
              );
            default:
              return null;
          }
        })}

        <button
          type="submit"
          className="bg-blue-500 text-grey-300 py-1 rounded-full px-5"
        >
          Send
        </button>
      </form>
    </div>
  );
}
