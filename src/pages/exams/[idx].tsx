import MultipleUniqueOptions from "@/components/questions/MultipleUniqueOptions";
import { OpenAnswer } from "@/components/questions/OpenAnwser";
import { ExamDemo } from "@/data/exams/ExamDemo";
import { Exam } from "@/interfaces/Exam";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

export default function Exam() {
  const router = useRouter();
  const { idx } = router.query;

  const [exam, setExam] = useState<Exam>(ExamDemo);
  const exams = useAppSelector((state) => state.exams.exams);


  useEffect(() => {
    if (idx && exams.length > 0) {
      const foundExam = exams.find((exam) => exam.id === idx);
      if (foundExam) {
        setExam(foundExam);
      }
    }
  }, [idx, exams]);

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
