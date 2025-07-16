import React, { useState, useEffect } from 'react'

const RefreshLoader = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsLoading(false), 300)
          return 100
        }
        return prev + Math.random() * 12
      })
    }, 80)

    return () => clearInterval(interval)
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
      {/* Subtle Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-md mx-auto px-8">
        {/* Professional Logo */}
        <div className="mb-12">
          <div className="w-16 h-16 mx-auto mb-6 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-500 rounded-lg animate-pulse" />
            <div className="absolute inset-0.5 bg-black rounded-lg flex items-center justify-center">
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                SZ
              </span>
            </div>
          </div>
          
          <h1 className="text-2xl font-semibold text-white mb-2 tracking-wide">
            ScriptZen AI
          </h1>
          <p className="text-gray-400 text-sm">
            Initializing AI workspace
          </p>
        </div>

        {/* Progress Section */}
        <div className="space-y-4">
          <div className="flex justify-between text-sm text-gray-400">
            <span>Loading</span>
            <span>{Math.round(progress)}%</span>
          </div>
          
          <div className="w-full bg-gray-800 rounded-full h-1 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-blue-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Status Messages */}
        <div className="mt-8 space-y-2 text-xs text-gray-500 font-mono">
          {progress > 20 && (
            <div className="opacity-60">✓ AI modules loaded</div>
          )}
          {progress > 50 && (
            <div className="opacity-60">✓ Neural networks initialized</div>
          )}
          {progress > 80 && (
            <div className="opacity-60">✓ Workspace ready</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RefreshLoader