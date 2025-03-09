import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import "./globals.css"
import { FooterTransition } from "@/components/footer-transition"
import { CalculatorProvider } from "@/contexts/calculator-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
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
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-background flex flex-col`}>
        <CalculatorProvider>
          <MainNav openModal={() => {}} />
          <main className="flex-grow">{children}</main>
          <FooterTransition />
          <Footer openModal={() => {}} />
        </CalculatorProvider>
      </body>
    </html>
  )
}



import './globals.css'