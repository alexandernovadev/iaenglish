import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { addExam } from "@/store/slices/examSlice";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { PiNewspaperClipping } from "react-icons/pi";
import { FaSpinner } from "react-icons/fa6";
import { MainLayout } from "@/components/layouts/MainLayout";
import { FaArrowCircleRight } from "react-icons/fa";

const Exams = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const exams = useAppSelector((state) => state.exams.exams);

  const [level, setLevel] = useState("Level");
  const [ammount, setAmmount] = useState("Ammount");
  const [difficulty, setDifficulty] = useState("Difficulty");
  const [userPrompt, setUserPrompt] = useState("");

  const getExam = async () => {
    setIsLoading(true);
    try {
      const getDataExam = await fetch(
        `/api/getexam?level=${level}&amountQuestions=${ammount}&difficulty=${difficulty}&userPrompt=${userPrompt}`
      );
      const dataJsonExam = await getDataExam.json();

      dispatch(addExam(dataJsonExam));
    } catch (error) {
      console.error("Hey error ");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="h-[100vh]  overflow-auto text-white">
        <h1 className="text-white text-4xl py-4">Exam generator</h1>
        <div className=" flex justify-center items-center">
          <section className="flex w-full items-center justify-around space-x-2 ">
            <input
              type="text"
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              placeholder="Escribe la tematica que quieres , whichever language !"
              className="w-[80%]  text-white border border-gray-600 rounded py-2 px-4 focus:outline-none focus:border-blue-500"
            />

            <select
              defaultValue={level}
              onChange={(e) => setLevel(e.target.value)}
              className=" text-white border border-gray-600 rounded py-2 px-4 focus:outline-none focus:border-blue-500"
            >
              <option value="Level" disabled>
                Level
              </option>
              <option value="A1">A1</option>
              <option value="A2">A2</option>
              <option value="B1">B1</option>
              <option value="B2">B2</option>
              <option value="C1">C1</option>
              <option value="C2">C2</option>
            </select>

            <select
              defaultValue={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className=" text-white border border-gray-600 rounded py-2 px-4 focus:outline-none focus:border-blue-500"
            >
              <option value="Difficulty" disabled>
                Difficulty
              </option>
              <option value="HARD">HARD</option>
              <option value="EASY">EASY</option>
              <option value="MEDIUM">MEDIUM</option>
            </select>

            <select
              defaultValue={ammount}
              onChange={(e) => setAmmount(e.target.value)}
              className=" text-white border border-gray-600 rounded py-2 px-4 focus:outline-none focus:border-blue-500"
            >
              <option value="Ammount" disabled>
                #
              </option>
              <option value="6">6</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>

            <button
              onClick={getExam}
              disabled={isLoading}
              className="flex items-center gap-2  hover: text-white font-bold py-2 px-4 rounded-full bg-blue-400"
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

        <table className=" w-full table-fixed mt-4">
          <thead>
            <tr>
              <th className="w-[500px] border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                Name
              </th>
              <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                Level
              </th>
              <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                Difficulty
              </th>
              <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                #
              </th>
              <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                Score
              </th>
              <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                ...
              </th>
            </tr>
          </thead>
          <tbody>
            {exams.map(
              ({ id, difficulty, level, title, score, questions }, index) => (
                <tr key={`ex${index}-${id}`}>
                  <td className="w-[500px] border-y border-slate-200 dark:border-slate-600 p-4 pl-8 text-slate-100 dark:text-slate-400">
                    {title}
                  </td>
                  <td className="border-y border-slate-200 dark:border-slate-600 p-4 pl-8 text-blue-500 dark:text-slate-400">
                    {level}
                  </td>
                  <td className="border-y border-slate-200 dark:border-slate-600 p-4 pl-8 text-green-500 dark:text-slate-400">
                    {" "}
                    {difficulty}
                  </td>
                  <td className="border-y border-slate-200 dark:border-slate-600 p-4 pl-8 text-purple-500 dark:text-slate-400">
                    {questions?.length}
                  </td>
                  <td className="border-y border-slate-200 dark:border-slate-600 p-4 pl-8 text-yellow-500 dark:text-slate-400">
                    {score}
                  </td>
                  <td className="border-y border-slate-200  p-4 pl-8 ">
                    {""}
                    <FaArrowCircleRight
                      className="text-3xl cursor-pointer"
                      onClick={() => router.push(`/exams/${id}`)}
                    />
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
};

export default Exams;
