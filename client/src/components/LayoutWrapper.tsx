'use client';

import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Menu, X } from 'lucide-react';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col w-full relative">
      {/* Mobile Topbar */}
      <header className="lg:hidden h-16 border-b border-slate-200/50 bg-background/80 backdrop-blur-md fixed top-0 left-0 right-0 z-40 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-primary/20">E</div>
          <div>
            <h1 className="text-base font-black bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent leading-tight">EngBot</h1>
            <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">AI English Mentor</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-all active:scale-95 shadow-sm"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-5 h-5 text-slate-600" /> : <Menu className="w-5 h-5 text-slate-600" />}
        </button>
      </header>

      {/* Sidebar Drawer */}
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />

      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 animate-in fade-in duration-300"
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-64 min-h-screen pt-16 lg:pt-0 transition-all duration-300">
        <div className="max-w-7xl mx-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
