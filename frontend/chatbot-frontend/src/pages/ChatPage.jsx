import { useState, useEffect, useCallback } from 'react'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'
import Sidebar from '../components/Sidebar'
import ChatHeader from '../components/ChatHeader'
import MessageList from '../components/MessageList'
import MessageInput from '../components/MessageInput'

const welcomeMessage = (username) => ({
  id: 'welcome',
  role: 'assistant',
  content: `Hey${username ? ` ${username}` : ''}! I'm Zia, your AI assistant. How can I help you today?`,
  timestamp: new Date(),
})

export default function ChatPage() {
  const { user } = useAuth()
  const [messages, setMessages] = useState([welcomeMessage(user?.username)])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [conversationId, setConversationId] = useState(null)
  const [conversations, setConversations] = useState([])

  const fetchConversations = useCallback(async () => {
    try {
      const res = await api.get('/api/v1/conversations/')
      setConversations(res.data)
    } catch {
      // silently fail — sidebar just stays empty
    }
  }, [])

  useEffect(() => {
    fetchConversations()
  }, [fetchConversations])

  const startNewChat = () => {
    setMessages([welcomeMessage(user?.username)])
    setConversationId(null)
    setInput('')
  }

  const loadConversation = async (id) => {
    try {
      const res = await api.get(`/api/v1/conversations/${id}/messages`)
      const loaded = res.data.map((msg) => ({
        id: msg.id.toString(),
        role: msg.role,
        content: msg.content,
        timestamp: msg.created_at,
      }))
      setMessages(loaded)
      setConversationId(id)
      setInput('')
    } catch {
      // if it fails, stay on current chat
    }
  }

  const deleteConversation = async (id) => {
    try {
      await api.delete(`/api/v1/conversations/${id}`)
      if (conversationId === id) {
        startNewChat()
      }
      fetchConversations()
    } catch {
      // silently fail
    }
  }

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
      const payload = { message: input }
      if (conversationId) payload.conversation_id = conversationId

      const response = await api.post('/api/v1/chat/', payload)

      if (!conversationId) {
        setConversationId(response.data.conversation_id)
        fetchConversations()
      }

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
      <Sidebar
        conversations={conversations}
        activeConversationId={conversationId}
        onNewChat={startNewChat}
        onSelectConversation={loadConversation}
        onDeleteConversation={deleteConversation}
      />
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
