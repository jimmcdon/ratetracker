"use client"

import { VideoModal } from "@/components/video-modal"
import { Button } from "@/components/ui/button"
import MortgageRateTracker from "./mortgage-rate-tracker"
import ModalButton from './modal-button'
import { motion } from "framer-motion"
import { ArrowRight, TrendingDown, Wallet, Home } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-24 md:pt-32 pb-16 bg-white" aria-labelledby="hero-heading">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px)] bg-[size:3rem_1px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:1px_3rem]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-white/80" />
      </div>
      <div className="mx-auto max-w-7xl px-4 relative">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
          {/* Left Column - Content */}
          <div className="relative z-10 text-left lg:max-w-xl order-2 lg:order-1">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h1 id="hero-heading" className="text-4xl sm:text-5xl font-normal tracking-tight text-gray-900 lg:text-6xl mb-6">
                Track Your Rate
                <span className="block text-2xl sm:text-3xl lg:text-4xl mt-4 text-gray-600 font-light">Get More From Your Mortgage</span>
              </h1>

              {/* Benefit Pills */}
              <div className="space-y-4 mt-8">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex items-center gap-3 text-gray-700"
                >
                  <div className="bg-blue-50 p-2 rounded-full">
                    <TrendingDown className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-lg">Save when rates drop</span>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex items-center gap-3 text-gray-700"
                >
                  <div className="bg-green-50 p-2 rounded-full">
                    <Wallet className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-lg">Access equity at the right time</span>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="flex items-center gap-3 text-gray-700"
                >
                  <div className="bg-purple-50 p-2 rounded-full">
                    <Home className="w-5 h-5 text-purple-600" />
                  </div>
                  <span className="text-lg">Buy when the rate is right</span>
                </motion.div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-start gap-4 mt-8"
            >
              <div className="rounded-md shadow">
                <ModalButton>Track Your Rate</ModalButton>
              </div>
              <VideoModal videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ" />
            </motion.div>
          </div>

          {/* Right Column - Interactive Graph */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 w-full lg:w-[120%] order-1 lg:order-2 group -mx-4 lg:mx-0"
          >
            <div className="w-full">
              <div className="relative">
                {/* Animated border */}
                <div 
                  className="absolute -inset-0.5 bg-gradient-to-r from-gray-100 via-gray-900 to-gray-100 rounded-lg blur opacity-30 
                  transition duration-1000 animate-gradient-x"
                  style={{ backgroundSize: '200% 100%', animationDelay: '1s' }}
                ></div>
                
                {/* Calculator container */}
                <div className="relative bg-white rounded-lg">
                  <MortgageRateTracker />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

