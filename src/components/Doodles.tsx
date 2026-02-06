import React from 'react';

interface DoodleProps {
  className?: string;
  color?: string;
}

export const Starburst: React.FC<DoodleProps> = ({ className = '', color = '#7C3AED' }) => (
  <svg className={`doodle ${className}`} width="64" height="64" viewBox="0 0 64 64" fill="none">
    <path
      d="M32 4L36 24L56 20L40 32L56 44L36 40L32 60L28 40L8 44L24 32L8 20L28 24L32 4Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export const Spiral: React.FC<DoodleProps> = ({ className = '', color = '#7C3AED' }) => (
  <svg className={`doodle-slow ${className}`} width="56" height="56" viewBox="0 0 56 56" fill="none">
    <path
      d="M28 28C28 28 32 24 32 20C32 16 28 12 24 12C20 12 16 16 16 20C16 28 24 36 32 36C40 36 48 28 48 20C48 8 38 0 28 0C14 0 4 12 4 24C4 40 18 52 32 52C46 52 56 40 56 28"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

export const Plus: React.FC<DoodleProps> = ({ className = '', color = '#7C3AED' }) => (
  <svg className={`doodle ${className}`} width="44" height="44" viewBox="0 0 44 44" fill="none">
    <path
      d="M22 8V36M8 22H36"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const WavyLine: React.FC<DoodleProps> = ({ className = '', color = '#7C3AED' }) => (
  <svg className={`doodle-slow ${className}`} width="120" height="24" viewBox="0 0 120 24" fill="none">
    <path
      d="M0 12C10 4 20 20 30 12C40 4 50 20 60 12C70 4 80 20 90 12C100 4 110 20 120 12"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

export const Donut: React.FC<DoodleProps> = ({ className = '', color = '#7C3AED' }) => (
  <svg className={`doodle ${className}`} width="72" height="72" viewBox="0 0 72 72" fill="none">
    <circle cx="36" cy="36" r="30" stroke={color} strokeWidth="2" fill="none" />
    <circle cx="36" cy="36" r="12" stroke={color} strokeWidth="2" fill="none" />
  </svg>
);

export const Arc: React.FC<DoodleProps> = ({ className = '', color = '#7C3AED' }) => (
  <svg className={`doodle-slow ${className}`} width="90" height="90" viewBox="0 0 90 90" fill="none">
    <path
      d="M10 80C10 45 35 15 70 10"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M55 5L70 10L65 25"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

interface DoodleSetProps {
  variant?: 'hero' | 'product';
}

export const DoodleSet: React.FC<DoodleSetProps> = ({ variant = 'hero' }) => {
  if (variant === 'hero') {
    return (
      <>
        <div className="absolute left-[4vw] top-[10vh]">
          <Starburst />
        </div>
        <div className="absolute left-[52vw] top-[18vh]">
          <Spiral />
        </div>
        <div className="absolute right-[4vw] top-[22vh]">
          <Plus />
        </div>
        <div className="absolute left-[48vw] bottom-[20vh]">
          <WavyLine />
        </div>
        <div className="absolute right-[6vw] bottom-[16vh]">
          <Donut />
        </div>
        <div className="absolute left-[2vw] bottom-[14vh]">
          <Arc />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="absolute left-[34vw] top-[8vh]">
        <Starburst className="scale-75" />
      </div>
      <div className="absolute right-[4vw] top-[10vh]">
        <Plus className="scale-75" />
      </div>
      <div className="absolute left-[4vw] bottom-[10vh]">
        <Spiral className="scale-75" />
      </div>
      <div className="absolute right-[6vw] bottom-[12vh]">
        <Donut className="scale-75" />
      </div>
    </>
  );
};
