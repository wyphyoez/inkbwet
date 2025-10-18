import Link from 'next/link';
import { BookMarked } from 'lucide-react';
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-bold text-gray-800"
        >
          <BookMarked className="text-blue-600" size={28} />
          <span>Inkbwet</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium">
            Home
          </Link>
          <Link
            href="/dashboard"
            className="text-gray-600 hover:text-blue-600 font-medium"
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/create"
            className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            Write New Story
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;