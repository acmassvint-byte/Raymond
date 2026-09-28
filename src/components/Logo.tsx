import React from 'react';
import logoImg from '../assets/images/atlantic_transport_logo_1790546535207.jpg';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export const Logo: React.FC<LogoProps> = ({ className = '', variant = 'light' }) => {
  const isDark = variant === 'dark';

  return (
    <div className={`flex items-center gap-2 sm:gap-3.5 ${className}`}>
      {/* Official Company Emblem with Canadian Map, Freight Truck & Compass */}
      <div className={`relative h-15 sm:h-20 md:h-22 w-22 sm:w-28 md:w-32 shrink-0 rounded-xl overflow-hidden flex items-center justify-center p-1 transition-shadow ${
        isDark ? 'bg-white shadow-sm' : 'bg-white border border-slate-200/90 shadow-xs'
      }`}>
        <img
          src={logoImg}
          alt="Atlantic Transport Logo"
          referrerPolicy="no-referrer"
          className="h-full w-full object-contain"
        />
      </div>

      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1 sm:gap-1.5">
          <span className={`text-lg sm:text-2xl md:text-3xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'} uppercase font-heading`}>
            Atlantic
          </span>
          <span className="text-lg sm:text-2xl md:text-3xl font-black tracking-tight text-amber-500 uppercase font-heading">
            Transport
          </span>
          <span className="text-xs sm:text-sm md:text-base font-black tracking-wider text-amber-400 uppercase font-heading bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/30">
            LTD
          </span>
        </div>
        <span className="text-[10px] sm:text-xs tracking-wider uppercase font-bold text-slate-400 mt-1">
          Surrey, BC · Canada
        </span>
      </div>
    </div>
  );
};


