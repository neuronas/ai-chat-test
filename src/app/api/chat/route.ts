import {
    createDataStreamResponse,
    streamText,
} from 'ai';

import { createVertex } from '@ai-sdk/google-vertex';

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

    return createDataStreamResponse({
      execute: (dataStream) => {
        const result = streamText({
          model: vertex('gemini-2.0-flash'),
          messages: messages
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