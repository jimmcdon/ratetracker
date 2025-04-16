import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { FooterTransition } from "@/components/footer-transition"
import { CalculatorProvider } from "@/contexts/calculator-context"
import { ButtonHoverProvider } from "@/contexts/ButtonHoverContext"
import { Toaster } from "@/components/ui/toaster"
import { metadata as pageMetadata } from "./metadata"
import { PostHogProvider } from "@/components/PostHogProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  ...pageMetadata,
  metadataBase: new URL("http://ratetracker.us"), // Changed to http for now, but should be https when available
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background flex flex-col relative`} suppressHydrationWarning>
        <PostHogProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
            storageKey="ratetracker-theme"
          >
            <ButtonHoverProvider>
              <CalculatorProvider>
                <MainNav />
                <main className="flex-grow pt-20 bg-white">{children}</main>
                <Footer />
                <Toaster />
              </CalculatorProvider>
            </ButtonHoverProvider>
          </ThemeProvider>
        </PostHogProvider>
      </body>
    </html>
  )
}
