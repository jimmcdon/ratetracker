"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { X, Menu, ChevronDown, Phone } from "lucide-react"
import { cn } from "@/lib/utils"
import ModalButton from './modal-button'

export function MainNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)

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
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="text-xl font-bold text-gray-900 relative">
                <span className="italic">
                  Rate<span className="text-gray-600">T</span>racker
                </span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <NavItem label="Unlock Cash" />
              <NavItem label="Buy Your Dream Home" />
              <NavItem label="Lower your payment" />
              <NavItem label="Learning Hub" />
              <div className="ml-4"><ModalButton>Track your rate</ModalButton></div>
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

      {/* Slide-out mobile menu */}
      <div className={`md:hidden fixed inset-0 z-50 transition-all duration-300 ${isOpen ? '' : 'pointer-events-none'}`}>
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsOpen(false)}
        />
        {/* Slide-out panel */}
        <div className={`fixed top-0 right-0 h-full w-72 bg-white shadow-xl transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
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
          <nav className="flex flex-col gap-2 px-6 py-6">
            <button onClick={() => setIsOpen(false)} className="text-left w-full py-3 px-2 text-lg font-medium text-gray-900 hover:text-primary focus:outline-none bg-transparent">Unlock Cash</button>
            <button onClick={() => setIsOpen(false)} className="text-left w-full py-3 px-2 text-lg font-medium text-gray-900 hover:text-primary focus:outline-none bg-transparent">Buy Your Dream Home</button>
            <button onClick={() => setIsOpen(false)} className="text-left w-full py-3 px-2 text-lg font-medium text-gray-900 hover:text-primary focus:outline-none bg-transparent">Lower your payment</button>
            <button onClick={() => setIsOpen(false)} className="text-left w-full py-3 px-2 text-lg font-medium text-gray-900 hover:text-primary focus:outline-none bg-transparent">Learning Hub</button>
          </nav>
          <div className="px-6 pb-8 mt-auto">
            <ModalButton>Track your rate</ModalButton>
          </div>
        </div>
      </div>
    </div>
  )
}

function NavItem({ label, chevron = true }: { label: string, chevron?: boolean }) {
  return (
    <button className="flex items-center gap-1 text-base font-medium text-gray-900 hover:text-primary focus:outline-none bg-transparent">
      {label}
      {chevron && <ChevronDown className="w-4 h-4 text-blue-500" />}
    </button>
  )
}

