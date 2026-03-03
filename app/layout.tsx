import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/app/components/Navbar';
import BottomNavbar from './components/BottomNavbar';
import PWARegister from './components/PWARegister';

export const metadata: Metadata = {
  title: 'Inkbwet - Your Story, Your World',
  description: 'A platform for aspiring writers to share their episodic stories.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Inkbwet',
  },
  icons: {
    apple: '/icons/icon-192.svg',
    icon: '/icons/icon-192.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#2563eb',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
      </head>
      <body className="bg-slate-50 text-slate-900">
        <PWARegister />
        <div className="hidden md:block">
          <Navbar />
        </div>

        <main className="mx-auto w-full max-w-6xl px-3 py-4 pb-24 sm:px-4 md:px-6 md:py-6 md:pb-6">
          {children}
        </main>

        <div className="block md:hidden">
          <BottomNavbar />
        </div>
      </body>
    </html>
  );
}
