"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export function MainNav() {
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setHasScrolled(scrollPosition > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <nav
        className={cn(
          "transition-all duration-200 border-border",
          hasScrolled
            ? "py-2 bg-white/80 backdrop-blur-lg shadow-lg"
            : "py-4 bg-background"
        )}
        aria-label="Main Navigation"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className={cn(
            "flex items-center justify-between",
            hasScrolled
              ? "max-w-3xl mx-auto px-4 rounded-full border bg-white"
              : ""
          )}>
            <div className="text-xl font-bold text-gray-900 relative">
              <span className="italic">
                Rate<span className="text-gray-600">T</span>racker
              </span>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

