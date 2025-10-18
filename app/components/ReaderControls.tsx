"use client";

import { Sun, Moon, Minus, Plus, Type } from 'lucide-react';
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
    <div className="sticky top-0 bg-inherit z-10 py-3 mb-4">
      <div className="flex justify-between items-center max-w-3xl mx-auto px-4 border rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm">
        <div className="flex items-center gap-2">
           <button onClick={decreaseFontSize} disabled={fontSize <= MIN_FONT_SIZE} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
              <Minus size={20} />
           </button>
           <span className="text-sm font-semibold w-8 text-center">{fontSize}px</span>
           <button onClick={increaseFontSize} disabled={fontSize >= MAX_FONT_SIZE} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
              <Plus size={20} />
           </button>
        </div>
        <div className="flex items-center gap-2">
            <button onClick={() => setTheme('theme-white')} className={`p-2 rounded-full ${theme === 'theme-white' ? 'ring-2 ring-blue-500' : ''}`}>
              <div className="w-6 h-6 rounded-full bg-white border"></div>
            </button>
            <button onClick={() => setTheme('theme-sepia')} className={`p-2 rounded-full ${theme === 'theme-sepia' ? 'ring-2 ring-blue-500' : ''}`}>
               <div className="w-6 h-6 rounded-full bg-[#fbf5e9] border"></div>
            </button>
             <button onClick={() => setTheme('theme-dark')} className={`p-2 rounded-full ${theme === 'theme-dark' ? 'ring-2 ring-blue-500' : ''}`}>
               <div className="w-6 h-6 rounded-full bg-[#121212] border border-gray-600"></div>
            </button>
        </div>
      </div>
    </div>
  );
};

export default ReaderControls;