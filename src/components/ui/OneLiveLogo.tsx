import React from 'react';

export const OneLiveLogo = ({ className = "", size = 48, showText = false }: { className?: string, size?: number, showText?: boolean }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Ícone SVG Recriado fielmente ao anexo */}
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="shadow-lg rounded-[22%]">
        <defs>
          <linearGradient id="bg_gradient" x1="0" y1="100" x2="100" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#4355F6" /> {/* Azul Base */}
            <stop offset="1" stopColor="#E347F8" /> {/* Rosa/Roxo Topo */}
          </linearGradient>
          <filter id="soft_shadow" x="-20%" y="-20%" width="140%" height="140%">
             <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
             <feOffset dx="2" dy="2" result="offsetblur"/>
             <feComponentTransfer>
               <feFuncA type="linear" slope="0.2"/>
             </feComponentTransfer>
             <feMerge> 
               <feMergeNode in="offsetblur"/>
               <feMergeNode in="SourceGraphic"/> 
             </feMerge>
          </filter>
        </defs>
        
        {/* Fundo Arredondado com Gradiente */}
        <rect x="0" y="0" width="100" height="100" rx="22" fill="url(#bg_gradient)" />
        
        {/* Círculo Externo Suave (Borda branca translúcida) */}
        <circle cx="50" cy="50" r="28" fill="white" fillOpacity="0.15" />
        
        {/* Círculo Branco Central (O "One") */}
        <circle cx="50" cy="50" r="16" fill="white" />
        
        {/* Círculo Interno Roxo (A "Pupila" ou "Live") */}
        <circle cx="50" cy="50" r="8" fill="#A838E8" />
      </svg>
      
      {showText && (
        <span className="font-bold text-xl tracking-tight text-white font-sans">
            One <span className="text-[#E347F8]">Live</span>
        </span>
      )}
    </div>
  );
};