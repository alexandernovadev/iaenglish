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
  const d = 
  [
    "am",
    "were",
    "had",
    "did",
    "doing",
    "says",
    "said",
    "saying",
    "get",
    "gets",
    "got",
    "getting",
    "make",
    "makes",
    "made",
    "go",
    "goes",
    "went",
    "going",
    "gone",
    "knows",
    "knew",
    "knowing",
    "take",
    "takes",
    "took",
    "taking",
    "taken",
    "sees",
    "seeing",
    "came",
    "coming",
    "think",
    "thinks",
    "look",
    "looks",
    "looked",
    "looking",
    "want",
    "wants",
    "wanted",
    "wanting",
    "give",
    "gives",
    "gave",
    "giving",
    "uses",
    "find",
    "finds",
    "found",
    "finding",
    "tell",
    "tells",
    "told",
    "telling",
    "ask",
    "asks",
    "asked",
    "asking",
    "work",
    "works",
    "working",
    "plays",
    "played",
    "playing",
    "run",
    "runs",
    "ran",
    "running",
    "move",
    "moves",
    "moved",
    "moving",
    "live",
    "lives",
    "lived",
    "living",
    "believe",
    "believes",
    "believed",
    "believing",
    "bring",
    "brings",
    "brought",
    "bringing",
    "happen",
    "happens",
    "happened",
    "happening",
    "writes",
    "wrote",
    "writing",
    "written",
    "provide",
    "provided",
    "providing",
    "sit",
    "sits",
    "sat",
    "sitting",
    "stand",
    "stood",
    "standing",
    "lose",
    "loses",
    "lost",
    "losing",
    "pays",
    "paid",
    "paying",
    "meet",
    "meets",
    "met",
    "meeting",
    "includes",
    "included",
    "continues",
    "continued",
    "set",
    "sets",
    "setting",
    "learn",
    "learns",
    "learned",
    "learnt",
    "changes",
    "changed",
    "changing",
    "lead",
    "leads",
    "understand",
    "understands",
    "understood",
    "watch",
    "watches",
    "watched",
    "watching",
    "follow",
    "follows",
    "followed",
    "stop",
    "stops",
    "stopped",
    "stopping",
    "create",
    "creates",
    "created",
    "creating",
    "speak",
    "speaks",
    "spoke",
    "spoken",
    "read",
    "reads",
    "read",
    "reading",
    "allow",
    "allows",
    "allowed",
    "allowing",
    "add",
    "adds",
    "added",
    "spend",
    "spends",
    "spent",
    "spending",
    "grow",
    "grows",
    "grew",
    "growing",
    "grown",
    "open",
    "opened",
    "opening",
    "walk",
    "walks",
    "walked",
    "walking",
    "win",
    "wins",
    "won",
    "winning",
    "offer",
    "offers",
    "offered",
    "offering",
    "remember",
    "remembers",
    "remembered",
    "remembering",
    "loves",
    "loved",
    "loving",
    "consider",
    "considers",
    "considering",
    "appears",
    "appeared",
    "appearing",
    "buy",
    "buys",
    "bought",
    "buying",
    "wait",
    "waits",
    "waited",
    "waiting",
    "served",
    "die",
    "dies",
    "died",
    "dying",
    "send",
    "sends",
    "sent",
    "sending"
  ];

  try {
    for (let i = 0; i < d.length; i++) {
      const word = d[i];
      console.log("\n GPTeando => 🪖 ", word);

      const p = promt__getWordToDictonaryJson(word);
      const response = await GPT(p);
      console.log("RWA => 🪖 ", response);
      console.log("\n\n\n");
      
      
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
        console.log("Saved con éxito: 🏁 ",i+" de "+ d.length);
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
