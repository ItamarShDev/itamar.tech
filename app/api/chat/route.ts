import { GoogleGenAI } from "@google/genai";
type Model =
  | "gemini-2.5-pro-preview-05-06"
  | "gemini-2.5-flash-preview-05-20"
  | "gemini-2.0-flash"
  | "gemini-2.0-flash-lite";

async function chat(model: Model, message: string) {
  const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
  const chat = ai.chats.create({
    model,
  });
  return await chat.sendMessageStream({
    message,
  });
}

function iteratorToStream(iterator: Awaited<ReturnType<typeof chat>>) {
  return new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of iterator) {
          const text = chunk.text;
          if (text) {
            controller.enqueue(text);
          }
        }
        controller.close();
      } catch (error) {
        console.error("Stream error:", error);
        controller.error(error);
      }
    },
  });
}
export async function POST(request: Request) {
  const payload = await request.json();
  if (!payload.message) {
    return Response.json({ error: "No message provided" }, { status: 400 });
  }
  const model = payload.model as Model;
  if (!model) {
    return Response.json({ error: "No model provided" }, { status: 400 });
  }
  const stream = iteratorToStream(await chat(model, payload.message));
  return new Response(stream);
}
