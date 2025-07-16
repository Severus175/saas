import { useAuth } from '@clerk/clerk-react';
import { Hash, Sparkles } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const BlogTitles = () => {
  const blogCategories = ['General', 'Technology', 'Business', 'Health', 'Lifestyle', 'Education', 'Travel', 'Food'];

  const [selectedCategory, setSelectedCategory] = useState('General');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const prompt = `Generate a blog title for the keyword ${input} in the category ${selectedCategory}`;

      const { data } = await axios.post(
        '/api/ai/generate-blog-title',
        { prompt },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <div className='h-full overflow-y-auto p-6 flex flex-col lg:flex-row items-start justify-center gap-6 text-white bg-black'>

      {/* Left Panel - Form */}
      <form onSubmit={onSubmitHandler} className='w-full lg:w-1/2 p-5 bg-[#111111] rounded-lg border border-purple-500/20 shadow-[0_0_10px_#8e37eb30]'>
        <div className='flex items-center gap-3 text-purple-400'>
          <Sparkles className='w-6' />
          <h1 className='text-xl font-semibold text-white'>AI Title Generator</h1>
        </div>

        <p className='mt-6 text-sm font-medium text-gray-300'>Keyword</p>
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type='text'
          className='w-full p-2 px-3 mt-2 text-sm bg-[#1a1a1a] border border-purple-500/20 rounded-md outline-none text-white placeholder-gray-500'
          placeholder='The future of artificial intelligence is...'
          required
        />

        <p className='mt-4 text-sm font-medium text-gray-300'>Category</p>
        <div className='mt-3 flex gap-3 flex-wrap'>
          {blogCategories.map((item) => (
            <span
              key={item}
              onClick={() => setSelectedCategory(item)}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer transition-all ${
                selectedCategory === item
                  ? 'bg-purple-800/30 text-purple-300 border-purple-400'
                  : 'text-gray-400 border-gray-600 hover:border-purple-500 hover:text-white'
              }`}
            >
              {item}
            </span>
          ))}
        </div>

        <button
          disabled={loading}
          className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#C341F6] to-[#8E37EB] text-white px-4 py-2 mt-6 text-sm rounded-lg transition-all hover:scale-105 active:scale-95'
        >
          {loading ? (
            <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span>
          ) : (
            <Hash className='w-5' />
          )}
          Generate title
        </button>
      </form>

      {/* Right Panel - Output */}
      <div className='w-full lg:w-1/2 p-5 bg-[#111111] rounded-lg border border-purple-500/20 shadow-[0_0_10px_#8e37eb30] min-h-96 max-h-[600px] overflow-hidden'>
        <div className='flex items-center gap-3 text-purple-400'>
          <Hash className='w-5 h-5' />
          <h1 className='text-xl font-semibold text-white'>Generated titles</h1>
        </div>

        {!content ? (
          <div className='flex-1 flex justify-center items-center h-full'>
            <div className='text-sm flex flex-col items-center gap-5 text-gray-500 mt-10'>
              <Hash className='w-9 h-9' />
              <p>Enter a topic and click “Generate title” to get started</p>
            </div>
          </div>
        ) : (
          <div className='mt-3 h-full overflow-y-scroll text-sm text-gray-300'>
            <div className='reset-tw'>
              <Markdown>{content}</Markdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogTitles;
