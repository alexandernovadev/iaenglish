import { Word } from "@/interfaces/word";
import { connect, disconnect } from "@/mongo";
import { WordModel } from "@/mongo/models/Word";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connect(); // Establecer conexión con MongoDB

  const { method } = req;

  try {
    switch (method) {
      case "GET":
        // Buscar los repetidos con
        /**
         * {
  _id: "$word",
  count: {
    $sum: 1,
  },
}
*/

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

        res.status(200).json({ repeatedWords, r: repeatedWords.length });

        // const words = [
        // ]

        //   // Buscar en mongo Word.word esa lista comparar con la lista de arriba
        //   // Las palabras que no estén en mongo, agregarlas a un array y devolverlas como respuesta
        //   const wordsInMongo = await WordModel.find({}).select("word");
        //   const wordsInMongoArray = wordsInMongo.map((word) => word.word);
        //   const wordsNotInMongo = words.filter(
        //     (word) => !wordsInMongoArray.includes(word)
        // );
        // res.status(200).json(wordsNotInMongo);
        break;

      case "POST":
        const newWord: Word = req.body;
        const word = await WordModel.create(newWord);
        res.status(201).json(word);
        break;

      case "PUT":
        const { id } = req.query;
        const updatedWord: Word = req.body;
        const updated = await WordModel.findByIdAndUpdate(id, updatedWord, {
          new: true,
        });
        res.status(200).json(updated);
        break;

      case "DELETE":
        const { id: deleteId } = req.query;
        await WordModel.findByIdAndRemove(deleteId);
        res.status(204).send("Palabra eliminada correctamente.");
        break;

      default:
        res.status(405).json({ error: "Método no permitido." });
        break;
    }
  } catch (error: any) {
    res.status(500).json({ error: "Error en el servidor: " + error.message });
  } finally {
    await disconnect(); // Cerrar conexión con MongoDB
  }
}
