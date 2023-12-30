import { WORDSHERERAAW } from "@/data/wordsraw";
import { Word } from "@/interfaces/word";
import { connect, disconnect } from "@/mongo";
import { WordModel } from "@/mongo/models/Word";
import { NextApiRequest, NextApiResponse } from "next";
import { words__CLEAN } from "../../../word";
import WORDS_NEW_GPT3 from "../../../public/WORDS_NEW_GPT.json";

const axios = require("axios");
const cheerio = require("cheerio");

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
        const rta = await fixdates();
        // const rta = await searchAndDeleteRepeatedWords();
        // const rta = await addNewWords();
        // const rta = await wordsNotInMongo();
        // const rta = await getArrayFromAllWords()
        // const rta = await LoopArrayEach10Elements();
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

const addNewWords = async () => {
  // Add WORDS_NEW_GPT3 to mongo, add properties updatedAt con la fecha de hoy
  const newDataFormat = WORDS_NEW_GPT3;
  // .map((x) => {
  //   return {
  //     ...x,
  //     status: "FAIL",
  //     times_seen: 0,
  //   };
  // });

  try {
    // Usa el método create o insertMany para agregar los nuevos datos a MongoDB
    const result = await WordModel.insertMany(newDataFormat);

    console.log("Datos agregados con éxito:", result);
    return { data: "Datos agregados con éxito:" };
  } catch (error) {
    console.error("Error al agregar datos a MongoDB:", error);
    // throw error;
    return { data: "error" };
  }
};

const fixdates = async () => {
  // Search all words that doesn't have updatedAt or createdAt and add them with the date of "2023/12/25"
  // Fecha a establecer
  const fixedDate = new Date("2023-11-25");

  // Buscar documentos que no tienen las propiedades createdAt y updatedAt
  const wordsWithoutDates = await WordModel.find({
    $or: [{ createdAt: { $exists: false } }, { updatedAt: { $exists: false } }],
  });

  // Actualizar cada documento encontrado
  for (const word of wordsWithoutDates) {
    word.createdAt = fixedDate;
    word.updatedAt = fixedDate;
    word.status = "FAIL";
    await word.save();
  }

  console.log(`Actualizados ${wordsWithoutDates.length} documentos.`);

  return {
    wordsNotInMongo: `Actualizados ${wordsWithoutDates.length} documentos.`,
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

/**
 * Scan wordnik for audio links and save them in the database
 * @Deprecated
 */
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
