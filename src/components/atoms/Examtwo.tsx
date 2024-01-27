import { Question } from "@/redux/examReducer/types";
import { CustomGpt } from "@/services/cutomsown/customwongot";
import React, { useState } from "react";
import SingleChoiceQuestion from "./SingleChoiceQuestion";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import TrueFalseQuestion from "./TrueFalseQuestion";
import OpenTextQuestion from "./OpenTextQuestion";
import { Calificate } from "@/services/cutomsown/calificateown";

export const Examtwo = () => {
  const [isLoad, setIsLoad] = useState(false);
  const [answers, setAnswers] = useState<{ [key: string]: any }>({});
  const [questionData, setQuestionData] = useState([]);

  const handleAnswerChange = (questionId: string, answer: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const getQuestionFromIA = async () => {
    setIsLoad(true);
    try {
      const prompt = "Dame un examen de 10 preguntas";
      const data = await CustomGpt(prompt);

      setQuestionData(data.questions);
      // console.log(data);
    } catch (error) {
      console.error("Error en CustomGpt:", error);
    } finally {
      setIsLoad(false);
    }
  };

  const calificate = () => {};

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

  const handleSubmit = async () => {
    const responsePayload = questionData.map((question: any) => ({
      questionId: question.id,
      questionTitle: question.title,
      answer: answers[question.id],
    }));

    const questionDatasj = JSON.stringify(questionData, null, 0);
    const rtauser = JSON.stringify(responsePayload, null, 0);

    try {
      const dataRTA = await Calificate(questionDatasj, rtauser);

      // setQuestionData(data.questions);
      console.log(dataRTA);
    } catch (error) {
      console.error("Error en CustomGpt:", error);
    } finally {
      // setIsLoad(false);
    }
    // console.log("Respuestas en formato JSON:", responsePayload);
  };

  return (
    <div>
      <h1>Examtwo</h1>
      <button
        onClick={getQuestionFromIA}
        disabled={isLoad}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {isLoad ? "Cargando..." : "Llamar a CustomGPT"}
      </button>
      {isLoad && (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Renderiza las preguntas aquí */}
      {questionData &&
        questionData.map((question: any, i) => (
          <div key={`${question.id}-${i}`}>{renderQuestion(question)}</div>
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
