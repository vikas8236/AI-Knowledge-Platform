export default function ChatHeader() {
  return (
    <div className="bg-slate-800 border-b border-slate-700/50 px-6 py-4 flex items-center gap-3">
      <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center text-lg shadow-lg shadow-indigo-500/20">
        🤖
      </div>
      <div>
        <h1 className="text-white font-semibold text-sm">Zia</h1>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
          <span className="text-slate-400 text-xs">Online</span>
        </div>
      </div>
    </div>
  )
}
