import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string;

export const POST = async (req: Request) => {
  if (req.method !== "POST") {
    return new Response(null, { status: 405 }); // Method Not Allowed
  }

  const { description, tone, file, imageMimeType } = await req.json();

  const prompt = `
  Generate a social media caption based on the following input. If an image 
  is provided, refer to it and create a caption that reflects the content of 
  the image. If text is given, incorporate it naturally into the caption. 
  Add relevant hashtags. Keep the caption short (1-2 lines) unless otherwise specified. Use simple, concise language. 
  Return the result as a JSON object with the following fields: caption, tags, and topic.
  
  This is an example to refer to for the format: \n
  {
  "caption": "Enjoying a sunny day at the beach!",
  "tags": ["#beachday", "#sunshine", "#summerfun"],
  "topic": "Traveling"
  }
  \n
  The caption should be based on the below description.
  tone: ${tone} \n
  description: ${description}
  `;

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    if (file) {
      const base64Data = file.toString("base64");
      const result = await model.generateContent([
        prompt,
        {
          inlineData: {
            data: base64Data,
            mimeType: imageMimeType,
          },
        },
      ]);
      const responseText = result.response.text();

      return new Response(JSON.stringify({ message: responseText }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    return new Response(JSON.stringify({ message: responseText }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error:", error.message);
    return new Response(JSON.stringify({ error: "Failed to generate text" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
