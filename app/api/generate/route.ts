import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextApiResponse } from "next";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string;
type ResponseData = {
  message: string;
};

export const POST = async (
  req: Request,
  res: NextApiResponse<ResponseData>
) => {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  const { description, tone } = await req.json();

  const prompt = `
  Generate a social media caption based on the following input. If an image 
  is provided, refer to it and create a caption that reflects the content of 
  the image. If text is given, incorporate it naturally into the caption. 
  Add relevant hashtags. Keep the caption short (1-2 lines) unless otherwise specified. Use simple, concise language. 
  Return the result as a JSON object with the following fields: caption and tags
  
  Don't add tags with caption.

  This is an example to reffer for the format: \n
  {
  "caption": "Enjoying a sunny day at the beach!",
  "tags": ["#beachday", "#sunshine", "#summerfun"]
  }
  \n
  The caption ashould be based on the below description.
  Here is the tone and the descriptionand: \n
  tone: ${tone} \n
  description: ${description}
  `;

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    return new Response(JSON.stringify({ message: responseText }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Failed to generate text" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
