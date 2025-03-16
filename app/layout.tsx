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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background flex flex-col`} suppressHydrationWarning>
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
              <main className="flex-grow">{children}</main>
              <Footer />
            </CalculatorProvider>
          </ButtonHoverProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}