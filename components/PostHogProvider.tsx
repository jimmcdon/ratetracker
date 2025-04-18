"use client"

import posthog from "posthog-js"
import { PostHogProvider as PHProvider, usePostHog } from "posthog-js/react"
import { Suspense, useEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const [posthogLoaded, setPosthogLoaded] = useState(false)

  useEffect(() => {
    try {
      // Only initialize if we have a key
      if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
        posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
          api_host: "/ingest",
          ui_host: "https://us.posthog.com",
          capture_pageview: false, // We capture pageviews manually
          capture_pageleave: true, // Enable pageleave capture
          debug: process.env.NODE_ENV === "development",
          loaded: (ph) => {
            setPosthogLoaded(true)
          },
          // Add error handling to prevent PostHog from affecting the main application
          on_error: (error) => {
            console.error("PostHog error:", error)
            // This prevents PostHog errors from breaking the app
            return true
          }
        })
      } else {
        console.log("PostHog disabled - no API key found")
      }
    } catch (error) {
      console.error("Failed to initialize PostHog:", error)
    }
  }, [])

  // If PostHog fails to load, just render the children without analytics
  if (!posthogLoaded && process.env.NODE_ENV === 'production') {
    return <>{children}</>
  }

  return (
    <PHProvider client={posthog}>
      <SuspendedPostHogPageView />
      {children}
    </PHProvider>
  )
}

function PostHogPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const posthog = usePostHog()

  useEffect(() => {
    try {
      if (pathname && posthog) {
        let url = window.origin + pathname
        const search = searchParams.toString()
        if (search) {
          url += "?" + search
        }
        posthog.capture("$pageview", { "$current_url": url })
      }
    } catch (error) {
      console.error("Error capturing pageview:", error)
    }
  }, [pathname, searchParams, posthog])

  return null
}

function SuspendedPostHogPageView() {
  return (
    <Suspense fallback={null}>
      <PostHogPageView />
    </Suspense>
  )
}
