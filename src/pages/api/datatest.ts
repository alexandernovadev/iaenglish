import type { NextApiRequest, NextApiResponse } from "next";
const data: DataItem[] = require("../../../public/jsonenglish.json");



type Data = {
  words?: { id: number; name: string }[];
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

export interface DataItem {
  Word: string;
  Count: number;
  POS: string;
  Definition: string;
}

const getWords = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req.query;

  if (typeof query === "string") {
    console.log(data.length);

    const results = data.filter(
      (item) => item.Word.toLowerCase() === query.toLowerCase()
    );
    res.status(200).json(results);
  } else {
    // Manejar casos en los que 'query' no es una cadena
    res.status(400).json([]);
  }
};
