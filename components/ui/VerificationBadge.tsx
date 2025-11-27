import React from 'react';
import { CheckCircle } from 'lucide-react';
import { VerificationTier } from '../../types';

interface VerificationBadgeProps {
  tier: VerificationTier;
  size?: number;
  className?: string;
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({ 
  tier, 
  size = 14,
  className = ''
}) => {
  if (tier === 'none') return null;

  let colorClass = '';
  let title = '';
  let glowClass = '';

  switch (tier) {
    case 'verified':
      // Blue
      colorClass = 'text-blue-500 fill-blue-500/20'; // Increased opacity for fill
      glowClass = 'drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]';
      title = 'Verified Artist';
      break;
    case 'superstar':
      // Gold / Orange
      colorClass = 'text-amber-400 fill-amber-400/20';
      glowClass = 'drop-shadow-[0_0_10px_rgba(251,191,36,0.6)]';
      title = 'Superstar Producer';
      break;
    case 'staff':
      // Red
      colorClass = 'text-red-500 fill-red-500/20';
      glowClass = 'drop-shadow-[0_0_10px_rgba(239,68,68,0.6)]';
      title = 'EVLFRQ Staff';
      break;
  }

  return (
    <span title={title} className={`inline-flex items-center justify-center ${className}`}>
      <CheckCircle size={size} className={`${colorClass} ${glowClass}`} strokeWidth={2.5} />
    </span>
  );
};