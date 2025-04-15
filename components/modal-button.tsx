'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { SignUpModal } from './sign-up-modal';

export default function ModalButton({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <button
          onClick={() => setIsModalOpen(true)}
          className={cn(
            "inline-flex items-center px-6 py-3",
            "border border-gray-900 text-base font-medium",
            "rounded-md shadow-sm",
            "transition-all duration-200 ease-in-out",
            "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700",
            "relative group",
            "text-white bg-gray-900 hover:bg-gray-800"
          )}
        >
          <span className="relative flex items-center">
            {children}
            <motion.span
              className="ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
              initial={false}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.span>
          </span>
        </button>
      </motion.div>

      <SignUpModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
} 