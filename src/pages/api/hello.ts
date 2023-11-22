// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import d from "../../../public/englishdb_ai.words.json";
import fs from "fs";
import path from "path";

type Data = {
  message: string;
  error?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const newData = d.map((word: any) => {
    return {
      ...word,
      word: word.word.toLowerCase().trim(),
    };
  });

  const filePath = path.join(process.cwd(), "public", "pero.json");
  fs.writeFile(filePath, JSON.stringify(newData, null, 2), "utf8", (err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error al escribir el archivo", error: err });
    }

    res.status(200).json({ message: "Archivo procesado y guardado con éxito" });
  });
}
