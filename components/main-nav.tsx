"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { X, Menu } from "lucide-react"

export function MainNav() {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "#" },
    { label: "Contact", href: "/contact" },
    { label: "Track Your Rate", href: "/signup" },
  ]

  useEffect(() => {
    const html = document.querySelector("html")
    if (html) html.style.overflow = isOpen ? "hidden" : ""
    return () => {
      if (html) html.style.overflow = ""
    }
  }, [isOpen])

  return (
    <nav className="border-b border-border bg-background" aria-label="Main Navigation">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="text-xl font-bold italic text-primary relative">
              <span>
                Rate<span className="text-slate-800">T</span>racker
              </span>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-secondary hover:bg-slate-100 hover:text-slate-800 px-3 py-2 rounded-md text-sm font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="md:hidden">
            <Button
              onClick={() => setIsOpen(!isOpen)}
              variant="ghost"
              size="icon"
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="fixed inset-0 z-50 bg-background">
          <div className="pt-5 pb-6 px-4">
            <div className="flex items-center justify-between">
              <div className="text-xl font-bold italic text-primary">RateTracker</div>
              <Button onClick={() => setIsOpen(false)} variant="ghost" size="icon" aria-label="Close menu">
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="mt-6">
              <nav className="grid gap-y-8">
                {menuItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-secondary hover:bg-slate-100 hover:text-slate-800 px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

