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
    primary: "text-black font-semibold shadow-md border transition-all",
    secondary: "bg-purple-500 hover:bg-purple-600 text-white shadow-md shadow-purple-500/20 border border-purple-400/50",
    ghost: "bg-transparent hover:bg-white/5 text-slate-300 hover:text-white",
    outline: "bg-transparent border border-slate-700 text-slate-300 hover:bg-white/5"
  };

  const primaryStyle = {
    background: 'linear-gradient(to right, #4542f5, #5a52dd)',
    boxShadow: '0 4px 6px rgba(69, 66, 245, 0.3)',
    borderColor: 'rgba(69, 66, 245, 0.5)'
  };

  const sizes = {
    sm: "h-8 px-3 text-xs uppercase tracking-wide",
    md: "h-10 px-5 text-sm",
    lg: "h-12 px-8 text-base"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      style={variant === 'primary' ? primaryStyle : undefined}
      {...props}
    >
      {children}
    </button>
  );
};