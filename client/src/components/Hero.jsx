import React from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4 sm:px-20 xl:px-32 relative flex flex-col w-full justify-center bg-black text-white pt-24 pb-10">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-blue-500/20 animate-pulse" />
  <div className="moving-gradient-bg" />
</div>

      {/* Heading */}
      <div className="text-center mb-6">
        <h1 className="text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-semibold mx-auto leading-[1.2]">
  Craft stunning content <br /> in seconds with <span className="text-primary">AI</span>
</h1>
        <p className="mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto max-sm:text-xs text-gray-400">
  Supercharge your creativity with powerful AI tools - 
  write captivating content, generate visuals, and streamline your entire workflow.
</p>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs">
        <button
          onClick={() => navigate('/ai')}
          className="bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 text-white px-10 py-3 rounded-lg border border-white/10 shadow-md hover:shadow-purple-500/40 hover:scale-105 active:scale-95 transition-all duration-200"
        >
         Launch your first creation
        </button>
        <button
          className="bg-black text-white px-10 py-3 rounded-lg border border-purple-500 hover:bg-purple-900/30 hover:border-purple-400 hover:scale-105 active:scale-95 transition-all duration-200 shadow-[0_0_8px_#7c3aed]"
        >
          Watch demo
        </button>
      </div>

      {/* Infinite Brand Logo Carousel */}
      <div className="brand-marquee mt-16">
        <div className="brand-track">
          {[...Array(2)].map((_, i) => (
            <React.Fragment key={i}>
              <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/linkedin.svg" alt="LinkedIn" className="brand-logo" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="brand-logo" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" className="brand-logo" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="brand-logo" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix" className="brand-logo" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" className="brand-logo" />
              
             
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Trusted by */}
      <div className="flex items-center gap-4 mt-8 mx-auto text-gray-400">
        <img src={assets.user_group} alt="" className="h-8" /> Trusted by 10k+ people
      </div>
    </div>
  );
};

export default Hero;
