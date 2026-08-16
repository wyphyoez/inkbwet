'use client';

import Link from 'next/link';
import { BookOpen, PenLine, Search, Sparkles } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Button } from './ui';

export default function Navbar() {
  const pathname = usePathname();
  const isActive = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-30 border-b border-border/80 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2.5" aria-label="Inkbwet home">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform group-hover:-rotate-6"><BookOpen size={19} /></span>
          <span className="font-display text-xl font-bold tracking-tight">inkbwet<span className="text-primary">.</span></span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          <Link href="/" className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${isActive('/') ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:bg-accent hover:text-foreground'}`}>Discover</Link>
          <Link href="/dashboard" className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${isActive('/dashboard') ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:bg-accent hover:text-foreground'}`}>My library</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden text-muted-foreground sm:inline-flex" aria-label="Search stories"><Search size={18} /></Button>
          <Link href="/dashboard/create"><Button size="sm" className="gap-2"><PenLine size={15} /> <span className="hidden sm:inline">Write a story</span><span className="sm:hidden">Write</span></Button></Link>
          <Link href="/profile" className="hidden h-9 w-9 items-center justify-center rounded-full bg-secondary text-secondary-foreground sm:flex" aria-label="Open profile"><Sparkles size={16} /></Link>
        </div>
      </div>
    </header>
  );
}
