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
