import { Word } from "@/interfaces/word";
import { promt__getWordToDictonaryJson } from "@/propmts/getWordToDictonaryJson";
import { dataJsonClean } from "@/utils/cleanDataandJsonParse";
import axios from "axios";
import { useState } from "react";

export const useGetWordJsonGPT = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setisError] = useState(false);
  const [wordGPTJSON, setWordGPTJSON] = useState<Word>();

  const callGPT = async (inputWord: string) => {
    console.log("IA thinking ... ");

    setIsLoading(true);
    try {
      const prompt = promt__getWordToDictonaryJson(inputWord);

      const response = await axios.post("/api/gpt", { prompt });

      const formattedData = {
        ...dataJsonClean(response.data.name),
        status: "FAIL",
        times_seen: 1,
      };
      console.log(formattedData);

      setWordGPTJSON(formattedData);
    } catch (error) {
      console.error("Error calling GPT endpoint:", error);
      setisError(true);
    } finally {
      setIsLoading(false);
      console.log("IA FINISH ! ");
    }
  };

  return {
    isLoading,
    isError,
    wordGPTJSON,

    callGPT,
  };
};
