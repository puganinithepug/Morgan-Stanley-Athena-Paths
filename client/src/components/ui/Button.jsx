import React from 'react';

export function Button({ 
  children, 
  className = '', 
  variant = 'default', 
  size = 'default', 
  ...props 
}) {
  const baseStyles = 'inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
  
  const variants = {
    default: 'bg-primary text-white hover:bg-primary-dark rounded-md',
    outline:
      'border border-foreground/20 bg-background text-foreground hover:bg-background/80 rounded-md',
    ghost: 'text-foreground/80 hover:bg-background/60 rounded-md',
    unstyled: '', // <- new
  };
  
  const sizes = {
    default: 'h-10 px-4 py-2 text-sm',
    sm: 'h-9 px-3 text-sm',
    lg: 'h-11 px-8 text-sm',
    pill: 'px-3 py-2', // <- new
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

