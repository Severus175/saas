import { Edit, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'
import Markdown from 'react-markdown'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const WriteArticle = () => {
  const articleLength = [
    { length: 800, text: 'Short (500-800 words)' },
    { length: 1200, text: 'Medium (800-1200 words)' },
    { length: 1600, text: 'Long (1200+ words)' },
  ]

  const [selectedLength, setSelectedLength] = useState(articleLength[0])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')
  const { getToken } = useAuth()

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const prompt = `Write an article about ${input} in ${selectedLength.text}`

      const { data } = await axios.post(
        '/api/ai/generate-article',
        { prompt, length: selectedLength.length },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      )

      if (data.success) {
        setContent(data.content)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  return (
    <div className='h-full overflow-y-auto p-6 flex flex-col lg:flex-row items-start justify-center gap-6 text-white'>
      
      {/* Left Column - Form */}
      <form
        onSubmit={onSubmitHandler}
        className='w-full lg:w-1/2 p-5 bg-[#111213] border border-[#2a2a2a] rounded-xl shadow-md'
      >
        <div className='flex items-center gap-3'>
          <Sparkles className='w-6 text-[#65adff]' />
          <h1 className='text-xl font-semibold'>Article Configuration</h1>
        </div>

        <p className='mt-6 text-sm text-gray-300'>Article Topic</p>
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type='text'
          className='w-full mt-2 p-2 px-3 bg-black/20 text-sm text-white placeholder:text-gray-500 rounded-md border border-[#3a3a3a] focus:outline-none'
          placeholder='The future of artificial intelligence is...'
          required
        />

        <p className='mt-4 text-sm text-gray-300'>Article Length</p>
        <div className='mt-3 flex gap-3 flex-wrap'>
          {articleLength.map((item, index) => (
            <span
              onClick={() => setSelectedLength(item)}
              className={`text-xs px-4 py-1 rounded-full border cursor-pointer transition-all ${
                selectedLength.text === item.text
                  ? 'bg-blue-700/20 border-blue-400 text-blue-300'
                  : 'border-gray-700 text-gray-400 hover:bg-white/5'
              }`}
              key={index}
            >
              {item.text}
            </span>
          ))}
        </div>

        <button
          disabled={loading}
          className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#226BFF] to-[#65ADFF] text-white px-4 py-2 mt-6 text-sm rounded-lg hover:shadow-lg active:scale-95 transition-all'
        >
          {loading ? (
            <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span>
          ) : (
            <Edit className='w-5' />
          )}
          Generate article
        </button>
      </form>

      {/* Right Column - Output */}
      <div className='w-full lg:w-1/2 p-5 bg-[#111213] rounded-xl border border-[#2a2a2a] min-h-96 max-h-[600px] overflow-hidden'>
        <div className='flex items-center gap-3 text-white'>
          <Edit className='w-5 h-5 text-[#65adff]' />
          <h1 className='text-xl font-semibold'>Generated article</h1>
        </div>

        {!content ? (
          <div className='flex-1 flex justify-center items-center h-full'>
            <div className='text-sm flex flex-col items-center gap-4 text-gray-500'>
              <Edit className='w-9 h-9' />
              <p>Enter a topic and click “Generate article” to get started</p>
            </div>
          </div>
        ) : (
          <div className='mt-3 h-full overflow-y-scroll text-sm text-gray-200'>
            <div className='reset-tw prose prose-invert max-w-none'>
              <Markdown>{content}</Markdown>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default WriteArticle
