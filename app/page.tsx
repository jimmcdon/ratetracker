'use client';

import { Suspense, useState } from "react"
import dynamic from "next/dynamic"
import NewHeroSection from "@/components/new-hero-section"
import PainPointsSolutions from "@/components/pain-points-solutions"
import Script from "next/script"
import { CalculatorJourneySection } from "./sections/calculator-journey"
import { CalculatorJourneySectionTest } from "./sections/calculator-journey-test"

const CalculatorCarousel = dynamic(() => import("@/components/calculator-carousel"), {
  loading: () => <div>Loading calculator...</div>,
})

const TestimonialsSection = dynamic(() => import("@/components/testimonials-section"), {
  loading: () => <div>Loading...</div>,
})

const TrackToSaveSection = dynamic(() => import("@/components/track-to-save-section"), {
  loading: () => <div>Loading...</div>,
})

export default function Home() {
  const [variant, setVariant] = useState<'purchase' | 'equity' | 'rate'>('rate');
  
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
      
      <div className="bg-white pt-4 pb-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setVariant('purchase')}
              className={`px-4 py-2 rounded-md ${
                variant === 'purchase'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
            >
              Purchase
            </button>
            <button
              onClick={() => setVariant('equity')}
              className={`px-4 py-2 rounded-md ${
                variant === 'equity'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
            >
              Cash Out
            </button>
            <button
              onClick={() => setVariant('rate')}
              className={`px-4 py-2 rounded-md ${
                variant === 'rate'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
            >
              Refi
            </button>
          </div>
        </div>
      </div>

      <NewHeroSection variant={variant} />

      <div className="flex flex-col gap-8">
        <div className="bg-white py-8">
          <h2 className="text-2xl font-semibold text-center mb-4">Original Version</h2>
          <Suspense fallback={<div>Loading calculator...</div>}>
            <CalculatorJourneySection />
          </Suspense>
        </div>

        <div className="bg-white py-8">
          <h2 className="text-2xl font-semibold text-center mb-4">Updated Version</h2>
          <Suspense fallback={<div>Loading calculator...</div>}>
            <CalculatorJourneySectionTest />
          </Suspense>
        </div>
      </div>

      <PainPointsSolutions />

      <Suspense fallback={<div>Loading testimonials...</div>}>
        <TestimonialsSection />
      </Suspense>
      
      <Suspense fallback={<div>Loading track to save...</div>}>
        <TrackToSaveSection />
      </Suspense>
    </>
  )
}

