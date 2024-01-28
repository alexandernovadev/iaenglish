import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { addExam } from "@/store/slices/examSlice";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { PiNewspaperClipping } from "react-icons/pi";
import { FaSpinner } from "react-icons/fa6";

const Exams = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const exams = useAppSelector((state) => state.exams.exams);

  const [level, setLevel] = useState("B2");
  const [ammount, setAmmount] = useState(6);
  const [difficulty, setDifficulty] = useState("HARD");
  const [userPrompt, setUserPrompt] = useState("La tematica sera condicionales y future tense");

  console.log(exams);

  const getExam = async () => {
    setIsLoading(true);
    try {
      const getDataExam = await fetch(
        `/api/getexam?level=${level}&amountQuestions=${ammount}&difficulty=${difficulty}&userPrompt=${userPrompt}`
      );
      const dataJsonExam = await getDataExam.json();

      console.log(dataJsonExam);

      dispatch(addExam(dataJsonExam));
    } catch (error) {
      console.log("Hey error ");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[100vh]  overflow-auto p-5 bg-gray-800 text-white">
      <div className="my-5 flex justify-center items-center">
        <section className="flex w-full items-center justify-center space-x-2">
          <input
            type="text"
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            placeholder="La tematica sera condicionales y future tense"
            className="w-[80%] bg-gray-700 text-white border border-gray-600 rounded py-2 px-4 focus:outline-none focus:border-blue-500"
          />
          <label htmlFor="">
            LEVEL
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="bg-gray-700 text-white border border-gray-600 rounded py-2 px-4 focus:outline-none focus:border-blue-500"
            >
              <option value="A1">A1</option>
              <option value="A2">A2</option>
              <option value="B1">B1</option>
              <option value="B2">B2</option>
              <option value="C1">C1</option>
              <option value="C2">C2</option>
            </select>
          </label>

          <label htmlFor="">
            DIFiCULTY
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="bg-gray-700 text-white border border-gray-600 rounded py-2 px-4 focus:outline-none focus:border-blue-500"
            >
              <option value="HARD">HARD</option>
              <option value="EASY">EASY</option>
              <option value="MEDIUM">MEDIUM</option>
            </select>
          </label>

          <label htmlFor="">
            #
            <select
              value={ammount}
              onChange={(e) => setAmmount(+e.target.value)}
              className="bg-gray-700 text-white border border-gray-600 rounded py-2 px-4 focus:outline-none focus:border-blue-500"
            >
              <option value="6">6</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </label>

          <button
            onClick={getExam}
            disabled={isLoading}
            className="flex items-center gap-2 bg-blue-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
          >
            {isLoading ? (
              <FaSpinner className="animate-spin" />
            ) : (
              <>
                <PiNewspaperClipping /> Crear
              </>
            )}
          </button>
        </section>
      </div>

      {exams.map(
        ({ id, difficulty, level, title, score, questions }, index) => (
          <section
            key={index}
            className="flex justify-around border border-gray-200 bg-gray-700 p-4 rounded-lg cursor-pointer my-2"
            onClick={() => router.push(`/exams/${id}`)}
          >
            <h1 className="text-xl text-blue-400">{title}</h1>
            <h3 className="text-lg text-blue-300">Level {level}</h3>
            <h5 className="text-md text-blue-200">
              Numero de preguntas: {questions.length}
            </h5>
            <span className="inline-block bg-blue-500 text-white rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
              Dificultad: {difficulty}
            </span>
            <span>SCORE: {score}</span>
          </section>
        )
      )}
    </div>
  );
};

export default Exams;
