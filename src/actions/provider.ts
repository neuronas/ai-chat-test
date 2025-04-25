'use server';

import { generateText } from 'ai';
import { vertex } from '@ai-sdk/google-vertex';

export async function callProvider(prompt: string) {
  const result = await generateText({
    model: vertex('gemini-2.0-flash'),
    prompt: prompt
  });
  return result.text;
}
