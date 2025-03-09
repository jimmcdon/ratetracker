import { Suspense } from "react"
import dynamic from "next/dynamic"
import HeroSection from "@/components/hero-section"
import PainPointsSolutions from "@/components/pain-points-solutions"
import type { Metadata } from "next"
import Script from "next/script"
import SavingsAnimation from "@/components/savings-animation"

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
  const openModal = () => {
    // Implement modal opening logic here
    console.log("Opening modal")
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
                <CalculatorCarousel />
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

