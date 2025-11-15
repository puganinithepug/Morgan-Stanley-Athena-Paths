import React from 'react';
import { X } from 'lucide-react';

const DialogContext = React.createContext();

export function Dialog({ open, onOpenChange, children }) {
  if (!open) return null;
  
  return (
    <DialogContext.Provider value={{ open, onOpenChange }}>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {children}
      </div>
    </DialogContext.Provider>
  );
}

export function DialogOverlay({ className = '' }) {
  const context = React.useContext(DialogContext);
  
  return (
    <div
      className={`fixed inset-0 bg-black/50 backdrop-blur-sm ${className}`}
      onClick={() => context.onOpenChange(false)}
    />
  );
}

export function DialogContent({ className = '', children, ...props }) {
  const context = React.useContext(DialogContext);
  
  return (
    <>
      <DialogOverlay />
      <div
        className={`fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 sm:rounded-lg ${className}`}
        {...props}
      >
        {children}
        <button
          onClick={() => context.onOpenChange(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </>
  );
}

export function DialogHeader({ className = '', ...props }) {
  return (
    <div
      className={`flex flex-col space-y-1.5 text-center sm:text-left ${className}`}
      {...props}
    />
  );
}

