"use client"

import { VideoModal } from "@/components/video-modal"
import { Button } from "@/components/ui/button"
import MortgageRateTracker from "./mortgage-rate-tracker"
import ModalButton from './modal-button'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 bg-white" aria-labelledby="hero-heading">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
          {/* Left Column - Content */}
          <div className="relative z-10 text-left lg:max-w-xl order-2 lg:order-1">
            <h1 id="hero-heading" className="text-4xl sm:text-5xl font-normal tracking-tight text-gray-900 lg:text-6xl mb-8">
              Track Your Rate
              <br />
              Lower your Payment
            </h1>
            <p className="text-base sm:text-lg text-gray-600 mb-10">
              Sign up to RateTracker to get your largest expense lowered. Monitor your rates and maximize savings with
              our intelligent tracking system.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="rounded-md shadow">
                <ModalButton>Track Your Rate</ModalButton>
              </div>
              <VideoModal videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ" />
            </div>
          </div>

          {/* Right Column - Interactive Graph */}
          <div className="relative flex justify-center items-center w-full overflow-hidden order-1 lg:order-2">
            <div className="w-full flex justify-center">
              <MortgageRateTracker />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

