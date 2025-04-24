// app/actions/groq.ts
'use server';

import { createGroq } from '@ai-sdk/groq';
import { generateText } from 'ai';

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function callGroq(prompt: string) {
//   const result = await groq.chat.completions.create({
//     model: 'mixtral-8x7b-32768',
//     messages: [{ role: 'user', content: prompt }],
//   });
  const result = await generateText({
    model: groq('qwen-qwq-32b'),
    providerOptions: {
      groq: { reasoningFormat: 'parsed' },
    },
    prompt:prompt,
  });
  return result.text;
}
