import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { Menu, X } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import { SignIn, useUser } from '@clerk/clerk-react'

const Layout = () => {

  const navigate = useNavigate()
  const [sidebar, setSidebar] = useState(false)
  const { user } = useUser()

  return user ? (
    <div className='flex flex-col items-start justify-start h-screen bg-black text-white'>

      {/* Navbar */}
      <nav className='w-full px-8 min-h-14 flex items-center justify-between border-b border-gray-700 bg-[#0e0e0e]'>
        <img
          className='cursor-pointer w-32 sm:w-44'
          src={assets.logo}
          alt="logo"
          onClick={() => navigate('/')}
        />
        {
          sidebar ? (
            <X onClick={() => setSidebar(false)} className='w-6 h-6 text-white sm:hidden' />
          ) : (
            <Menu onClick={() => setSidebar(true)} className='w-6 h-6 text-white sm:hidden' />
          )
        }
      </nav>

      {/* Sidebar + Main Content */}
      <div className='flex-1 w-full flex h-[calc(100vh-64px)]'>
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        <div className='flex-1 bg-[#0b0b0b] overflow-y-auto'>
          <Outlet />
        </div>
      </div>

    </div>
  ) : (
    <div className='flex items-center justify-center h-screen bg-black text-white'>
      <SignIn />
    </div>
  )
}

export default Layout
