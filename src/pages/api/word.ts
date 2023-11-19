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
        const words = await WordModel.find({});
        res.status(200).json(words);
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
