export default function MessageBubble({ message, username }) {
  const isUser = message.role === 'user'
  const initial = username?.charAt(0)?.toUpperCase() || '?'

  return (
    <div className={`flex gap-3 py-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${
        isUser
          ? 'bg-indigo-500 text-white font-medium'
          : 'bg-slate-700 text-lg'
      }`}>
        {isUser ? initial : '🤖'}
      </div>

      <div className={`max-w-[75%] ${isUser ? 'text-right' : ''}`}>
        <div className={`inline-block px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? 'bg-indigo-500 text-white rounded-tr-sm'
            : message.isError
              ? 'bg-red-500/10 border border-red-500/20 text-red-300 rounded-tl-sm'
              : 'bg-slate-800 text-slate-200 border border-slate-700/50 rounded-tl-sm'
        }`}>
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>
        <p className="text-[11px] text-slate-500 mt-1 px-1">
          {message.timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </div>
  )
}
