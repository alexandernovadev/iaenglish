import { useEffect, useState } from "react";
import { DataItem } from "./api/datatest";

export default function Home() {
  const [inputWord, setInputWord] = useState("");
  const [words, setWords] = useState([]);

  // Manejador del evento de envío del formulario
  const handleSubmit = async (event: any) => {
    event.preventDefault(); // Previene el comportamiento predeterminado del formulario
    const response = await fetch(`/api/datatest?query=${inputWord}`);
    const data = await response.json();
    setWords(data); // Actualiza el estado con los resultados de la búsqueda
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <form onSubmit={handleSubmit} className="mb-4">
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
      </form>
      <ul className="space-y-4">
        {words.map((word: DataItem, index) => (
          <li key={index} className="border-b border-gray-700">
            <p className="text-lg font-bold">
              {word.Word}{" "}
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
