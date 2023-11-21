import { useState } from "react";

export interface Filters {
  // Define the structure of your filters
  [key: string]: string | number;
}

export const useGetWordsDb = () => {
  const [words, setWords] = useState([]);
  const [totaWords, setTotaWords] = useState(0);
  const [isLoadingGetWord, setIsLoadingGetWord] = useState(false);
  const [isErrorGetWord, setIsErrorGetWord] = useState(false);

  const getWordsDB = async (filters: Filters = {}) => {
    setIsLoadingGetWord(true);
    setIsErrorGetWord(false);

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
      console.log(data);
      
      setWords(data.words);
      setTotaWords(data.total)
    } catch (error) {
      console.error("Error fetching words:", error);
      setIsErrorGetWord(true);
    } finally {
      setIsLoadingGetWord(false);
    }
  };

  return {
    words,
    isLoadingGetWord,
    isErrorGetWord,
    totaWords,


    getWordsDB,
  };
};
