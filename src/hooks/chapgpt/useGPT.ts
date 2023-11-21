import { promt__getWordToDictonaryJson } from "@/propmts/getWordToDictonaryJson";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";

export const useGPT = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState("");
  const dispatch = useDispatch();

  const getDataGPT = async () => {
    dispatch({
      type: "IS_LOADING",
      payload: true,
    });
    dispatch({
      type: "IS_ERROR",
      payload: ""
    });

    setIsLoading(true);
    setError(null);

    try {
      const prompt = promt__getWordToDictonaryJson("unjust");
      const response = await axios.post("/api/gpt", { prompt });

      dispatch({
        type: "ADD_STORY",
        payload: JSON.parse(response.data.name),
      });

      setData(response.data.name);
    } catch (error: any) {
      console.error("Error fetching data:", error.message || error);
      setError(error);

      dispatch({
        type: "IS_ERROR",
        payload: "Erro wiht chatGPT ," + error,
      });
    } finally {
      dispatch({
        type: "IS_LOADING",
        payload: false,
      });

      setIsLoading(false);
    }
  };

  return { isLoading, error, data, getDataGPT };
};
