import {
    createDataStreamResponse,
    streamText,
    tool,
} from 'ai';

import { createVertex } from '@ai-sdk/google-vertex';
import { z } from 'zod';

export async function POST(req: Request) {
  try {

    const vertex = createVertex({
      googleAuthOptions: {
        credentials: {
          client_email: process.env.GCP_SERVICE_ACCOUNT_EMAIL,
          private_key: process.env.GCP_PRIVATE_KEY,
        },
      },
    });
    const { messages } = await req.json();

    const MessageSchema = z.object({
      patterns: z.string().nullable().describe('List of patterns'),
      matches: z.string().nullable().describe('Result data that matches any pattern.'),
    });

    const PIIDetectorPrompt = `
    1- detect PII <patterns> in images and pdf files provided.
    2- send matches as a parameter into a comma separated list.
    3- finally matches parsed as enumarated list with "\n + \n" between each value

    <patterns>
      - Email addresses
      - Phone numbers
      - Social security numbers
      - Credit card numbers
      - Names (if possible within the time constraint)
    </patterns>
  `;

    return createDataStreamResponse({
      execute: (dataStream) => {
        const result = streamText({
          model: vertex('gemini-2.0-flash'),
          system: `If the user provides attached file, always call the "PIIDetector" tool.
                   otherwise act as a friendly assistant! Keep your responses concise and helpful..`,
          messages: messages,
          maxSteps: 5,
          tools: {
            PIIDetector: tool({
              description: `You are a detector of common potential personally identifiable information assistant scan file using this prompt "${PIIDetectorPrompt}".`,
              parameters: MessageSchema,
              execute: async ({ matches }) => {
                return matches || "no relevant data was found"
              }
            })
          }
        });
          result.toDataStream();

          result.mergeIntoDataStream(dataStream, {
            sendReasoning: true
          });
      },
      onError: (error) =>  {
        console.error(error)
        return 'Oops, an error occurred!'
      },
    });
  } catch (error) {
    return new Response(`An error occurred while processing your request! ${error}`, {
      status: 500,
    });
  }
}      