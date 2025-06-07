import { getChat } from "./chat-factory";
import type { Message, Model } from "./types";

export async function POST(request: Request) {
  const payload = await request.json();
  const messages = payload.messages as Message[];
  const model = payload.model as Model;
  if (!messages) {
    return Response.json({ error: "No messages provided" }, { status: 400 });
  }
  if (!model) {
    return Response.json({ error: "No model provided" }, { status: 400 });
  }
  const chatProvider = getChat(model);
  if (!chatProvider) {
    return Response.json({ error: "Model not supported" }, { status: 400 });
  }
  const stream = await chatProvider(model, messages);
  return new Response(stream);
}
