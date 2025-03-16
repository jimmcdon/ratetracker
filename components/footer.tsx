"use client"

import * as React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export const Footer: React.FC = () => {
  const [email, setEmail] = React.useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [submitStatus, setSubmitStatus] = React.useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // TODO: Implement newsletter signup logic
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSubmitStatus("success")
    setIsSubmitting(false)
  }

  return (
    <footer className="bg-gray-100 text-gray-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Logo and Social Links */}
          <div className="lg:col-span-4">
            <div className="flex items-center space-x-2 mb-6">
              <div className="text-gray-900 font-bold text-2xl italic">
                Rate<span className="text-gray-600">Tracker</span>
              </div>
            </div>
            <p className="text-gray-500 mb-6">
              Empowering homeowners to make informed decisions about their mortgages through real-time rate tracking and expert guidance.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-4">
            <h3 className="text-gray-900 font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-500 hover:text-gray-700 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/features" className="text-gray-500 hover:text-gray-700 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-500 hover:text-gray-700 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-500 hover:text-gray-700 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="lg:col-span-4">
            <h3 className="text-gray-900 font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-500 mb-4">
              Subscribe to our newsletter for the latest mortgage insights and updates.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className={cn(
                    "w-full pl-10 pr-4 py-3",
                    "bg-white border border-gray-200",
                    "text-gray-900 placeholder-gray-400",
                    "rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900",
                    "transition-all duration-200"
                  )}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full flex items-center justify-center",
                  "px-6 py-3 rounded-lg",
                  "bg-gray-900 text-white",
                  "hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900",
                  "transition-all duration-200",
                  isSubmitting && "opacity-75 cursor-not-allowed"
                )}
              >
                {isSubmitting ? (
                  "Subscribing..."
                ) : (
                  <>
                    Subscribe <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </button>
              {submitStatus === "success" && (
                <p className="text-gray-700 text-sm">Thank you for subscribing!</p>
              )}
              {submitStatus === "error" && (
                <p className="text-gray-700 text-sm">Something went wrong. Please try again.</p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} RateTracker. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-500 hover:text-gray-700 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-gray-700 text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

