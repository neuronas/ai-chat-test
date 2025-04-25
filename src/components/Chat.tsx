
"use client"
import Image from "next/image";
import { useState, useRef } from 'react'
import { callProvider } from '../actions/provider';
import { Messages } from './Messages';
import { useChat } from '@ai-sdk/react';

export function Chat() {

  const [question, setQuestion] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const {
    messages,
    input,
    handleInputChange,
    append,
    status,
  } = useChat({
    onError: (error) => {
      console.log("error-----------", error)
    }
  });

  async function handleSubmit(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    const userMessage = input.trim();
    if (!userMessage) return;

    // Add user's message
    await append({ role: 'user', content: userMessage });

    // Call Groq API
    const answer = await callProvider(userMessage);

    // Add AI response
    await append({ role: 'assistant', content: answer });
  }

  return (
    <div className="flex flex-col bg-gray-100 h-full rounded-xl mb-10 border border-gray-200">
      <Messages msgHistory={messages} />

      <div className="flex gap-4 items-center w-full justify-end p-5">
        <textarea
          ref={inputRef}
          value={input}
          onChange={handleInputChange}
          className="flex w-full border border-input px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm min-h-[24px] max-h-[calc(75dvh)] overflow-hidden resize-none rounded-2xl !text-base bg-muted pb-10 dark:border-zinc-700"
          placeholder="Send a message..."
        />

        <div className=" w-1/6">
          <button
            className="rounded-xl border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto ml-auto"
            onClick={handleSubmit}
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