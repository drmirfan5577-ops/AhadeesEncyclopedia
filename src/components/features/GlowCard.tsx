import { ReactNode } from 'react';
import { useApp } from '@/contexts/AppContext';
import { cn } from '@/lib/utils';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
  color?: 'red' | 'white' | 'mixed';
  onClick?: () => void;
}

const GlowCard = ({ children, className, intensity = 'medium', color = 'red', onClick }: GlowCardProps) => {
  const { settings } = useApp();

  const glowClass = {
    low: color === 'red' ? 'shadow-[0_0_8px_rgba(239,68,68,0.3)]' : 'shadow-[0_0_8px_rgba(255,255,255,0.15)]',
    medium: color === 'red' ? 'shadow-[0_0_15px_rgba(239,68,68,0.4)]' : 'shadow-[0_0_15px_rgba(255,255,255,0.2)]',
    high: color === 'red' ? 'shadow-[0_0_25px_rgba(239,68,68,0.6)]' : 'shadow-[0_0_25px_rgba(255,255,255,0.3)]',
  }[intensity];

  return (
    <div
      onClick={onClick}
      className={cn(
        'glass-card rounded-2xl border border-red-500/30 backdrop-blur-md transition-all duration-300',
        'hover:border-red-400/60 hover:shadow-[0_0_20px_rgba(239,68,68,0.5)]',
        onClick && 'cursor-pointer',
        glowClass,
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlowCard;
