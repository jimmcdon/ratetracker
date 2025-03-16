"use client"

import * as React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { cn } from "@/lib/utils"

const TrackToSaveSection: React.FC = () => {
  return (
    <section className="relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
      </div>

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-16 px-4 sm:px-6 lg:px-8 py-32">
        {/* Left Column - CTA Content */}
        <div className="flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-normal text-gray-900 mb-6">
              Want a professional, extraordinary service tailored to your needs?{" "}
              <span className="font-semibold text-gray-900">Get in touch</span>
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              We've helped thousands of{" "}
              <span className="text-gray-900">homeowners save money</span>{" "}
              on their mortgages, and we can help you too.
            </p>
            <Link
              href="/signup"
              className={cn(
                "inline-flex items-center px-8 py-4",
                "bg-gray-900 text-white rounded-xl",
                "text-base font-medium",
                "transition-all duration-200",
                "hover:bg-gray-800 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              )}
            >
              Talk to us
            </Link>
          </motion.div>
        </div>

        {/* Right Column - Featured Testimonial */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:pl-8"
        >
          <blockquote className="relative bg-white rounded-2xl p-8 shadow-sm">
            <p className="text-xl text-gray-900 font-normal mb-8">
              "RateTracker literally took our requirements and quite literally ran with them. To anyone reading this - I can't recommend RateTracker enough, your savings goals will be met exceptionally well, and you will be delighted with the end result."
            </p>
            <footer className="mt-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-lg font-medium text-gray-600">J</span>
                  </div>
                </div>
                <div className="ml-4">
                  <div className="text-base font-medium text-gray-900">John Shahawy</div>
                  <div className="text-sm text-gray-500">Founder - Moonbeam, Rogue.</div>
                </div>
              </div>
            </footer>
          </blockquote>
        </motion.div>
      </div>
    </section>
  )
}

export default TrackToSaveSection

