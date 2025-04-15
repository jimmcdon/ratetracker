'use client';

import { Suspense, useState, useEffect } from "react"
import dynamic from "next/dynamic"
import NewHeroSection from "@/components/new-hero-section"
import PainPointsSolutions from "@/components/pain-points-solutions"
import Script from "next/script"
import { CalculatorJourneySection } from "./sections/calculator-journey"

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

  // Update variant based on URL parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type') as 'purchase' | 'equity' | 'rate';
    if (type && ['purchase', 'equity', 'rate'].includes(type)) {
      setVariant(type);
    }
  }, []);
  
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

      <NewHeroSection variant={variant} />

      <div className="flex flex-col gap-8">
        <Suspense fallback={<div>Loading calculator...</div>}>
          <CalculatorJourneySection />
        </Suspense>
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

