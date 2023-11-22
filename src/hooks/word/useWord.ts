import { Word } from "@/interfaces/word";
import { promt__getWordToDictonaryJson } from "@/propmts/getWordToDictonaryJson";
import { WordActionTypes } from "@/redux/wordRecuder/types";
import { askToChatGPT } from "@/services/gpt/askToChatGPT";
import { useDispatch } from "react-redux";

export interface Filters {
  [key: string]: string | number;
}

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

      // dispatch({ type: WordActionTypes.ADD_WORD, payload });
      dispatch({ type: WordActionTypes.SET_ACTIVED_WORD, payload });
    } catch (error: any) {
      dispatch({ type: WordActionTypes.IS_ERROR, payload: error.message });
    } finally {
      dispatch({ type: WordActionTypes.IS_LOADING, payload: false });
    }
  };

  // TODO USAR services
  const saveWordDB = async (formattedData: Word) => {
    dispatch({ type: WordActionTypes.IS_LOADING, payload: true });
    dispatch({ type: WordActionTypes.IS_ERROR, payload: "" });
    const url = "/api/word";
    const method = "POST";

    formattedData.word = formattedData.word.toLowerCase();
    // {"word": {"$regex": "^be$", "$options": "i"}}
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

  const getWordsDB = async (filters: Filters = {}) => {
    dispatch({ type: WordActionTypes.IS_LOADING, payload: true });
    dispatch({ type: WordActionTypes.IS_ERROR, payload: "" });

    let queryString = Object.entries(filters)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&");

    const url = `/api/word?${queryString}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      dispatch({ type: WordActionTypes.ADD_WORD, payload: data.words });
      console.log(data.words);
    } catch (error) {
      dispatch({ type: WordActionTypes.IS_ERROR, payload: error });

      console.error("Error fetching words:", error);
    } finally {
      dispatch({ type: WordActionTypes.IS_LOADING, payload: true });
    }
  };

  const editWordToDb = () => {};
  const removeWordToDb = () => {};

  return { getWordFromGPT, saveWordDB, getWordsDB };
};
