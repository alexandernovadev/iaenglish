// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { promt__getWordToDictonaryJson } from "@/propmts/getWordToDictonaryJson";
import type { NextApiRequest, NextApiResponse } from "next";
import { connect, disconnect } from "@/mongo";
import { WordModel } from "@/mongo/models/Word";
import OpenAI from "openai";
const API_KEY =
  process.env.API_KEY_OPENIA ||
  "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";

type Data = {
  message: string;
  error?: any;
};
// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const d = [

    "sacrificing",
    "body",
    "obtain",
    "piece",
    "cake'",
    "easy",
    "simple",
    "do",
    "conveys",
    "completing",
    "task",
    "effortless",
    "eating",
    "delicious",
    "moist",
    "slice",
    "cake"
  ];

  try {
    for (let i = 0; i < d.length; i++) {
      const word = d[i];
      console.log("\n GPTeando => 🪖 ", word);

      const p = promt__getWordToDictonaryJson(word);
      const response = await GPT(p);
      const data = JSON.parse(response!);
      // console.log(JSON.parse(response!));
      const payload = {
        ...data,
        word: data.word.toLowerCase(),
        status: "FAIL",
        times_seen: 1,
      };
      if (payload.type_word !== null) {
        await connect();
        const wordDB = await WordModel.create(payload);
        console.log("Saved con éxito: 🏁");
        await disconnect();
      }
    }

    res.status(200).json({ message: "Archivo procesado y guardado con éxito" });
  } catch (error) {
    console.log("Error: 🚨", error);

    res.status(201).json({ message: "AError" + error });
  } finally {
    console.log("😇 Finalizado 🎉🎉");
  }
}

// This function makes a request to the OpenAI API
const GPT = async (prompt: string) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4-0613",
    messages: [{ role: "user", content: prompt }],
  });

  return response.choices[0].message.content;
};
