import { Word } from "@/interfaces/word";
import { useState } from "react";

export const useSaveWordtoDb = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setisError] = useState(false);

  const saveWordDB = async (formattedData: Word) => {
    setIsLoading(true);
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
      console.log("Palabras enviadas con éxito:", result);
    } catch (error) {
      console.error("Error al enviar las palabras JPPP:", error);
    } finally {
      setIsLoading(true);
      
    }
  };

  return {
    isLoading,
    isError,

    saveWordDB,
  };
};
