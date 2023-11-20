import { useEffect, useState } from "react";
import { DataItem } from "./api/datatest";
import axios from "axios";

export default function Home() {
  const [inputWord, setInputWord] = useState("");
  const [ipaWord, setIpaWord] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [words, setWords] = useState([]);

  // Manejador del evento de envío del formulario
  const handleSubmit = async (event: any) => {
    event.preventDefault(); // Previene el comportamiento predeterminado del formulario
    const data = await getword(inputWord);
    setWords(data); // Actualiza el estado con los resultados de la búsqueda
  };

  const getword = async (word: string) => {
    const response = await fetch(`/api/datatest?query=${word}`);
    const data = await response.json();
    return data;
  };

  const handleMouseUp = async () => {
    const selectedText = window.getSelection()?.toString();
    if (selectedText) {
      const data = await getword(selectedText);
      console.log(selectedText);
      setWords(data); // Actualiza el estado con los resultados de la búsqueda

      // await callGPT;
      setInputWord(selectedText);
      speakWord(selectedText);
    }
  };

  const speakWord = (word: string) => {
    const speech = new SpeechSynthesisUtterance(word);
    window.speechSynthesis.speak(speech);
  };

  const callGPT = async () => {
    console.log("HELOOO ");

    setIsLoading(true);
    try {
      const prompt = `
      Generar un JSON para la palabra '${inputWord}' con las siguientes claves:

       'word'(la palabra en inglés), 'es' (un objeto con la palabra en español y su definición), 
     'ipa' (la pronunciación en IPA), 'type_word' (tipo de palabra, como sustantivo, verbo, etc.), 
     'definition_en' (definición en inglés), 'definition_es' (definición en español),
      y 'examples' (una lista de ejemplos de uso). Asegúrate de que todas estas claves estén presentes en la respuesta."
      fill this with "${inputWord}" como rererencias

      example with "Step away": 

        {
          "es": {
              "word": "Alejarse",
              "definition": "Moverse o distanciarse de algo o alguien, especialmente para crear espacio o dejar de participar en una situación."
          },
          "word": "Step away",
          "ipa": "/stɛp əˈweɪ/",
          "type_word": "p. v. ",
          "definition_en": "To move or distance oneself from something or someone, especially to create space or to cease involvement in a situation.",
          "definition_es": "Moverse o distanciarse de algo o alguien, especialmente para crear espacio o dejar de participar en una situación.",
          "examples": [
              "When arguments get heated, it's better to step away and take a moment to cool off.",
              "The team decided to step away from that project to focus on other priorities.",
              "Step away from the edge of the cliff; it's dangerous to be so close.",
              "It's important to learn to step away from toxic situations in life.",
              "If you feel the pressure is too much, don't hesitate to step away and seek support."
          ]
      }
      `;
      const response = await axios.post("/api/gpt", { prompt }); // Sending prompt in POST request
      console.log(JSON.parse(response.data.name));

      const formattedData = {
        ...JSON.parse(response.data.name),
        status: "FAIL",
        times_seen: 1,
      };

      const postResponse = await submitWords(formattedData);
      console.log("postResponse", postResponse);
    } catch (error) {
      console.error("Error calling GPT endpoint:", error);
    } finally {
      setIsLoading(false);
    }
  };

  async function submitWords(formattedData: any) {
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
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="miytes" onMouseUp={handleMouseUp}>
        <h1>The Roman Civilization</h1>
        <h4>A Journey Through Time and Influence</h4>
        <p>
          A transistor is a miniature semiconductor that regulates or controls
          current or voltage flow in addition amplifying and generating these
          electrical signals and acting as a switch/gate for them. Typically,
          transistors consist of three layers, or terminals, of a semiconductor
          material, each of which can carry a current n my application the same
          error message was thrown. The difference is, that I am using MongoDB
          Atlas, instead of a local MongoDB. Solution: After added "+srv" to the
          URL scheme is issue was gone
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mb-4 mt-2">
        <input
          type="text"
          value={inputWord}
          onChange={(e) => setInputWord(e.target.value)}
          placeholder="Search a word..."
          className="p-2 bg-gray-800 border border-gray-700 rounded-md"
        />
        <button
          type="submit"
          className="ml-2 p-2 bg-blue-600 hover:bg-blue-700 rounded-md"
        >
          Search
        </button>
        <button
          type="button"
          onClick={() => callGPT()}
          disabled={isLoading}
          className="ml-2 p-2 bg-yellow-600 hover:bg-yellow-700 rounded-md"
        >
          GPTear
          {isLoading && (
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </button>
      </form>
      <ul className="space-y-4">
        {words.map((word: DataItem, index) => (
          <li key={index} className="border-b border-gray-700">
            <p className="text-lg font-bold">
              {word.Word} [{ipaWord}]
              <span
                onClick={() => speakWord(word.Word)}
                style={{
                  cursor: "pointer",
                  marginLeft: "5px",
                  marginRight: "5px",
                }}
              >
                🔊
              </span>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                {word.POS}
              </span>
            </p>
            <p>{word.Definition}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
