"use client"

import { VideoModal } from "@/components/video-modal"
import { Button } from "@/components/ui/button"
import MortgageRateTracker from "./mortgage-rate-tracker"

interface HeroSectionProps {
  openModal: () => void
}

export default function HeroSection({ openModal }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden pt-4 pb-16 bg-white" aria-labelledby="hero-heading">
      <div className="mx-auto max-w-7xl px-4 -mt-8">
        {/* Change the grid to a flex layout for better control */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Column - Content */}
          <div className="relative z-10 text-left lg:max-w-xl">
            <h1 id="hero-heading" className="text-5xl font-normal tracking-tight text-gray-900 lg:text-6xl mb-6">
              Track Your Rate
              <br />
              Lower your Payment
            </h1>
            <p className="mt-6 text-lg text-gray-600 mb-8">
              Sign up to RateTracker to get your largest expense lowered. Monitor your rates and maximize savings with
              our intelligent tracking system.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Button
                className="rounded-full bg-gray-900 px-8 py-6 text-lg font-medium text-white hover:bg-gray-800 transition-colors w-full sm:w-auto"
                onClick={openModal}
                aria-haspopup="dialog"
              >
                Track Your Rate
              </Button>
              <VideoModal videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ" />
            </div>
          </div>

          {/* Right Column - Interactive Graph */}
          <div className="relative w-full lg:w-auto">
            <MortgageRateTracker width="max-w-5xl" />
          </div>
        </div>
      </div>
    </section>
  )
}

