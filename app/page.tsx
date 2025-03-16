import { Suspense } from "react"
import dynamic from "next/dynamic"
import HeroSection from "@/components/hero-section"
import PainPointsSolutions from "@/components/pain-points-solutions"
import type { Metadata } from "next"
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

export const metadata: Metadata = {
  title: "RateTracker | Track Your Mortgage Rate and Save",
  description:
    "RateTracker helps you monitor your mortgage rate, calculate savings, and find opportunities to lower your payments. Sign up now and start saving!",
  keywords: ["mortgage", "rate tracking", "refinance", "home loan", "interest rates"],
  openGraph: {
    title: "RateTracker | Track Your Mortgage Rate and Save",
    description: "Monitor your mortgage rate, calculate savings, and lower your payments with RateTracker.",
    url: "http://ratetracker.us",
    siteName: "RateTracker",
    images: [
      {
        url: "http://ratetracker.us/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "RateTracker - Your Mortgage Rate Tracking Solution",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RateTracker | Track Your Mortgage Rate and Save",
    description: "Monitor your mortgage rate, calculate savings, and lower your payments with RateTracker.",
    images: ["http://ratetracker.us/twitter-image.jpg"],
  },
}

export default function Home() {
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
      <HeroSection />

      {/* Calculator Journey Section */}
      <Suspense fallback={<div>Loading calculator...</div>}>
        <CalculatorJourneySection />
      </Suspense>

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

