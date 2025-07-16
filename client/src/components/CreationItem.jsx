import React from 'react'
import Markdown from 'react-markdown'

const CreationItem = ({ item, expanded, onExpand }) => {
  return (
    <div
      onClick={onExpand}
      className='p-4 bg-white border border-gray-200 rounded-lg cursor-pointer transition-all duration-300 hover:shadow-md'
    >
      <div className='flex justify-between items-center gap-4'>
        <div>
          <h2 className='font-medium text-black'>{item.prompt}</h2>
          <p className='text-gray-500 text-sm'>
            {item.type} • {new Date(item.created_at).toLocaleDateString()}
          </p>
        </div>
        <button className='bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E40AF] px-4 py-1 rounded-full text-xs font-medium'>
          {item.type}
        </button>
      </div>

      {expanded && (
        <div className='mt-4 text-sm text-slate-700'>
          {item.type === 'image' ? (
            <img
              src={item.content}
              alt='Generated'
              className='mt-2 w-full max-w-md rounded'
            />
          ) : (
            <div className='reset-tw prose prose-sm max-w-none'>
              <Markdown>{item.content}</Markdown>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default CreationItem
