
"use client"
import type { Message } from './Chat'

export function Messages({msgHistory}:{msgHistory: Message[]}) {

  return (
    <div className="h-full p-10 ">
      <div className="text-sm/6 font-[family-name:var(--font-geist-mono)]">
        {msgHistory.map((item, k) => {
          if (item.type === "user") {
            return (<div key={k} className="flex text-right flex-row-reverse">
              <div key={k} className="flex border border-zinc-300 bg-gray-300 rounded-xl mb-2 p-3">
                <span>
                  {item.text}
                </span>
              </div>
            </div>)
          } else {
            return (<div key={k} className="flex">
              <div key={k} className="flex mb-2 p-3">
                <span>
                  {item.text}
                </span>
              </div>
            </div>
            )
          }
        })}
      </div>
    </div>
  )
}