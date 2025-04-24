import Image from "next/image";

import { createGroq } from '@ai-sdk/groq';
import { generateText } from 'ai';

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY!,
});

export default function Home() {

  (async function callGroq() {
    const result = await generateText({
      model: groq('qwen-qwq-32b'),
      providerOptions: {
        groq: { reasoningFormat: 'parsed' },
      },
      prompt:'How many "r"s are in the word "strawberry"?',
    });
    console.log("RR", result.text)
  })()

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)] list-none">
          <li className="mb-2 tracking-[-.01em]">
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row ">
          <button
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto ml-auto"
          >
            Send
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
          </button>

        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
