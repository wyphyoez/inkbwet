"use client";

import { Minus, Plus } from 'lucide-react';
import React from 'react';

interface ReaderControlsProps {
  fontSize: number;
  setFontSize: (size: number) => void;
  theme: string;
  setTheme: (theme: string) => void;
}

const MIN_FONT_SIZE = 12;
const MAX_FONT_SIZE = 32;

const ReaderControls: React.FC<ReaderControlsProps> = ({ fontSize, setFontSize, theme, setTheme }) => {
  const increaseFontSize = () => {
    setFontSize(Math.min(fontSize + 2, MAX_FONT_SIZE));
  };

  const decreaseFontSize = () => {
    setFontSize(Math.max(fontSize - 2, MIN_FONT_SIZE));
  };

  return (
    <div className="sticky top-0 z-10 mb-4 py-3">
      <div className="mx-auto flex max-w-3xl items-center justify-between rounded-2xl border border-slate-200 bg-white/90 px-3 py-1.5 shadow-sm backdrop-blur sm:px-4">
        <div className="flex items-center gap-1 sm:gap-2">
          <button onClick={decreaseFontSize} disabled={fontSize <= MIN_FONT_SIZE} className="rounded-full p-2 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-slate-200">
            <Minus size={20} />
          </button>
          <span className="w-8 text-center text-sm font-semibold">{fontSize}px</span>
          <button onClick={increaseFontSize} disabled={fontSize >= MAX_FONT_SIZE} className="rounded-full p-2 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-slate-200">
            <Plus size={20} />
          </button>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <button onClick={() => setTheme('theme-white')} className={`rounded-full p-1.5 sm:p-2 ${theme === 'theme-white' ? 'ring-2 ring-blue-500' : ''}`}>
            <div className="h-5 w-5 rounded-full border bg-white sm:h-6 sm:w-6" />
          </button>
          <button onClick={() => setTheme('theme-sepia')} className={`rounded-full p-1.5 sm:p-2 ${theme === 'theme-sepia' ? 'ring-2 ring-blue-500' : ''}`}>
            <div className="h-5 w-5 rounded-full border bg-[#fbf5e9] sm:h-6 sm:w-6" />
          </button>
          <button onClick={() => setTheme('theme-dark')} className={`rounded-full p-1.5 sm:p-2 ${theme === 'theme-dark' ? 'ring-2 ring-blue-500' : ''}`}>
            <div className="h-5 w-5 rounded-full border border-slate-600 bg-[#121212] sm:h-6 sm:w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReaderControls;
