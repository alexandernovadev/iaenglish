import { Word } from "@/interfaces/word";
import { promt__getWordToDictonaryJson } from "@/propmts/getWordToDictonaryJson";
import { WordActionTypes } from "@/redux/wordRecuder/types";
import { askToChatGPT } from "@/services/gpt/askToChatGPT";
import { useDispatch } from "react-redux";

export const useWord = () => {
  const dispatch = useDispatch();

  const getWordFromGPT = async (word: string) => {
    dispatch({ type: WordActionTypes.IS_LOADING, payload: true });
    dispatch({ type: WordActionTypes.IS_ERROR, payload: "" });
    try {
      const promtRefined = promt__getWordToDictonaryJson(word);

      const response = await askToChatGPT(promtRefined);

      const payload = {
        ...response,
        status: "FAIL",
        times_seen: 1,
      };

      dispatch({ type: WordActionTypes.ADD_WORD, payload });
    } catch (error: any) {
      dispatch({ type: WordActionTypes.IS_ERROR, payload: error.message });
    } finally {
      dispatch({ type: WordActionTypes.IS_LOADING, payload: false });
    }
  };

  const saveWordDB = async (formattedData: Word) => {
    dispatch({ type: WordActionTypes.IS_LOADING, payload: true });
    dispatch({ type: WordActionTypes.IS_ERROR, payload: "" });
    const url = "/api/word";
    const method = "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      const result = await response.json();
      console.log("Palabras Saved con éxito:", result);
    } catch (error: any) {
      dispatch({ type: WordActionTypes.IS_ERROR, payload: error.message });
    } finally {
      dispatch({ type: WordActionTypes.IS_LOADING, payload: false });
    }
  };

  const editWordToDb = () => {};
  const removeWordToDb = () => {};

  return { getWordFromGPT, saveWordDB };
};
