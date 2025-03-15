'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useButtonHover } from '@/contexts/ButtonHoverContext';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

export default function ModalButton({ children }: { children: React.ReactNode }) {
  const { isVideoButtonHovered } = useButtonHover();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Link
        href="/signup"
        className={cn(
          "inline-flex items-center px-6 py-3",
          "border border-gray-900 text-base font-medium",
          "rounded-md shadow-sm",
          "transition-all duration-200 ease-in-out",
          "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700",
          "relative group",
          "after:absolute after:inset-0 after:rounded-md",
          "after:border-transparent after:border-2",
          "after:transition-all after:duration-200",
          isVideoButtonHovered ? 
            "bg-white text-gray-900 shadow-lg after:border-gray-900/20" :
            "text-white bg-gray-900 after:border-gray-400/20"
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
      </Link>
    </motion.div>
  );
} 