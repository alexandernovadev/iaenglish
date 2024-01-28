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
          title: ExamJSON.Exam.title,
          difficulty: DIFFICULTY,
          level: LEVEL,
          score: 0,
          questions: ExamJSON.Exam.questions.map((question: any, idx: number) => {
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
          createAt: String(new Date().getTime()),
          updatedAt: String(new Date().getTime()),
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
        Create an English exam at the ${level} level in JSON format. This exam should
        focus on grammar, reading comprehension, and varied linguistic skills,
        aligning with the style of TOEFL or IELTS exams.
        The exam must be entirely in English and tailored to the '${difficulty}' complexity.
        Include ${ammountQuestion} questions, ensuring they cover different aspects
        of ${level} English, such as verb tenses, reading comprehension, vocabulary, and complex grammatical structures.
        ${userPrompt.length > 5 ? `Incorporate the theme '${userPrompt}' into the exam.` : ''}
        Follow this structure for the questions:
        

        interface Exam {
          title: string;// Put a title with 100 carasteres, Se creativo with this title
        questions: Question[]; // La cantidad debe ser de${ammountQuestion}, 
        }

        interface Question {
          title: string;
          type: "MULTIPLE" | "UNIQUE" | "OPENTEXT";
          options: string[]; // Empty if it's 'OPENTEXT'.
        }
        
        For 'OPENTEXT' type questions, create a brief context for the
        user to write a paragraph, thus evaluating their coherence and semantic skills.
        Be sure to include at least two 'OPENTEXT' questions. Be creative with the question titles.
      `,
      },
    ],
    model: "gpt-4",
    temperature: 0.4,
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
