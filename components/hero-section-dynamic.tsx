"use client"

import { VideoModal } from "@/components/video-modal"
import ModalButton from './modal-button'
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import Image from 'next/image'

const benefitMessages = [
  { 
    case: "Refinance", 
    message: "Lower Your Payment",
    image: "/hero-lower-payment.png"
  },
  { 
    case: "Cash Out", 
    message: "Unlock Your Cash",
    image: "/hero-unlock-cash.png"
  },
  { 
    case: "Purchase", 
    message: "Own Your Dream Home",
    image: "/hero-dream-home.png"
  }
];

export default function HeroDynamic() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % benefitMessages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[100svh] flex items-center bg-white" aria-labelledby="hero-heading">
      {/* Logo */}
      <div className="absolute top-5 left-8 z-10">
        <div className="text-xl font-bold text-gray-900">
          <span className="italic">
            Rate<span className="text-gray-600">T</span>racker
          </span>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />
      </div>
      <div className="mx-auto max-w-5xl px-4 py-8 w-full">
        <div className="flex flex-col items-center text-center gap-6 pt-5">
          {/* Headline */}
          <div className="relative">
            <h1 id="hero-heading" className="text-4xl sm:text-5xl font-semibold tracking-tight text-gray-900 lg:text-6xl mb-3">
              Track Your Rate
            </h1>
            <div className="h-16">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-xl sm:text-2xl font-medium text-gray-700"
                >
                  {benefitMessages[currentIndex].message}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Hero Images */}
          <div className="w-full max-w-xl">
            <div className="aspect-[4/3] relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={benefitMessages[currentIndex].image}
                    alt={benefitMessages[currentIndex].message}
                    fill
                    className="object-contain"
                    priority={currentIndex === 0}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <div className="rounded-md shadow">
              <ModalButton>Start Tracking</ModalButton>
            </div>
            <VideoModal videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ" />
          </div>
        </div>
      </div>
    </section>
  )
} 