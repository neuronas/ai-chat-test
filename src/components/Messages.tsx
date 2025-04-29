
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
            return (<div key={k} className="flex flex-col text-right flex-row-reverse">
              <div key={k} className="flex flex-col border border-zinc-300 bg-gray-300 rounded-xl mb-2 p-3">
                <Markdown>
                  {item.content}
                </Markdown>
              </div>
            </div>)
          } else {
            return (<div key={k} className="flex flex-col">
              <div key={k} className="flex flex-col mb-2 p-3">
                <Markdown>
                  {item.content}
                </Markdown>
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

import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

const components: Partial<Components> = {
  pre: ({ children }) => <>{children}</>,
  ol: ({ children, ...props }) => {
    return (
      <ol className="list-decimal list-outside ml-4" {...props}>
        {children}
      </ol>
    );
  },
  li: ({ children, ...props }) => {
    return (
      <li className="py-1" {...props}>
        {children}
      </li>
    );
  },
  ul: ({ children, ...props }) => {
    return (
      <ul className="list-decimal list-outside ml-4" {...props}>
        {children}
      </ul>
    );
  },
  strong: ({ children, ...props }) => {
    return (
      <span className="font-semibold" {...props}>
        {children}
      </span>
    );
  },
  a: ({ children, ...props }) => {
    return (
      // @ts-expect-error
      <Link
        className="text-blue-500 hover:underline"
        target="_blank"
        rel="noreferrer"
        {...props}
      >
        {children}
      </Link>
    );
  },
  h1: ({ children, ...props }) => {
    return (
      <h1 className="text-3xl font-semibold mt-6 mb-2" {...props}>
        {children}
      </h1>
    );
  },
  h2: ({ children, ...props }) => {
    return (
      <h2 className="text-2xl font-semibold mt-6 mb-2" {...props}>
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }) => {
    return (
      <h3 className="text-xl font-semibold mt-6 mb-2" {...props}>
        {children}
      </h3>
    );
  },
  h4: ({ children, ...props }) => {
    return (
      <h4 className="text-lg font-semibold mt-6 mb-2" {...props}>
        {children}
      </h4>
    );
  },
  h5: ({ children, ...props }) => {
    return (
      <h5 className="text-base font-semibold mt-6 mb-2" {...props}>
        {children}
      </h5>
    );
  },
  h6: ({ children, ...props }) => {
    return (
      <h6 className="text-sm font-semibold mt-6 mb-2" {...props}>
        {children}
      </h6>
    );
  },
};

const remarkPlugins = [remarkGfm];

function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown remarkPlugins={remarkPlugins} components={components}>
      {children}
    </ReactMarkdown>
  )
}