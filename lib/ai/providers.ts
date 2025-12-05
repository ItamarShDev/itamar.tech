import { GoogleGenAI } from '@google/genai';
import Groq from 'groq-sdk';

// TanStack AI doesn't have adapter packages yet, so we'll create our own adapters
// that follow the TanStack AI pattern

export const groqAdapter = {
  fetch: async ({ messages, temperature, maxTokens }: any) => {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || '' });
    
    const completion = await groq.chat.completions.create({
      messages: messages.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      })),
      model: 'llama-3.1-8b-instant',
      temperature: temperature || 0.7,
      max_tokens: maxTokens || 1000,
      stream: false,
    });

    return {
      text: completion.choices[0]?.message?.content || '',
    };
  },
};

export const geminiAdapter = {
  fetch: async ({ messages, temperature, maxTokens }: any) => {
    const genAI = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY || '' });
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    // Convert system message to user message for Gemini (it doesn't support system messages)
    const convertedMessages = messages.map((msg: any) => {
      if (msg.role === 'system') {
        return {
          role: 'user' as const,
          parts: [{ text: `System context: ${msg.content}` }]
        };
      }
      return {
        role: msg.role === 'user' ? 'user' as const : 'model' as const,
        parts: [{ text: msg.content }]
      };
    });

    const result = await model.generateContent({
      contents: convertedMessages,
      generationConfig: {
        temperature: temperature || 0.7,
        maxOutputTokens: maxTokens || 1000,
      },
    });

    return {
      text: result.response.text(),
    };
  },
};

// Default adapter - prefer Groq (generous free tier)
export const getDefaultAdapter = () => {
  // Try Groq first (generous free tier)
  if (process.env.GROQ_API_KEY) {
    return groqAdapter;
  }
  
  // Fallback to Gemini
  if (process.env.GOOGLE_GENAI_API_KEY) {
    return geminiAdapter;
  }
  
  throw new Error('No AI provider configured');
};

// Model configurations
export const modelConfigs = {
  groq: {
    model: 'llama-3.1-8b-instant',
    temperature: 0.7,
    maxTokens: 1000,
  },
  gemini: {
    model: 'gemini-1.5-flash',
    temperature: 0.7,
    maxTokens: 1000,
  },
};

export const getDefaultModel = () => {
  if (process.env.GROQ_API_KEY) {
    return modelConfigs.groq;
  }
  
  if (process.env.GOOGLE_GENAI_API_KEY) {
    return modelConfigs.gemini;
  }
  
  throw new Error('No AI provider configured');
};
