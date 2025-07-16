import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 pt-12 w-full mt-20 border-t border-purple-600/20">
      <div className="flex flex-col md:flex-row justify-between w-full gap-12 border-b border-purple-500/10 pb-10">
        {/* Brand */}
        <div className="md:max-w-md">
          <img className="h-20 sm:h-24" src={assets.logo} alt="logo" />
          <p className="mt-3 text-sm leading-relaxed">
            Experience the power of AI with <span className="text-white font-medium">ScriptZen AI</span>.<br />
            Transform your content creation with our suite of premium AI tools.
          </p>
        </div>

        {/* Links + Subscribe */}
        <div className="flex-1 flex flex-col sm:flex-row gap-10 sm:gap-16 md:gap-20">
          {/* Company Links */}
          <div>
            <h2 className="font-semibold text-white mb-4">Company</h2>
            <ul className="text-sm space-y-2">
              <li><a href="#" className="hover:text-white transition">Home</a></li>
              <li><a href="#" className="hover:text-white transition">About us</a></li>
              <li><a href="#" className="hover:text-white transition">Contact us</a></li>
              <li><a href="#" className="hover:text-white transition">Privacy policy</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="w-full sm:max-w-xs">
            <h2 className="font-semibold text-white mb-4">Subscribe to our newsletter</h2>
            <p className="text-sm mb-3">The latest news, articles, and updates weekly in your inbox.</p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <input
                className="bg-[#1a1a1a] border border-purple-500/30 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-600 outline-none w-full sm:w-auto flex-1 h-9 rounded px-3 text-sm"
                type="email"
                placeholder="Enter your email"
              />
              <button className="bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 px-4 h-9 text-white rounded hover:scale-105 active:scale-95 transition-all text-sm font-medium shadow-[0_0_8px_#a855f7] border border-purple-600/50">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <p className="pt-6 text-center text-xs md:text-sm text-gray-500">
        © 2025 ScriptZen AI. All Rights Reserved.
      </p>
    </footer>
  )
}

export default Footer
