import React from 'react';

interface AscentLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export const AscentLogo: React.FC<AscentLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
}) => {
  const iconDimensions = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
    xl: 'w-14 h-14',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
  };

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* AscentJobs Rounded App Icon */}
      <div
        className={`${iconDimensions[size]} relative flex items-center justify-center rounded-2xl bg-[#0952c4] shadow-sm flex-shrink-0 overflow-hidden transition-transform hover:scale-[1.03]`}
        style={{
          boxShadow: '0 2px 8px rgba(9, 82, 196, 0.25)',
        }}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-[82%] h-[82%] drop-shadow-sm"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Stylized 'A' Apex and Legs */}
          <path
            d="M 28 80 L 48 24 C 49 21 52 21 53 24 L 73 80"
            stroke="#ffffff"
            strokeWidth="11"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Vibrant Cyan Accent Crossbar */}
          <line
            x1="33"
            y1="56"
            x2="67"
            y2="56"
            stroke="#38bdf8"
            strokeWidth="7"
            strokeLinecap="round"
          />
          {/* Vibrant Green Dot at top-right of apex */}
          <circle
            cx="75"
            cy="27"
            r="8"
            fill="#10b981"
          />
        </svg>
      </div>

      {/* Wordmark */}
      {showText && (
        <span className={`font-black tracking-tight leading-none ${textSizes[size]}`}>
          <span className="text-slate-900 font-extrabold">Ascent</span>
          <span className="text-[#0952c4] font-black">Jobs</span>
        </span>
      )}
    </div>
  );
};
