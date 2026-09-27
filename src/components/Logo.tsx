import React from 'react';
import logoImg from '../assets/images/atlantic_transport_logo_1790546535207.jpg';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export const Logo: React.FC<LogoProps> = ({ className = 'h-11', variant = 'light' }) => {
  const isDark = variant === 'dark';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Official Company Emblem with Canadian Map, Freight Truck & Compass */}
      <div className={`relative h-12 w-16 shrink-0 rounded-lg overflow-hidden flex items-center justify-center p-0.5 transition-shadow ${
        isDark ? 'bg-white shadow-xs' : 'bg-white border border-slate-200/80 shadow-2xs'
      }`}>
        <img
          src={logoImg}
          alt="Atlantic Transport Logo - Carte du Canada & Fret Routier"
          referrerPolicy="no-referrer"
          className="h-full w-full object-contain"
        />
      </div>

      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1.5">
          <span className={`text-xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'} uppercase font-heading`}>
            Atlantic
          </span>
          <span className="text-xl font-extrabold tracking-tight text-amber-500 uppercase font-heading">
            Transport
          </span>
        </div>
        <span className="text-[10px] tracking-wider uppercase font-semibold text-slate-400 mt-0.5">
          Surrey, BC · Canada
        </span>
      </div>
    </div>
  );
};

