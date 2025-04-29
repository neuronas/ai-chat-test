
"use client"
import Image from "next/image";
import { useState, useEffect, useRef } from 'react'
import { Messages } from './Messages';
import { useChat } from '@ai-sdk/react';
import { Spinner } from '../utils/Icons';
import FileUpload from './FileUpload';

export function Chat() {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [attachments, setAttachments] = useState<Array<File>>([]);
  const [toolInvocation, setToolInvocation] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    status
  } = useChat({
    onError: (error) => {
      console.log("error-----------", error)
      setError(error?.message || JSON.stringify(error))
    }
  });

  const fileArrayToFileList = (files: File[]): FileList => {
    const dataTransfer = new DataTransfer();
    files.forEach(file => dataTransfer.items.add(file));
    return dataTransfer.files;
  }

  const submit = () => {
    if (attachments.length) {
      handleSubmit(undefined, {
        experimental_attachments: fileArrayToFileList(attachments)
      });

      setAttachments([]);
    } else {
      handleSubmit()
    }
  }

  useEffect(() => {
    const lastMsg = messages[messages.length - 1]
    if (lastMsg) {
      const lastParts = lastMsg?.parts[lastMsg?.parts.length -1]
      if (lastParts && lastParts.type === "tool-invocation") {
        setToolInvocation(true)
      } else {
        setToolInvocation(false)
      }
    }
  }, [messages])

  return (
    <div className="flex flex-col bg-gray-100 h-full rounded-xl mb-10 border border-gray-200">
      <Messages msgHistory={messages} toolInvocation={toolInvocation} errorMsg={error}/>

      <div className="flex gap-4 items-center w-full justify-end p-5">
        <textarea
          ref={inputRef}
          value={input}
          onChange={handleInputChange}
          className="flex w-full border border-input px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm min-h-[24px] max-h-[calc(75dvh)] overflow-hidden resize-none rounded-2xl !text-base bg-muted pb-10 dark:border-zinc-700"
          placeholder="Send a message..."
          onKeyDown={(event) => {
            if (
              event.key === 'Enter' &&
              !event.shiftKey &&
              !event.nativeEvent.isComposing
            ) {
              event.preventDefault();

              if (status !== 'ready') {
                // toast.error('Please wait for the model to finish its response!');
              } else {
                submit()
              }
            }
          }}
        />

        <div className="flex flex-col gap-1 w-1/6">
          <button
            disabled={status !== "ready"}
            className="max-w-xs w-full rounded-xl border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 ml-auto"
            onClick={submit}
          >
            {status === "ready"
              ? (
                <>
                  Send
                  <Image
                    className="dark:invert"
                    src="/vercel.svg"
                    alt="Vercel logomark"
                    width={20}
                    height={20}
                  />
                </>
              )
              :
              <Spinner />
              }
          </button>
          <FileUpload files={attachments} setFiles={setAttachments}/>
        </div>
      </div>
    </div>
  )
}