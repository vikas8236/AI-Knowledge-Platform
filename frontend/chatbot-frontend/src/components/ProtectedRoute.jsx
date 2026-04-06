import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { token, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="flex gap-2">
          <span className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce [animation-delay:0ms]"></span>
          <span className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce [animation-delay:150ms]"></span>
          <span className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce [animation-delay:300ms]"></span>
        </div>
      </div>
    )
  }

  if (!token) return <Navigate to="/login" replace />

  return children
}
