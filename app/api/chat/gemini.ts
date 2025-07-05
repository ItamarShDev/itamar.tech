import { GoogleGenAI } from "@google/genai";
import type { Message, Model } from "./types";

// Lazy initialization to avoid build-time errors when env vars are missing
function getGeminiClient() {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    throw new Error("GOOGLE_API_KEY environment variable is required");
  }
  return new GoogleGenAI({ apiKey });
}

export async function getGeminiModels() {
  const ai = getGeminiClient();
  return ai.models.list();
}

async function chat(model: Model, messages: Message[]) {
  const ai = getGeminiClient();
  const chat = ai.chats.create({
    model,
  });
  const context = messages
    .splice(0, messages.length - 1)
    .map((message) => message.content)
    .join("\n");
  const messageWithContext = `previous context: ${context}\nnew message: \n${
    messages[messages.length - 1].content
  }`;
  return await chat.sendMessageStream({
    message: messageWithContext,
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

export async function getGeminiStream(model: Model, messages: Message[]) {
  return iteratorToStream(await chat(model, messages));
}
