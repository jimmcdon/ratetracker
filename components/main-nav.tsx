"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { X, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import ModalButton from './modal-button'

export function MainNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "#" },
    { label: "Contact", href: "/contact" },
  ]

  useEffect(() => {
    const html = document.querySelector("html")
    if (html) html.style.overflow = isOpen ? "hidden" : ""
    return () => {
      if (html) html.style.overflow = ""
    }
  }, [isOpen])

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
            <div className="flex items-center">
              <div className="text-xl font-bold text-gray-900 relative">
                <span className="italic">
                  Rate<span className="text-gray-600">T</span>racker
                </span>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium",
                      "transition-colors duration-200"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="flex items-center gap-4">
                  <ModalButton>Track your rate</ModalButton>
                </div>
              </div>
            </div>
            <div className="md:hidden">
              <Button
                onClick={() => setIsOpen(!isOpen)}
                variant="ghost"
                size="icon"
                aria-expanded={isOpen}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                className="text-gray-600 hover:text-gray-900"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="fixed inset-0 z-50 bg-white">
          <div className="pt-5 pb-6 px-4">
            <div className="flex items-center justify-between">
              <div className="text-xl font-bold text-gray-900 italic">RateTracker</div>
              <Button 
                onClick={() => setIsOpen(false)} 
                variant="ghost" 
                size="icon" 
                aria-label="Close menu"
                className="text-gray-600 hover:text-gray-900"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="mt-6">
              <nav className="grid gap-y-8">
                {menuItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <div onClick={() => setIsOpen(false)}>
                  <ModalButton>Track your rate</ModalButton>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

