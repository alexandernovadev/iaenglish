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
        // const rta = await serchCambrigePupe();
        // const rta = await searchAndDeleteRepeatedWords();
        // const rta = await wordsNotInMongo();
        // const rta = await getArrayFromAllWords()
        // const rta = await LoopArrayEach10Elements();
        const userWord = req.query.word as string;
        const rta = await serhWordByWord(userWord);
        res.status(200).json(rta);

        break;

      case "POST":
        const newWord: Word = req.body;
        const word = await WordModel.create(newWord);
        res.status(201).json(word);
        break;
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
    const words = DictionaryJson.slice(0, 200);
    return { words: words, total: DictionaryJson.length };
  }

  // deberia buscar si incluye la palabra

  const wordsSearch = DictionaryJson.find(
    (element: (typeof DictionaryJson)[0]) =>
      element.word.toLowerCase().includes(word.toLowerCase())
  );
  // Si solo hay una palabra, retorna un array con esa palabra
  // Si hay más de una palabra, retorna un array con todas las palabras
  const words = wordsSearch ? [wordsSearch] : [];

  return {
    words: words || `No exist the word /${word}/`,
    total: words?.length || 0,
  };
};

const getArrayFromAllWords = async () => {
  const words = await WordModel.find({}).select("word");
  const wordsArray = words.map((word) => word.word);
  return wordsArray;
};

const searchAndDeleteRepeatedWords = async () => {
  const repeatedWords = await WordModel.aggregate([
    {
      $group: {
        _id: "$word", // Agrupar por la palabra
        count: { $sum: 1 }, // Contar apariciones
      },
    },
    {
      $match: {
        count: { $gt: 1 }, // Filtrar solo las palabras que aparecen más de una vez
      },
    },
    {
      $sort: { count: -1 }, // Opcional: ordenar por las más repetidas primero
    },
  ]);
  console.log(repeatedWords);

  for (const wordObj of repeatedWords) {
    const wordInstances = await WordModel.find({ word: wordObj._id });

    // Si hay más de una instancia, elimina todas excepto la primera
    for (let i = 1; i < wordInstances.length; i++) {
      await WordModel.deleteOne({ _id: wordInstances[i]._id });
    }
  }

  return { repeatedWords, r: repeatedWords.length };
};

const wordsNotInMongo = async () => {
  // Buscar en mongo Word.word esa lista comparar con la lista de arriba
  // Las palabras que no estén en mongo, agregarlas a un array y devolverlas como respuesta
  const wordsInMongo = await WordModel.find({}).select("word");
  const wordsInMongoArray = wordsInMongo.map((word) => word.word);
  const wordsNotInMongo = words__CLEAN.filter(
    (word) => !wordsInMongoArray.includes(word)
  );
  return { wordsNotInMongo, r: wordsNotInMongo.length };
};

const serchCambrigePupe = async () => {
  // Launch the browser and open a new blank page
  try {
    const language = "en";
    const word = "example";
    const apiUrl = `https://www.wordnik.com/words/example#hear`;

    const response = await axios.get(apiUrl, { timeout: 100000 });
    const $ = cheerio.load(response.data);
    const audioLinks: Array<string> = [];

    // Selecting all elements with the class 'play_sound' and extracting the 'doc-fileurl' attribute
    $(".play_sound").each((index: any, element: any) => {
      const audioUrl = $(element).attr("doc-fileurl");
      if (audioUrl) {
        audioLinks.push(audioUrl);
      }
    });

    // return audioLinks;
    console.log("Audio Links:", audioLinks);
    // return audioLinks;

    return { damn: "firstResultTitle", data: audioLinks };
  } catch (error) {
    console.error("Hubo un error:", error);
    return { damn: "errro" };
  }
};
