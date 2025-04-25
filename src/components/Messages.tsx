
"use client"

export function Messages({msgHistory}:{msgHistory: string[]}) {

  return (
    <div className="flex flex-col min-w-0 gap-6 flex-1 overflow-y-scroll pt-4">
      <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)] list-none">
        {msgHistory.map((v) => (
          <li className="mb-2 tracking-[-.01em]">
            {v}
          </li>
        ))}
      </ol>
    </div>
  )
}