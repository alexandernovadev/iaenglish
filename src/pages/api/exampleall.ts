import { connectToDatabase } from "@/mongo";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { db } = await connectToDatabase();

  if (req.method === "POST") {
    try {
      const data = req.body;
      const response = await db.collection("users").insertOne(data);
      res.status(200).json(response);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === "GET") {
    try {
      const users = await db.collection("users").find({}).toArray();
      res.status(200).json(users);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === "DELETE") {
    try {
      const userId = req.query.id; // Asegúrate de obtener la ID correctamente
      // @ts-ignore
      const response = await db.collection("users").deleteOne({ _id: userId });
      if (response.deletedCount === 1) {
        res.status(200).json({ message: "Usuario eliminado" });
      } else {
        res.status(404).json({ message: "Usuario no encontrado" });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
