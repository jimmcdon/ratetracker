'use client';

import Link from 'next/link';

export default function ModalButton({ children }: { children: React.ReactNode }) {
  return (
    <Link
      href="/signup"
      className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
    >
      {children}
    </Link>
  );
} 