"use client"; // This component uses client-side hooks like usePathname

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutDashboard, PlusCircle } from 'lucide-react';
import React from 'react';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/create', label: 'Write', icon: PlusCircle },
];

const BottomNavbar: React.FC = () => {
  const pathname = usePathname();

  // Hide bottom nav on reader page for better reading experience
  if (pathname.includes('/chapters/')) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t z-50 shadow-t-lg">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href === '/dashboard' && pathname.startsWith('/dashboard'));
          return (
            <Link
              href={item.href}
              key={item.label}
              className={`flex flex-col items-center justify-center gap-1 w-full transition-colors ${
                isActive ? 'text-blue-600' : 'text-gray-500 hover:text-blue-500'
              }`}
            >
              <item.icon size={24} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavbar;