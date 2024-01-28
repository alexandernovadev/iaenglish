import { Exam } from "@/interfaces/Exam";
import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  try {
    switch (method) {
      case "GET":
        const {
          examUser = "",
        } = req.query;


        const CalificateExamJSON = await getJSONCalificateExam(String(examUser))
       
        res.status(200).json(CalificateExamJSON);
        break;
    }
  } catch (error: any) {
    res.status(500).json({ error: "Error en el servidor: " + error.message });
  }
}

export const getJSONCalificateExam = async (
  examUser = ""
) => {
  const openai = new OpenAI({
    apiKey: process.env.API_KEY_OPENIA,
  });

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `
        Genera un JSON para para calificar este examen ${examUser}.
        Se debera calificar muy critico y me daras esta estructura

        interface Calificate {
          questions:[
            {
              id: string // este el el id de la prugunta
              feedback:{
                feedback: string// Este lo daras en 400 chars minimo. dime porque esta bien o mal o so-so, y una explicacion del porque
                status: "WELLDONE" | "SO-SO" | "WRONG"// Esto lo detirminaras segun tu
              },....
            ]
            score: de 0-100, daras un score, de acuerdo a todo el total de pregunta, y lo que esta bien 
        }
      `,
      },
    ],
    model: "gpt-3.5-turbo-16k-0613",
    temperature: 0.5,
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
