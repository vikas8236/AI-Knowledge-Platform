import { useState } from 'react'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'
import Sidebar from '../components/Sidebar'
import ChatHeader from '../components/ChatHeader'
import MessageList from '../components/MessageList'
import MessageInput from '../components/MessageInput'

export default function ChatPage() {
  const { user } = useAuth()
  const [messages, setMessages] = useState([
    {
      id: '1',
      role: 'assistant',
      content: `Hey${user?.username ? ` ${user.username}` : ''}! I'm Zia, your AI assistant. How can I help you today?`,
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await api.post('/api/v1/chat/', { message: input })

      const aiMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.data.response || 'No response received',
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      const detail = error.response?.status === 401
        ? 'Your session has expired. Please sign in again.'
        : 'Sorry, I encountered an error. Please try again.'

      setMessages((prev) => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: detail,
        timestamp: new Date(),
        isError: true,
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-screen flex bg-slate-900">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <ChatHeader />
        <MessageList messages={messages} isLoading={isLoading} username={user?.username} />
        <MessageInput
          input={input}
          setInput={setInput}
          onSend={sendMessage}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}
