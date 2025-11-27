import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-background disabled:opacity-50 disabled:pointer-events-none active:translate-y-[1px]";
  
  const variants = {
    primary: "bg-cyan-500 hover:bg-cyan-400 text-black font-semibold shadow-md shadow-cyan-500/30 border border-cyan-400/50",
    secondary: "bg-purple-500 hover:bg-purple-600 text-white shadow-md shadow-purple-500/20 border border-purple-400/50",
    ghost: "bg-transparent hover:bg-white/5 text-slate-300 hover:text-white",
    outline: "bg-transparent border border-slate-700 text-slate-300 hover:bg-white/5 hover:border-cyan-500/50"
  };

  const sizes = {
    sm: "h-8 px-3 text-xs uppercase tracking-wide",
    md: "h-10 px-5 text-sm",
    lg: "h-12 px-8 text-base"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};