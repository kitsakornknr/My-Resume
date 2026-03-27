"use client";
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 bg-black/50 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
          Kitsakorn
        </Link>
        <div className="flex items-center gap-6">
          <a
            href="#contact"
            className="px-3 py-1.5 rounded-lg border border-white/10 text-xs font-bold bg-white/5 hover:bg-white/10 transition-colors">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}