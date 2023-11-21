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
        const search = req.query.search;
        // Asegúrate de que search es una cadena
        const searchStr = Array.isArray(search) ? search[0] : search;
        // Crea una consulta regex para búsqueda insensible a mayúsculas y minúsculas
        const query = searchStr ? { word: new RegExp(searchStr, "i") } : {};
    
        try {
            // Obtener las palabras que coinciden con la búsqueda, limitadas a 30
            const words = await WordModel.find(query).limit(30);
            
            // Obtener el total de palabras que coinciden con la búsqueda
            const total = await WordModel.countDocuments(query);
    
            res.status(200).json({ words, total });
        } catch (error) {
            // Manejar cualquier error que pueda ocurrir
            res.status(500).json({ message: "Error al procesar la solicitud", error });
        }
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
