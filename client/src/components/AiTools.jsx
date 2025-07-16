import React from 'react'
import { AiToolsData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'

const AiTools = () => {
  const navigate = useNavigate()
  const { user } = useUser()

  return (
    <div className='px-4 sm:px-20 xl:px-32 my-24 py-16 bg-black text-white'>
      <div className='text-center'>
        <h2 className='text-[42px] font-semibold text-white'>Powerful AI Tools</h2>
        <p className='text-gray-400 max-w-lg mx-auto'>
          Everything you need to create, enhance, and optimize your content with cutting-edge AI technology.
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 px-4 sm:px-0'>
  {AiToolsData.map((tool, index) => (
    <div
      key={index}
      className='p-8 rounded-xl bg-[#111111] border border-purple-600/30 shadow-[0_0_15px_#8b5cf6] hover:shadow-purple-500/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer'
      onClick={() => user && navigate(tool.path)}
    >
      <tool.Icon
        className='w-12 h-12 p-3 text-white rounded-xl'
        style={{ background: `linear-gradient(to bottom, ${tool.bg.from}, ${tool.bg.to})` }}
      />
      <h3 className='mt-6 mb-3 text-lg font-semibold text-white'>{tool.title}</h3>
      <p className='text-gray-400 text-sm'>{tool.description}</p>
    </div>
  ))}
</div>
    </div>
  )
}

export default AiTools
