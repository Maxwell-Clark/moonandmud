'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Focus management for mobile menu
  useEffect(() => {
    if (mobileMenuOpen && mobileMenuRef.current) {
      const firstLink = mobileMenuRef.current.querySelector('a');
      firstLink?.focus();
    } else if (!mobileMenuOpen && menuButtonRef.current) {
      menuButtonRef.current.focus();
    }
  }, [mobileMenuOpen]);

  return (
    <header className="bg-terracotta sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-display text-2xl font-bold text-white">
              Moon & Mud Pottery
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-white hover:text-cream transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="bg-white text-terracotta px-4 py-2 rounded-lg font-semibold hover:bg-cream transition-colors"
            >
              Shop
            </Link>
            <Link
              href="/#about"
              className="text-white hover:text-cream transition-colors font-medium"
            >
              About
            </Link>
            <Link
              href="/#contact"
              className="text-white hover:text-cream transition-colors font-medium"
            >
              Contact
            </Link>
          </div>

          {/* Cart Button */}
          <div className="flex items-center space-x-4">
            <button
              className="snipcart-checkout relative min-w-[44px] min-h-[44px] flex items-center justify-center text-white hover:text-cream transition-colors"
              aria-label="Shopping cart"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              <span className="snipcart-items-count absolute -top-1 -right-1 bg-gold text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"></span>
            </button>

            {/* Mobile menu button */}
            <button
              ref={menuButtonRef}
              className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div
            id="mobile-menu"
            ref={mobileMenuRef}
            className="md:hidden py-4 border-t border-white/20"
          >
            <div className="flex flex-col space-y-2">
              <Link
                href="/"
                className="text-white hover:text-cream transition-colors font-medium py-3 px-2 -mx-2 rounded-lg hover:bg-white/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/shop"
                className="bg-white text-terracotta font-semibold py-3 px-4 rounded-lg text-center hover:bg-cream transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                href="/#about"
                className="text-white hover:text-cream transition-colors font-medium py-3 px-2 -mx-2 rounded-lg hover:bg-white/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/#contact"
                className="text-white hover:text-cream transition-colors font-medium py-3 px-2 -mx-2 rounded-lg hover:bg-white/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
