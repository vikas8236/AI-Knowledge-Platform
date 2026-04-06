export default function LoadingIndicator() {
  return (
    <div className="flex gap-3 py-3">
      <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-lg flex-shrink-0">
        🤖
      </div>
      <div className="bg-slate-800 border border-slate-700/50 px-4 py-3 rounded-2xl rounded-tl-sm">
        <div className="flex gap-1.5 items-center">
          <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:0ms]"></span>
          <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:150ms]"></span>
          <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:300ms]"></span>
        </div>
      </div>
    </div>
  )
}
