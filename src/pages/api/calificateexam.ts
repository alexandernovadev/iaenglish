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
        console.log(CalificateExamJSON);
            
        res.status(200).json(CalificateExamJSON.Calificate);
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
        Generate a JSON for grading this exam: ${examUser}. 
        Take your time to analyze each response thoroughly, especially for OPENTEXT questions. 
        In multiple-choice questions, if a user selects one correct and one incorrect option, the rating should be "SO-SO". 
        Provide detailed feedback in English, particularly for OPENTEXT responses. Correct specific errors, offer suggestions for improvement, and assess language coherence and accuracy.
        
        The JSON structure should be as follows:
      
        interface Calificate {
          questions: [
            {
              id: string;
              feedback: {
                feedback: string; // At least 600 characters explaining why the answer is correct, incorrect, or so-so.
                status: "WELLDONE" | "SO-SO" | "WRONG";
              }, ...
            ]
          score: 0-100; // Score based on the overall analysis of the responses.
        }
      
        Ensure the feedback is critical and detailed, and the score accurately reflects the overall performance in the exam.
      
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
