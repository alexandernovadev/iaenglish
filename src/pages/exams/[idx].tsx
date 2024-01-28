import MultipleUniqueOptions from "@/components/questions/MultipleUniqueOptions";
import { OpenAnswer } from "@/components/questions/OpenAnwser";
import { ExamDemo } from "@/data/exams/ExamDemo";
import { Exam } from "@/interfaces/Exam";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { updateExam } from "@/store/slices/examSlice";
import { FaSpinner } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import Link from "next/link";
import { FaArrowCircleLeft } from "react-icons/fa";

export default function Exam() {
  const router = useRouter();
  const { idx } = router.query;

  const [exam, setExam] = useState<Exam>(ExamDemo);
  const exams = useAppSelector((state) => state.exams.exams);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

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
          const trimmedAnswer =
            typeof userAnswer === "string" ? userAnswer.trim() : userAnswer;

          return { ...question, trimmedAnswer };
        }
        return question;
      });

      const examNew = { ...prevExam, questions: updatedQuestions };
      dispatch(updateExam(examNew));
      return examNew;
    });
  };

  const calificateExam = async (e: any) => {
    e.preventDefault();

    const results = exam.questions.map((question) => {
      return {
        questionId: question.id,
        type: question.type,
        answer: question.userAnswer,
        title: question.title,
        questions: question.options,
      };
    });

    setIsLoading(true);
    try {
      const getDataExamResults = await fetch(
        `/api/calificateexam?examUser=${JSON.stringify(results)}`
      );
      const dataJsonExamResults = await getDataExamResults.json();

      // Set Feedback
      const updatedExam = { ...exam };
      updatedExam.questions = updatedExam.questions.map((question) => {
        const result = dataJsonExamResults.questions.find(
          (r: any) => r.id === question.id
        );
        return result
          ? {
              ...question,
              userAnswer: result.answer,
              feedback: result.feedback,
            }
          : question;
      });

      updatedExam.score = dataJsonExamResults.score;

      dispatch(updateExam(updatedExam));
    } catch (error) {
      console.error("Hey error ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pb-4 overflow-auto h-[100vh] w-full flex flex-col items-center">
      <form onSubmit={calificateExam} className="max-w-[720px]">
        <section className="sticky top-0 px-5 max-w-[720px] bg-gray-900 p-2 border-2 rounded-md">
          <h1 className="text-base font-bold text-white-800 mb-2 flex gap-4">
            <Link href="/exams">
              <FaArrowCircleLeft className="text-2xl cursor-pointer" />
            </Link>
            {exam.title}
          </h1>

          <div className="flex justify-around items-center">
            <h2 className="text-sm font-semibold text-white-700 mb-1">
              Level {exam.level}
            </h2>

            <span className="text-green-300 px-2 py-1 rounded-full text-sm">
              Dificulty: {exam.difficulty}
            </span>

            {exam.score > 0 && (
              <span className="bg-yellow-800 mx-4 text-grey-300 px-2 py-1 rounded-full text-sm">
                SCORE: {exam.score} / 100
              </span>
            )}

            <button
              type="submit"
              className="flex text-sm items-center gap-4 bg-blue-500 text-grey-300 py-1 rounded-full px-5"
            >
              {isLoading ? (
                <FaSpinner className="animate-spin" />
              ) : (
                <>
                  <IoSend /> CALIFICATE
                </>
              )}
            </button>
          </div>
        </section>

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
      </form>
    </div>
  );
}
