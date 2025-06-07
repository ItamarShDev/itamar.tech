function getGeminiModelsList() {
  return [
    "gemini-2.0-flash-lite",
    "gemini-2.0-flash",
    "gemini-2.5-flash-preview-05-20",
  ];
}
export function isGeminiModel(model: string) {
  const models = getGeminiModelsList();
  return models.some((geminiModel) => geminiModel === model);
}

function getGroqModelsList() {
  return [
    "gemma2-9b-it",
    "llama-3.3-70b-versatile",
    "llama-3.1-8b-instant",
    "llama-guard-3-8b",
    "llama3-70b-8192",
    "llama3-8b-8192",
  ];
}

export function isGroqModel(model: string) {
  const models = getGroqModelsList();
  return models.some((groqModel) => groqModel === model);
}

export function getModels() {
  const geminiModels = getGeminiModelsList();
  const groqModels = getGroqModelsList();
  const models = [...geminiModels, ...groqModels];
  return models;
}
