import { Word } from "@/interfaces/word";
import type { NextApiRequest, NextApiResponse } from "next";
const data: Word[] = require("../../../public/jsonenglish.json");

type Data = {
  words?: Word[];
  message?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getWords(req, res);
    default:
      return res.status(400).json({ message: "Bad request" });
  }
}

const getWords = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req.query;

  if (typeof query === "string") {
    console.log(data.length);

    const results = data.filter(
      (item) => item.word.toLowerCase() === query.toLowerCase()
    );
    res.status(200).json({ total: data.length, results });
  } else {
    // Manejar casos en los que 'query' no es una cadena
    res.status(400).json([]);
  }
};
