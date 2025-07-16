import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'

const Navbar = () => {
  const navigate = useNavigate()
  const { user } = useUser()
  const { openSignIn } = useClerk()

  return (
<div className='fixed top-0 z-50 w-full backdrop-blur-2xl bg-black/60 text-white flex justify-between items-center h-16 px-4 sm:px-20 xl:px-32 shadow-md shadow-purple-500/10'>
      {/* Logo */}
      <img
        src={assets.logo}
        alt="logo"
        className='w-32 sm:w-44 cursor-pointer'
        onClick={() => navigate('/')}
      />

      {/* Right Side - Button */}
      {user ? (
        <UserButton afterSignOutUrl="/" />
      ) : (
        <button
          onClick={openSignIn}
          className='flex items-center gap-2 rounded-full text-sm bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 text-white px-6 py-2.5 shadow-lg hover:scale-105 active:scale-95 transition-all duration-200'
        >
          Get started <ArrowRight className='w-4 h-4' />
        </button>
      )}
    </div>
  )
}

export default Navbar
