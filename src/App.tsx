import React, { useState } from 'react'
import { Youtube, Scissors, Video } from 'lucide-react'

interface Clip {
  title: string
  url: string
}

function App() {
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [clips, setClips] = useState<Clip[]>([])
  const [progress, setProgress] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setProgress('')
    setError('')
    setClips([])

    try {
      const response = await fetch('/api/process-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) {
        throw new Error('Server error')
      }

      const data = await response.json()
      setClips(data.clips)
      setProgress('Video processed successfully!')
    } catch (error) {
      console.error('Error:', error)
      setError('An error occurred while processing the video. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8 text-center text-white">YouTube to Viral Clips Converter</h1>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center border-2 border-gray-300 rounded-md overflow-hidden focus-within:border-blue-500 transition duration-300">
            <div className="bg-red-600 p-2">
              <Youtube className="text-white" size={24} />
            </div>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter YouTube URL"
              className="flex-grow p-2 outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-md hover:from-blue-600 hover:to-purple-700 transition duration-300 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="animate-spin mr-2">&#9696;</span>
            ) : (
              <Scissors className="mr-2" size={20} />
            )}
            {isLoading ? 'Processing...' : 'Generate Clips'}
          </button>
        </form>
        {progress && <p className="mt-4 text-green-600">{progress}</p>}
        {error && <p className="mt-4 text-red-600">{error}</p>}
      </div>
      {clips.length > 0 && (
        <div className="mt-8 w-full max-w-4xl">
          <h2 className="text-2xl font-semibold mb-4 text-white">Generated Clips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {clips.map((clip, index) => (
              <div key={index} className="bg-white p-4 rounded-md shadow-lg">
                <div className="flex items-center mb-2">
                  <Video className="mr-2 text-purple-600" size={20} />
                  <span className="font-semibold">{clip.title}</span>
                </div>
                <video controls src={clip.url} className="w-full rounded-md" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default App