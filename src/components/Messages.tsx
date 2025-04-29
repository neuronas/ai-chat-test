
"use client"
import type { UIMessage } from 'ai';
import { Spinner } from '../utils/Icons';

export function Messages(
  {
    msgHistory,
    toolInvocation,
    errorMsg
  }:
  {
    msgHistory: UIMessage[],
    toolInvocation: boolean,
    errorMsg: string
  }) {

  return (
    <div className="h-full p-10 overflow-y-scroll">
      <div className="text-sm/6 font-[family-name:var(--font-geist-mono)]">
        {msgHistory.map((item, k) => {
          if (item.role === "user") {
            return (<div key={k} className="flex text-right flex-row-reverse">
              <div key={k} className="flex border border-zinc-300 bg-gray-300 rounded-xl mb-2 p-3">
                <span>
                  {item.content}
                </span>
              </div>
            </div>)
          } else {
            return (<div key={k} className="flex">
              <div key={k} className="flex mb-2 p-3">
                <span>
                  {item.content}
                </span>
              </div>
            </div>
            )
          }
        })}
      </div>
      <div className="flex justify-center">
        {toolInvocation &&
          <div className="flex items-center gap-4">
            {`Calling tool...`} <Spinner color="text-black" />
          </div>
        }
        {errorMsg &&
          <div className="text-red-600 bg-red-100 border border-red-300 px-4 py-2 rounded-md">
          {`⚠️ call failed: ${errorMsg}`}
        </div>
        }
      </div>
    </div>
  )
}