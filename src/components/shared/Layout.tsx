import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className = '' }) => {
  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-slate-100 ${className}`}>
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20 transition-all duration-300">
        {children}
      </div>
    </div>
  );
};

export default Layout;
