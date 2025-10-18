import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/app/components/Navbar';
import BottomNavbar from './components/BottomNavbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Inkbwet - Your Story, Your World',
  description: 'A platform for aspiring writers to share their episodic stories.',
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
      <body className={`${inter.className} bg-gray-50`}>
        {/* Desktop Top Navbar (hidden on mobile) */}
        <div className="hidden md:block">
          <Navbar />
        </div>

        {/* Add padding-bottom on mobile to prevent content from being hidden by BottomNavbar */}
        <main className="container mx-auto px-4 py-6 pb-24 md:pb-6">
          {children}
        </main>

        {/* Mobile Bottom Navbar (hidden on desktop) */}
        <div className="block md:hidden">
          <BottomNavbar />
        </div>
      </body>
    </html>
  );
}