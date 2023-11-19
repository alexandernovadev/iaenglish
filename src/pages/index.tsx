import { useEffect, useState } from "react";
import { DataItem } from "./api/datatest";
import axios from "axios";

export default function Home() {
  const [inputWord, setInputWord] = useState("");
  const [ipaWord, setIpaWord] = useState("");
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

    try {
      const prompt = `Give a JSON with word /${inputWord}/, all data JSON must be relatated word/${inputWord} 

      YOUR RTA MUST BE SO, with ALL KEYS
      example: 
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
      // const response = await axios.post("/api/gpt", { prompt }); // Sending prompt in POST request
      // console.log(JSON.parse(response.data.name));

      // const formattedData = {
      //   ...response.data.name,
      //   status: "FAIL",
      //   times_seen: 1,
      // };

      const postResponse = await submitWords();
      console.log("postResponse", postResponse);
    } catch (error) {
      console.error("Error calling GPT endpoint:", error);
    }
  };

  async function submitWords() {
    const mockWords = [
      {
        es: {
          word: "casa",
          definition: "Edificio para habitar",
        },
        word: "house",
        ipa: "/haʊs/",
        type_word: "noun",
        definition_en: "A building for living in",
        definition_es: "Edificio para habitar",
        examples: ["This is my house", "I love the color of that house"],
        times_seen: 5,
        status: "GOOD",
        img: "url_to_image_of_a_house",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const url = "/api/word";
    const method = "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mockWords), // Envía los datos de prueba
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
          material, each of which can carry a current
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
          className="ml-2 p-2 bg-yellow-600 hover:bg-yellow-700 rounded-md"
        >
          GPTear
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
