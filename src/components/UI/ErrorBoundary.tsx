'use client'

import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center bg-sci-fi-darker">
            <div className="text-center">
              <h1 className="text-4xl font-orbitron text-gradient mb-4">
                Erreur
              </h1>
              <p className="text-xl text-sci-fi-cyan font-exo mb-6">
                Une erreur s&apos;est produite
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-sci-fi-cyan text-sci-fi-darker font-orbitron rounded-lg hover:glow-effect transition-all"
              >
                Recharger
              </button>
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
}
