import { Protect, useClerk, useUser } from '@clerk/clerk-react'
import {
  Eraser, FileText, Hash, House, Image,
  LogOut, Scissors, SquarePen, Users
} from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/ai', label: 'Dashboard', Icon: House },
  { to: '/ai/write-article', label: 'Write Article', Icon: SquarePen },
  { to: '/ai/blog-titles', label: 'Blog Titles', Icon: Hash },
  { to: '/ai/generate-images', label: 'Generate Images', Icon: Image },
  { to: '/ai/remove-background', label: 'Remove Background', Icon: Eraser },
  { to: '/ai/remove-object', label: 'Remove Object', Icon: Scissors },
  { to: '/ai/review-resume', label: 'Review Resume', Icon: FileText },
  { to: '/ai/community', label: 'Community', Icon: Users },
]

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser()
  const { signOut, openUserProfile } = useClerk()

  return (
    <div className={`w-60 h-screen bg-[#0d0d0d]/80 backdrop-blur-md border-r border-[#27272a] text-white flex flex-col justify-between 
      max-sm:absolute top-14 bottom-0 z-50 
      ${sidebar ? 'translate-x-0' : 'max-sm:-translate-x-full'} transition-all duration-300 ease-in-out`}>

      {/* Top Section */}
      <div className='my-7 w-full px-4'>
        <img src={user.imageUrl} alt='User avatar' className='w-16 h-16 rounded-full mx-auto border-2 border-purple-500 shadow-[0_0_8px_#8e37eb]' />
        <h1 className='mt-3 text-center text-sm font-medium text-gray-200'>{user.fullName}</h1>

        <div className='mt-6 space-y-2 text-sm font-medium'>
          {navItems.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/ai'}
              onClick={() => setSidebar(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#6e36ff] to-[#a344f6] text-white shadow-[0_0_10px_#a344f650]'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Bottom Profile Section */}
      <div className='w-full border-t border-[#2e2e2e] p-4 px-5 flex items-center justify-between'>
        <div
          onClick={openUserProfile}
          className='flex items-center gap-3 cursor-pointer group transition-all'
        >
          <img src={user.imageUrl} className='w-8 h-8 rounded-full border border-purple-500 group-hover:scale-105' alt='' />
          <div>
            <h1 className='text-sm font-medium text-gray-200'>{user.fullName}</h1>
            <p className='text-xs text-purple-400'>
              <Protect plan='premium' fallback='Free'>Premium</Protect> Plan
            </p>
          </div>
        </div>
        <LogOut
          onClick={signOut}
          className='w-4.5 text-gray-500 hover:text-red-400 transition cursor-pointer'
        />
      </div>
    </div>
  )
}

export default Sidebar
