import { Exam } from "@/interfaces/Exam";
import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

interface Options {
  prompt: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  try {
    switch (method) {
      case "GET":
        const {
          level = "B2",
          amountQuestions = "6",
          difficulty = "HARD",
          userPrompt = "",
        } = req.query;

        const LEVEL = (level as Exam["level"]) || "B2";
        const DIFFICULTY = (difficulty as Exam["difficulty"]) || "HARD";
        const AMMOUNTQUESTIONS = Number(amountQuestions) || 10;

        const ExamJSON = await getJSONexamEnglish(
          LEVEL,
          AMMOUNTQUESTIONS,
          DIFFICULTY,
          String(userPrompt)
        );

        const FormatJSON: Exam = {
          id: `${LEVEL}${DIFFICULTY}-${new Date().getTime()}`,
          title: ExamJSON.title,
          difficulty: DIFFICULTY,
          level: LEVEL,
          score: 0,
          questions: ExamJSON.questions.map((question: any, idx: number) => {
            return {
              id: `q${idx}-${new Date().getTime()}`,
              userAnswer: null,
              feedback: {
                feedback: null,
                status: null,
              },
              validations: {
                required: true,
                max: 400,
                min: 100,
              },
              ...question,
            };
          }),
        };

        res.status(200).json(FormatJSON);
        break;
    }
  } catch (error: any) {
    res.status(500).json({ error: "Error en el servidor: " + error.message });
  }
}

export const getJSONexamEnglish = async (
  level = "B2",
  ammountQuestion = 6,
  difficulty = "HARD",
  userPrompt = ""
) => {
  const openai = new OpenAI({
    apiKey: process.env.API_KEY_OPENIA,
  });

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `
        Genera un JSON para un examen de inglés nivel ${level}.
        Este examen debe SOLO evaluara las  áreas de gramática, comprensión de lectura y habilidades lingüísticas variadas.
        El examen debe estar completamente en inglés y debe ser similar en estilo a los exámenes TOEFL o IELTS.
        Por favor, incluye una variedad de preguntas que evalúen diferentes aspectos del inglés B2,
        como uso de tiempos verbales, comprensión de textos, vocabulario, y estructuras gramaticales complejas.
        // Las rta no se repeteiran y la complejidad del examen es ${difficulty}

        ${userPrompt.length > 5 && `La tematica del examen sera ${userPrompt}`}

        con la siguiente estructura

        interface Exam {
          title: string;// Put a title with 100 chars.// Se creativo with this title
          questions: Question[]; // La cantidad debe ser de${ammountQuestion}, almenos 2 OPENTEXT
        }
        
        interface Question {
          title: string;
          type: "MULTIPLE" | "UNIQUE" | "OPENTEXT";// if is OPENTEXT, the user should write a text, about somethig , to evaluate your writting and coherence and difrente times structured
          options: string[]; // si es type OPENTEXT la opotions deben ser un "[]"
        }        
      `,
      },
    ],
    model: "gpt-3.5-turbo-16k-0613",
    // Creativity
    temperature: 0.5,
    // response_format: {
    //   type: "json_object",
    // },
  });

  // Check if the content is not null and is a string before parsing
  const content = completion.choices[0].message.content;
  if (typeof content === "string") {
    try {
      const examJSON = JSON.parse(content);
      return examJSON;
    } catch (error) {
      console.error("Error parsing JSON:", error);
      throw new Error("Failed to parse JSON from OpenAI response");
    }
  } else {
    throw new Error("Invalid content received from OpenAI response");
  }
};
