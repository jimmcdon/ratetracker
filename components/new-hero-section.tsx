"use client"

import { motion } from "framer-motion"
import { Lock, Headphones, Home, RefreshCcw, PiggyBank } from "lucide-react"
import { PhoneMockup } from "./ui/phone-mockup"
import ModalButton from './modal-button'

interface HeroContentType {
  headline: string[]
  subheadline: string
  cta: string
}

const heroContent: Record<string, HeroContentType> = {
  equity: {
    headline: ["Unlock the Equity", "in Your Home—", "At the Right Time"],
    subheadline: "Tap into your home's value without overpaying. We'll track rates and alert you when the math works in your favor.",
    cta: "Track Rates to Unlock My Cash"
  },
  rate: {
    headline: ["Never Miss a Mortgage", "Rate Drop—Save Thousands", "Automatically"],
    subheadline: "Set your ideal mortgage goal once—whether buying, refinancing, or unlocking cash—and we'll track the market 24/7. Get notified the moment the right rate hits, without spam or sales calls.",
    cta: "Start Tracking My Rate"
  },
  purchase: {
    headline: ["Track Your Rate,", "Buy Your Dream Home", "on Your Terms"],
    subheadline: "Home prices might not wait—but the right mortgage can. We'll alert you the moment rates drop into your comfort zone.",
    cta: "Start Tracking for My Dream Home"
  }
}

interface NewHeroSectionProps {
  variant?: 'equity' | 'rate' | 'purchase'
}

export default function NewHeroSection({ variant = 'rate' }: NewHeroSectionProps) {
  const content = heroContent[variant]

  return (
    <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Choice Buttons */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.location.href = '/?type=rate'}
              className={`flex items-center gap-3 px-6 py-4 rounded-xl w-full sm:w-auto ${
                variant === 'rate'
                  ? 'bg-gray-900 text-white shadow-lg'
                  : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
              }`}
            >
              <RefreshCcw className="w-5 h-5" />
              <span className="text-lg font-medium">Refinance</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.location.href = '/?type=purchase'}
              className={`flex items-center gap-3 px-6 py-4 rounded-xl w-full sm:w-auto ${
                variant === 'purchase'
                  ? 'bg-gray-900 text-white shadow-lg'
                  : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="text-lg font-medium">Buy a Home</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.location.href = '/?type=equity'}
              className={`flex items-center gap-3 px-6 py-4 rounded-xl w-full sm:w-auto ${
                variant === 'equity'
                  ? 'bg-gray-900 text-white shadow-lg'
                  : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
              }`}
            >
              <PiggyBank className="w-5 h-5" />
              <span className="text-lg font-medium">Unlock Cash</span>
            </motion.button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr,1fr] items-start gap-8 md:gap-12">
          {/* Left Column - Content */}
          <div className="relative z-10 text-center md:text-left">
            <div className="mb-6 sm:mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-gray-900 lg:text-6xl">
                {content.headline.map((line, index) => (
                  <span key={index} className="block">{line}</span>
                ))}
              </h1>

              <p className="mt-4 sm:mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed max-w-xl">
                {content.subheadline}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center md:items-start gap-4 justify-center md:justify-start">
              <div className="rounded-md shadow">
                <ModalButton>{content.cta}</ModalButton>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 sm:mt-12 space-y-6 sm:space-y-8">
              {/* Rating */}
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-600">4.9/5 from 200+ homeowners</span>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-col sm:flex-row items-center md:items-start gap-4 sm:gap-6 justify-center md:justify-start">
                <div className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600">Secure. Private. No sales calls.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Headphones className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600">Built by mortgage pros for smart homeowners</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Phone Mockup */}
          <div className="relative z-10 flex justify-center lg:justify-end">
            <div className="w-full max-w-[240px] sm:max-w-[280px] lg:max-w-[320px]">
              <PhoneMockup variant={variant} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 