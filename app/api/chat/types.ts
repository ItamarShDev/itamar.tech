import type { ChatCompletionCreateParamsBase } from "groq-sdk/resources/chat/completions";

export type Model =
  | ChatCompletionCreateParamsBase["model"]
  | "gemini-2.5-pro-preview-05-06"
  | "gemini-2.5-flash-preview-05-20"
  | "gemini-2.0-flash"
  | "gemini-2.0-flash-lite";

export type Message = {
  type: "message" | "response";
  content: string;
};
