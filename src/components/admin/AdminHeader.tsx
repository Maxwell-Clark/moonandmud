'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminHeader() {
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <header className="bg-brown text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/admin" className="font-display text-xl font-bold">
              Moon & Mud Admin
            </Link>
            <nav className="hidden md:flex space-x-4">
              <Link
                href="/admin"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition-colors"
              >
                Products
              </Link>
              <Link
                href="/"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition-colors"
                target="_blank"
              >
                View Site
              </Link>
            </nav>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium bg-white/10 hover:bg-white/20 rounded-md transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
