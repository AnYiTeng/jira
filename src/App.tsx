import React from 'react'
import { UnAuthenticated } from 'unauthenticated-app'
import { Authenticated } from 'authenticated-app'
import { useAuth } from 'context/auth-context'
import { ErrorBoundary } from 'components/error-boundary'
import { FullPageErrorFallback } from 'components/lib'
import './App.css'

function App() {
  const { user } = useAuth()

  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <Authenticated /> : <UnAuthenticated />}
      </ErrorBoundary>
    </div>
  )
}

export default App
