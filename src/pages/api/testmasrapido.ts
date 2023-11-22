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
  await connect(); // Establecer conexión con MongoDB

  const d = [
    "start",
    "usual",
    "greetings",
    "saying",
    "good",
    "morning'",
    "afternoon'",
    "evening'",
    "depending",
    "day",
    "courteous",
    "way",
    "conversation",
    "how",
    "you?'",
    "nice",
    "meet",
    "you",
    "always",
    "good",
    "remember",
    "restaurant",
    "like",
    "i'd",
    "book",
    "table",
    "two'",
    "'could",
    "recommend",
    "come",
    "handy",
    "direction",
    "don’t",
    "hesitate",
    "say",
    "show",
    "me",
    "map?'",
    "i",
    "get",
    "to?'",
    "apologizing",
    "asking",
    "help",
    "necessary",
    "skills",
    "too",
    "sorry",
    "don't",
    "understand'",
    "please",
    "repeat",
    "polite",
    "ways",
    "prompt",
    "someone",
    "explain",
    "something",
    "again",
    "excuse",
    "direct",
    "useful",
    "need",
    "assistance",
    "any",
    "politeness",
    "goes",
    "long",
    "happy",
    "learning",
  ];

  try {
    for (let i = 0; i < d.length; i++) {
      const word = d[i];
      console.log("\n word:GPT", word);

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
        const wordDB = await WordModel.create(payload);
        console.log("Saved con éxito: 🏁");
      }
    }

    await disconnect(); 
    res.status(200).json({ message: "Archivo procesado y guardado con éxito" });
  } catch (error) {
    console.log("Error: 🚨", error);

    res.status(201).json({ message: "AError" + error });
  } finally {
    await disconnect(); 
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
