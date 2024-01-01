// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { promt__getWordToDictonaryJson } from "@/propmts/getWordToDictonaryJson";
import type { NextApiRequest, NextApiResponse } from "next";
import { connect, disconnect } from "@/mongo";
import { WordModel } from "@/mongo/models/Word";
import OpenAI from "openai";
import { words__CLEAN } from "../../../word";
import { generateManyWords } from "@/propmts/generateManyWords";

const fs = require("fs");
const path = require("path");

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
  const resL = await LoopArrayEach10Elements();

  res.status(200).json(resL);
}

// This function makes a request to the OpenAI API
const GPT = async (prompt: string) => {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });

  return response.choices[0].message.content;
};

const LoopArrayEach10Elements = async () => {
  // @ts-ignore
  const words__CLEAN3 = [...new Set(words__CLEAN)];

  for (let index = 0; index < words__CLEAN3.length; index++) {
    if (index % 10 === 0) {
      let words10:Array<string> = [];
      for (let i = 0; i < 10; i++) {
        const WORD = words__CLEAN3[index + i];
        if (WORD) words10.push(WORD);
      }

      const refinedPromtTOJSON = generateManyWords(words10);
      
      console.log("Thinking... 🤔");

      try {
        const response = await GPT(refinedPromtTOJSON);
        const data = response!;

        const filePath = path.join(
          process.cwd(),
          "public",
          `data_${index}.json`
        );
        fs.writeFileSync(filePath, data);
        console.log(
          "Saved con éxito: 🏁  ",
          index + " de " + words__CLEAN3.length + "\n"
        );
      } catch (error) {
        console.log("Error: 🚨", error);
      } finally {
        console.log("😇 Finalizado 🎉🎉");
      }
    }
  }

  return { message: "Archivo procesado y guardado con éxito" };
};

// const GetDataJSONFromGPT = async () => {
// const d =[]
//   try {
//     for (let i = 0; i < d.length; i++) {
//       const word = d[i];
//       console.log("\n GPTeando => 🪖 ", word);

//       const p = promt__getWordToDictonaryJson(word);
//       const response = await GPT(p);
//       console.log("RWA => 🪖 ", response);
//       console.log("\n\n\n");

//       const data = JSON.parse(response!);
//       // console.log(JSON.parse(response!));
//       const payload = {
//         ...data,
//         word: data.word.toLowerCase(),
//         status: "FAIL",
//         times_seen: 1,
//       };
//       if (payload.type_word !== null) {
//         await connect();
//         const wordDB = await WordModel.create(payload);
//         console.log("Saved con éxito: 🏁 ", i + " de " + d.length);
//         await disconnect();
//       }
//     }

//     return { message: "Archivo procesado y guardado con éxito" };
//   } catch (error) {
//     console.log("Error: 🚨", error);

//     return { message: "AError" + error };
//   } finally {
//     console.log("😇 Finalizado 🎉🎉");
//   }
// };
