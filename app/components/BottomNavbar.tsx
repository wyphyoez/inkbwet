"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutDashboard, PlusCircle, UserCircle2 } from 'lucide-react';
import React from 'react';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/create', label: 'Write', icon: PlusCircle },
  { href: '/profile', label: 'Profile', icon: UserCircle2 },
];

const BottomNavbar: React.FC = () => {
  const pathname = usePathname();

  if (pathname.includes('/chapters/')) {
    return null;
  }

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 pb-safe shadow-[0_-6px_24px_rgba(15,23,42,0.08)] backdrop-blur md:hidden">
      <div className="mx-auto flex h-16 max-w-lg items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href === '/dashboard' && pathname.startsWith('/dashboard'));
          return (
            <Link
              href={item.href}
              key={item.label}
              className={`flex w-full flex-col items-center justify-center gap-1 transition-colors ${
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'
              }`}
            >
              <item.icon size={22} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavbar;
