"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowTrendingUpIcon } from "@heroicons/react/24/solid"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function SavingsAnimation() {
  const [balance, setBalance] = useState(5280)
  const [savings, setSavings] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [monthsPassed, setMonthsPassed] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const controls = useAnimation()
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const startAnimation = () => {
    if (!isAnimating && inView) {
      setIsAnimating(true)
    }
  }

  useEffect(() => {
    if (inView && !isAnimating) {
      startAnimation()
    }
  }, [inView, isAnimating, startAnimation])

  useEffect(() => {
    startAnimation();
  }, [startAnimation]);

  // Start animation when component comes into view
  useEffect(() => {
    if (inView && !isAnimating) {
      startAnimation()
    }
  }, [inView, isAnimating])

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return (
    <div ref={ref} className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col">
      <h3 className="text-xl font-medium text-gray-900 mb-4">Watch Your Savings Grow</h3>

      <div className="relative bg-gray-50 rounded-lg p-4 border border-gray-200 mb-4 flex-grow">
        <div className="absolute top-2 left-2 right-2 bg-gray-800 rounded-t-md p-2">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <p className="text-xs text-gray-300 ml-2">Online Banking</p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 mb-1">Current Balance</p>
          <div className="relative">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 transition-all duration-300">
              ${balance.toLocaleString()}
            </h2>

            {/* Animated coin/dollar that flies up when savings are added */}
            <AnimatePresence>
              {isAnimating && (
                <motion.div
                  className="absolute -right-4 top-1/2 text-green-500 font-bold"
                  initial={{ y: 20, opacity: 0 }}
                  animate={controls}
                >
                  +$432
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="h-32 bg-white rounded border border-gray-200 p-3 mb-4 relative overflow-hidden">
            <p className="text-sm text-gray-500 mb-2 text-left">Transaction History</p>

            <div className="space-y-2 text-left">
              {monthsPassed > 0 &&
                Array.from({ length: Math.min(monthsPassed, 4) }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i }}
                    className="flex justify-between items-center text-sm"
                  >
                    <span className="text-gray-600">Mortgage Savings</span>
                    <span className="text-green-600 font-medium">+$432.00</span>
                  </motion.div>
                ))}

              {monthsPassed === 0 && <p className="text-gray-400 text-sm italic">No recent transactions</p>}
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg p-3 text-left">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-medium text-gray-700">Total Savings</p>
              <p className="text-lg font-bold text-green-600">${savings.toLocaleString()}</p>
            </div>
            <div className="flex items-center text-xs text-gray-500">
              <ArrowTrendingUpIcon className="w-4 h-4 text-green-500 mr-1" />
              <span>From lower mortgage rate</span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={startAnimation}
          disabled={isAnimating}
          className="px-4 py-2 bg-gray-900 text-white rounded-md text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          {isAnimating ? `Month ${monthsPassed}/12` : "Simulate 1 Year of Savings"}
        </button>
        <p className="text-xs text-gray-500 mt-2">See how much you could save with a lower rate</p>
      </div>
    </div>
  )
}

