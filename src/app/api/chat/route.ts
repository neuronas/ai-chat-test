import { NextRequest } from 'next/server';

import {
    createDataStreamResponse,
    streamText,
} from 'ai';

import { vertex } from '@ai-sdk/google-vertex';

export async function POST(req: NextRequest) {
  try {
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
      onError: () =>  'Oops, an error occurred!',
    });
  } catch (error) {
    return new Response(`An error occurred while processing your request! ${error}`, {
      status: 500,
    });
  }
}      