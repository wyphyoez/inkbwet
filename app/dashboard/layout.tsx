import Link from 'next/link';
import Image from 'next/image';
import { BookCopy, PlusCircle, Settings, Home } from 'lucide-react';
import { currentUser } from '@/lib/data';
import React from 'react';

function DashboardNav() {
  // This sidebar will be hidden on mobile by the parent layout's classes
  return (
    <aside className="w-64 bg-white border-r p-6 flex-col">
      <div className="flex items-center gap-3 mb-8">
        <Image
          src={currentUser.avatar!}
          alt={currentUser.name}
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>
          <h2 className="font-semibold text-gray-800">{currentUser.name}</h2>
          <p className="text-sm text-gray-500">Writer</p>
        </div>
      </div>

      <nav className="flex flex-col gap-2">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <BookCopy size={18} />
          <span>My Stories</span>
        </Link>
        <Link
          href="/dashboard/create"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <PlusCircle size={18} />
          <span>New Story</span>
        </Link>
        <Link
          href="#"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <Settings size={18} />
          <span>Settings (Dummy)</span>
        </Link>
      </nav>

      <div className="mt-auto">
         <hr className="my-4" />
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <Home size={16} />
          <span>Back to Inkbwet Home</span>
        </Link>
      </div>
    </aside>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-89px)]">
      {/* Sidebar is hidden on mobile screens (md and below) */}
      <div className="hidden md:flex">
        <DashboardNav />
      </div>
      {/* Main content takes full width on mobile, and flex-1 on larger screens */}
      <main className="flex-1 p-0 md:p-8 bg-white">{children}</main>
    </div>
  );
}