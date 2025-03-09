"use client"

import { Suspense, useState } from "react"
import dynamic from "next/dynamic"
import HeroSection from "@/components/hero-section"
import PainPointsSolutions from "@/components/pain-points-solutions"
import Script from "next/script"
import SavingsAnimation from "@/components/savings-animation"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const CalculatorCarousel = dynamic(() => import("@/components/calculator-carousel"), {
  loading: () => <div>Loading...</div>,
})

const HowItWorksSection = dynamic(() => import("@/components/how-it-works-section"), {
  loading: () => <div>Loading...</div>,
})

const FeaturesSection = dynamic(() => import("@/components/features-section"), {
  loading: () => <div>Loading...</div>,
})

const TestimonialsSection = dynamic(() => import("@/components/testimonials-section"), {
  loading: () => <div>Loading...</div>,
})

const TrackToSaveSection = dynamic(() => import("@/components/track-to-save-section"), {
  loading: () => <div>Loading...</div>,
})

export default function ClientPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "RateTracker",
    url: "http://ratetracker.us",
    description: "Track your mortgage rate and save money with RateTracker",
    potentialAction: {
      "@type": "SearchAction",
      target: "http://ratetracker.us/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  }

  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HeroSection openModal={openModal} />

      {/* Calculator section moved here, right after the hero */}
      <Suspense fallback={<div>Loading calculator...</div>}>
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="text-3xl font-normal text-center text-primary mb-8">Calculate Your Mortgage Options</h2>
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="w-full lg:w-2/3 order-2 lg:order-1">
                <CalculatorCarousel onTargetPaymentEntered={openModal} />
                {/* Tabs added below the calculator */}
                {/* Carousel navigation */}
                <div className="mt-8 flex justify-center space-x-2">
                  {["Default", "Term Shortening", "Cash Out", "Purchase"].map((tab, index) => (
                    <button
                      key={tab}
                      className="w-3 h-3 rounded-full bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      aria-label={`View ${tab} calculator`}
                    />
                  ))}
                </div>
              </div>
              <div className="w-full lg:w-1/3 order-1 lg:order-2">
                <SavingsAnimation />
              </div>
            </div>
          </div>
        </section>
      </Suspense>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">What are you waiting for?</h3>
            <p className="mb-4">Track your rate to save!</p>
            <Image
              src="/placeholder.svg?height=200&width=200"
              alt="Savings meme"
              width={200}
              height={200}
              className="mx-auto mb-4"
            />
            <Button onClick={closeModal} className="w-full">
              Track Your Rate
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <PainPointsSolutions />

      <Suspense fallback={<div>Loading how it works...</div>}>
        <HowItWorksSection />
      </Suspense>
      <Suspense fallback={<div>Loading features...</div>}>
        <FeaturesSection />
      </Suspense>
      <Suspense fallback={<div>Loading testimonials...</div>}>
        <TestimonialsSection />
      </Suspense>
      <Suspense fallback={<div>Loading track to save...</div>}>
        <TrackToSaveSection openModal={openModal} />
      </Suspense>
    </>
  )
}

