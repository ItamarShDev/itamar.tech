import { getGeminiStream } from "./gemini";
import { getGroqChatCompletion } from "./groq";
import { isGeminiModel, isGroqModel } from "./model-groups";
import type { Model } from "./types";

export function getChat(model: Model) {
  if (isGeminiModel(model)) {
    return getGeminiStream;
  }
  if (isGroqModel(model)) {
    return getGroqChatCompletion;
  }
}
