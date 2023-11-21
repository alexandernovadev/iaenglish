import nextAPI from "@/api/nextAPI";

/** Trust in that i want only JSON data, and not only raw text */
export const askToChatGPT = async (prompt: string) => {
  try {
    const response = await nextAPI.post("/gpt", { prompt });
    return JSON.parse(response.data.name);
  } catch (error: any) {
    console.error("Error fetching data:", error.message || error);
    throw error; // Propaga el error para manejarlo en el componente
  }
};
