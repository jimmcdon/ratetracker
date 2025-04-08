import { Suspense } from "react"
import dynamic from "next/dynamic"
import HeroDynamic from "@/components/hero-section-dynamic"
import PainPointsSolutions from "@/components/pain-points-solutions"
import type { Metadata } from "next"
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

export const metadata: Metadata = {
  title: "RateTracker | Smart Mortgage Rate Tracking for Every Need",
  description:
    "RateTracker helps you find the perfect rate for refinancing, purchasing, or accessing your home equity. Track rates, calculate savings, and make smarter mortgage decisions. Start tracking today!",
  keywords: [
    "mortgage",
    "rate tracking",
    "refinance",
    "cash out refinance",
    "home purchase",
    "mortgage rates",
    "home loan",
    "interest rates",
    "equity",
    "rate monitoring"
  ],
  openGraph: {
    title: "RateTracker | Smart Mortgage Rate Tracking for Every Need",
    description: "Find the perfect rate for refinancing, purchasing, or accessing your home equity with RateTracker's intelligent rate monitoring system.",
    url: "http://ratetracker.us",
    siteName: "RateTracker",
    images: [
      {
        url: "http://ratetracker.us/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "RateTracker - Your Complete Mortgage Rate Tracking Solution",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RateTracker | Smart Mortgage Rate Tracking for Every Need",
    description: "Find the perfect rate for refinancing, purchasing, or accessing your home equity with RateTracker's intelligent rate monitoring system.",
    images: ["http://ratetracker.us/twitter-image.jpg"],
  },
}

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "RateTracker",
    url: "http://ratetracker.us",
    description: "Track mortgage rates for refinancing, unlocking your cash, or owning your dream home with RateTracker",
    potentialAction: [
      {
        "@type": "SearchAction",
        target: "http://ratetracker.us/search?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
      {
        "@type": "Action",
        name: "refinance",
        description: "Track rates to refinance your current mortgage"
      },
      {
        "@type": "Action",
        name: "cash-out",
        description: "Monitor rates to unlock your cash at the right time"
      },
      {
        "@type": "Action",
        name: "purchase",
        description: "Find your perfect rate to own your dream home"
      }
    ],
    offers: {
      "@type": "AggregateOffer",
      offerCount: "3",
      itemOffered: [
        {
          "@type": "Service",
          name: "Refinance Rate Tracking",
          description: "Track and monitor rates to refinance your current mortgage"
        },
        {
          "@type": "Service",
          name: "Cash-Out Rate Tracking",
          description: "Monitor rates to unlock your cash at the perfect time"
        },
        {
          "@type": "Service",
          name: "Purchase Rate Tracking",
          description: "Track rates to own your dream home at the perfect time"
        }
      ]
    }
  }

  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <HeroDynamic />

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

