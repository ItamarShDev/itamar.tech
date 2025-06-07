import Groq from "groq-sdk";
import type { Stream } from "groq-sdk/lib/streaming";
import type {
  ChatCompletionChunk,
  ChatCompletionCreateParamsBase,
} from "groq-sdk/resources/chat/completions";
import type { Message } from "./types";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function getGroqModels() {
  return await groq.models.list();
}

function iteratorToStream(iterator: Stream<ChatCompletionChunk>) {
  return new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of iterator) {
          const text = chunk.choices[0].delta.content;
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

export async function getGroqChatCompletion(
  model: ChatCompletionCreateParamsBase["model"],
  messages: Message[]
) {
  return iteratorToStream(
    await groq.chat.completions.create({
      messages: messages.map((message) => ({
        role: message.type === "message" ? "user" : "assistant",
        content: message.content,
      })),
      model,
      stop: null,
      stream: true,
    })
  );
}
