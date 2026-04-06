import { useAuth } from '../context/AuthContext'

export default function Sidebar() {
  const { user, logout } = useAuth()

  const initial = user?.username?.charAt(0)?.toUpperCase() || '?'

  return (
    <div className="w-72 bg-slate-900 border-r border-slate-700/50 flex flex-col h-full">
      <div className="p-5 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold text-sm shadow-lg shadow-indigo-500/20">
            {initial}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-medium text-sm truncate">{user?.username}</p>
            <p className="text-slate-400 text-xs truncate">{user?.email}</p>
          </div>
        </div>
      </div>

      <div className="p-3">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700/50 text-slate-300 hover:bg-slate-700/80 hover:text-white transition-all text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-1">
        <p className="text-slate-500 text-xs font-medium uppercase tracking-wider px-4 mb-2">Today</p>
        <div className="px-4 py-2.5 rounded-lg bg-slate-800/60 text-slate-300 text-sm">
          Current conversation
        </div>
      </div>

      <div className="p-3 border-t border-slate-700/50">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sign out
        </button>
      </div>
    </div>
  )
}
