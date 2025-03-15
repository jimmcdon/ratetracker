"use client"

import { VideoModal } from "@/components/video-modal"
import { Button } from "@/components/ui/button"
import MortgageRateTracker from "./mortgage-rate-tracker"
import ModalButton from './modal-button'
import { motion } from "framer-motion"

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 bg-white" aria-labelledby="hero-heading">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px)] bg-[size:3rem_1px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:1px_3rem]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-white/80" />
      </div>
      <div className="mx-auto max-w-7xl px-4 relative">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
          {/* Left Column - Content */}
          <div className="relative z-10 text-left lg:max-w-xl order-2 lg:order-1">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              id="hero-heading" 
              className="text-4xl sm:text-5xl font-normal tracking-tight text-gray-900 lg:text-6xl mb-8"
            >
              Track Your Rate
              <br />
              Lower your Payment
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-gray-600 mb-10"
            >
              Sign up to RateTracker to get your largest expense lowered. Monitor your rates and maximize savings with
              our intelligent tracking system.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-start gap-4"
            >
              <div className="rounded-md shadow">
                <ModalButton>Track Your Rate</ModalButton>
              </div>
              <VideoModal videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ" />
            </motion.div>
          </div>

          {/* Right Column - Interactive Graph */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative z-10 flex justify-center items-center w-full overflow-hidden order-1 lg:order-2"
          >
            <div className="w-full flex justify-center">
              <MortgageRateTracker />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

