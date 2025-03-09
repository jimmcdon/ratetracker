"use client"

import type React from "react"
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface FooterProps {
  openModal: () => void
}

export function Footer({ openModal }: FooterProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    openModal()
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Left Column */}
          <div>
            <div className="text-2xl font-bold italic text-white mb-4">RateTracker</div>
            <p className="text-gray-300 max-w-md">Effortlessly Track your Rate, and Optimize Your Personal Finances.</p>
          </div>

          {/* Right Column */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">Join our newsletter</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter to get more free design courses and resources
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2 max-w-md">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                required
              />
              <Button type="submit" className="bg-white text-gray-900 hover:bg-gray-200 transition-colors">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-gray-700">
          <div className="text-sm text-gray-400 mb-4 sm:mb-0">Copyright © 2025 RateTracker. All Rights Reserved</div>
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

