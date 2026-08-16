import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/app/components/Navbar';
import BottomNavbar from './components/BottomNavbar';
import PWARegister from './components/PWARegister';

export const metadata: Metadata = {
  title: 'Inkbwet — Stories worth staying for',
  description: 'Discover, write, and follow episodic stories on Inkbwet.',
  manifest: '/manifest.json',
  appleWebApp: { capable: true, statusBarStyle: 'default', title: 'Inkbwet' },
  icons: { apple: '/icons/icon-192.svg', icon: '/icons/icon-192.svg' },
};

export const viewport: Viewport = {
  themeColor: '#4f46e5',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <PWARegister />
        <Navbar />
        <main className="mx-auto w-full max-w-7xl px-4 pb-24 pt-6 sm:px-6 md:pb-10 lg:px-8">{children}</main>
        <BottomNavbar />
      </body>
    </html>
  );
}
