// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

// It's better to use an environment variable for API keys
const API_KEY = process.env.API_KEY_OPENIA || "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";

type Data = {
  name: string;
};

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    // Extract prompt from request body
    const { prompt } = req.body;

    // Call the GPT function with the provided prompt
    const data = await GPT(prompt);
    res.status(200).json({ name: String(data) });
  } catch (error: any) {
    res.status(500).json({ name: "Error: " + error.message });
  }
}

// This function makes a request to the OpenAI API
const GPT = async (prompt: string) => {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo", 
    messages: [{ role: "user", content: prompt }],
    
  });

  return response.choices[0].message.content;
};


/**
 * import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const prosConsDicusserUseCase = async (
  openai: OpenAI,
  { prompt }: Options,
) => {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `
        Se te dará una pregunta y tu tarea es dar una respuesta con pros y contras,
        la respuesta debe de ser en formato markdown,
        los pros y contras deben de estar en una lista,
      `,
      },
      { role: 'user', content: prompt },
    ],
    model: 'gpt-3.5-turbo-1106',
    // Creativity
    temperature: 0.3,
    // max_tokens: 100,
  });

  return completion.choices[0].message;
};

 */