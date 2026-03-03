import Link from 'next/link';
import { BookMarked } from 'lucide-react';
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-slate-800">
          <BookMarked className="text-blue-600" size={24} />
          <span>Inkbwet</span>
        </Link>
        <div className="flex items-center gap-5">
          <Link href="/" className="font-medium text-slate-600 transition-colors hover:text-blue-600">
            Home
          </Link>
          <Link href="/dashboard" className="font-medium text-slate-600 transition-colors hover:text-blue-600">
            Dashboard
          </Link>
          <Link
            href="/dashboard/create"
            className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Write New Story
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
