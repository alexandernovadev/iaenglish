import { Story } from "@/interfaces/story";
import { connect, disconnect } from "@/mongo";
import { StoryModel } from "@/mongo/models/Story";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connect();

  const { method } = req;

  try {
    switch (method) {
      case "GET":
        const storys = await StoryModel.find({});
        res.status(200).json(storys);
        break;

      case "POST":
        const newstory: Story = req.body;
        const story = await StoryModel.create(newstory);
        res.status(201).json(story);
        break;

      case "PUT":
        const { id } = req.query;
        const updatedstory: Story = req.body;
        const updated = await StoryModel.findByIdAndUpdate(id, updatedstory, {
          new: true,
        });
        res.status(200).json(updated);
        break;

      // case "DELETE":
      //   const { id: deleteId } = req.query;
      //   await StoryModel.findByIdAndRemove(deleteId);
      //   res.status(204).send("Palabra eliminada correctamente.");
      //   break;

      default:
        res.status(405).json({ error: "Método no permitido." });
        break;
    }
  } catch (error: any) {
    res.status(500).json({ error: "Error en el servidor: " + error.message });
  } finally {
    await disconnect();
  }
}
