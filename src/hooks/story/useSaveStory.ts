import { Story } from "@/interfaces/story";
import { useState } from "react";

export const useSaveStorytoDb = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setisError] = useState(false);

  const saveStoryDB = async (formattedData: Story) => {
    setIsLoading(true);
    const url = "/api/story";
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
      console.log("Storiiirir enviado well done:", result);
    } catch (error) {
      console.error("Error al enviar las sttoo  JPPP:", error);
    } finally {
      setIsLoading(true);
    }
  };

  return {
    isLoading,
    isError,

    saveStoryDB,
  };
};
