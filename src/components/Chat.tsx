
"use client"
import Image from "next/image";
import { useState } from 'react'
import { callGroq } from '../actions/groq';

export function Chat() {

  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');

  const handleAsk = async () => {
    const answer = await callGroq(question);
    console.log("RR", answer)

    setResponse(answer);
  };

  return (
    <div className="w-full md:w-auto">
      <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)] list-none">
        <li className="mb-2 tracking-[-.01em]">
          {response}
        </li>
      </ol>

      <div className="flex gap-4 items-center">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder='ask something'
          className="w-5/6"
        />
        <div className=" w-1/6">
          <button
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto ml-auto"
            onClick={handleAsk}
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
      </div>
    </div>
  )
}