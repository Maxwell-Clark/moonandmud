import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-brown text-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Image
              src="/images/MNMLogo.PNG"
              alt="Moon & Mud Pottery"
              width={150}
              height={60}
              className="h-14 w-auto mb-4"
            />
            <p className="text-cream/70 mb-4 max-w-md">
              Handcrafted pottery inspired by the gentle glow of moonlight and
              the rich texture of earth. Each piece is made with love in our
              small studio.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/moonandmudpottery"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/70 hover:text-gold transition-colors"
                aria-label="Instagram"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://tiktok.com/@moonandmudpottery"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/70 hover:text-gold transition-colors"
                aria-label="TikTok"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48V13a8.28 8.28 0 005.58 2.16V11.7a4.85 4.85 0 01-3.77-1.82v-.01l.01-.02V6.69h3.76z" />
                </svg>
              </a>
              <a
                href="https://youtube.com/@moonandmudpottery"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/70 hover:text-gold transition-colors"
                aria-label="YouTube"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Shop Categories */}
          <div>
            <h4 className="font-display text-lg font-semibold text-gold mb-4">
              Shop
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/shop"
                  className="text-cream/70 hover:text-gold transition-colors font-medium"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=mugs"
                  className="text-cream/70 hover:text-gold transition-colors"
                >
                  Mugs
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=bowls"
                  className="text-cream/70 hover:text-gold transition-colors"
                >
                  Bowls
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=vases"
                  className="text-cream/70 hover:text-gold transition-colors"
                >
                  Vases
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=plates"
                  className="text-cream/70 hover:text-gold transition-colors"
                >
                  Plates
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=planters"
                  className="text-cream/70 hover:text-gold transition-colors"
                >
                  Planters
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold text-cream mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/#about"
                  className="text-cream/70 hover:text-gold transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="text-cream/70 hover:text-gold transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-cream/70 hover:text-gold transition-colors"
                >
                  Shipping & Returns
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div id="contact">
            <h4 className="font-display text-lg font-semibold text-cream mb-4">
              Get in Touch
            </h4>
            <ul className="space-y-2 text-cream/70">
              <li>
                <a
                  href="mailto:hello@moonandmud.com"
                  className="hover:text-gold transition-colors"
                >
                  hello@moonandmud.com
                </a>
              </li>
              <li>St. George, Utah</li>
              <li className="pt-4">
                <p className="text-sm">
                  Subscribe to our newsletter for updates on new collections and
                  special offers.
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cream/20 mt-8 pt-8 text-center text-cream/70 text-sm">
          <p>&copy; {new Date().getFullYear()} Moon & Mud Pottery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
