import { useEffect, useRef } from 'react'
import MessageBubble from './MessageBubble'
import LoadingIndicator from './LoadingIndicator'

export default function MessageList({ messages, isLoading, username }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  return (
    <div className="flex-1 overflow-y-auto px-6 py-4 bg-slate-850" style={{ backgroundColor: '#0f172a' }}>
      <div className="max-w-3xl mx-auto space-y-1">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} username={username} />
        ))}
        {isLoading && <LoadingIndicator />}
        <div ref={bottomRef} />
      </div>
    </div>
  )
}
