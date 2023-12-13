import { Word } from "@/interfaces/word";
import { connect, disconnect } from "@/mongo";
import { WordModel } from "@/mongo/models/Word";
import { NextApiRequest, NextApiResponse } from "next";
import { words__CLEAN } from "../../../word";
const axios = require("axios");
const cheerio = require("cheerio");
import DictionaryJson from "../../../public/englishdb_ai.words.json";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connect(); // Establecer conexión con MongoDB

  const { method } = req;

  try {
    switch (method) {
      case "GET":
        const userWord = req.query.word as string;
        const rta = await serhWordByWord(userWord);
        res.status(200).json(rta);

        break;

      // case "POST":
      //   const newWord: Word = req.body;
      //   const word = await WordModel.create(newWord);
      //   res.status(201).json(word);
      //   break;
    }
  } catch (error: any) {
    res.status(500).json({ error: "Error en el servidor: " + error.message });
  } finally {
    await disconnect();
  }
}

const serhWordByWord = async (word: string) => {
  if (!word) {
    // Solo retorna las primeras 10 palabras
    const words = DictionaryJson.map((x) => x).sort((a, b) => {
      let date1Temp = a.updatedAt && a.updatedAt["$date"]
        ? a.updatedAt["$date"]
        : "2023-12-25T06:59:56.386Z";
      let date2Temp = b.updatedAt && b.updatedAt["$date"]
        ? b.updatedAt["$date"]
        : "2023-12-25T06:59:56.386Z";

      const dateA = new Date(date1Temp).getTime(); // Convert to numeric timestamp
      const dateB = new Date(date2Temp).getTime(); // Convert to numeric timestamp
      return dateB - dateA; // Sorting: most recent first
    });
    return {
      words: words.slice(0, 200),
      total: DictionaryJson.length,
    };
  }

  // deberia buscar si incluye la palabra

  const wordsSearch = DictionaryJson.find(
    (element: (typeof DictionaryJson)[0]) =>
      element.word.toLowerCase().includes(word.toLowerCase())
  );

  // Si solo hay una palabra, retorna un array con esa palabra
  // Si hay más de una palabra, retorna un array con todas las palabras
  // Sort by updated_at
  const words = wordsSearch
    ? [wordsSearch].sort((a, b) => {
        const dateA = new Date(a.updatedAt["$date"]).getTime(); // Convert to numeric timestamp
        const dateB = new Date(b.updatedAt["$date"]).getTime(); // Convert to numeric timestamp
        return dateB - dateA; // Sorting: most recent first
      })
    : [];

  return {
    words: words || `No exist the word /${word}/`,
    total: words?.length || 0,
  };
};
