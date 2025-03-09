"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface CalculatorContextType {
  monthlySavings: number
  setMonthlySavings: (savings: number) => void
  yearlySavings: number
  setYearlySavings: (savings: number) => void
}

const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined)

export function CalculatorProvider({ children }: { children: ReactNode }) {
  const [monthlySavings, setMonthlySavings] = useState(0)
  const [yearlySavings, setYearlySavings] = useState(0)

  return (
    <CalculatorContext.Provider
      value={{
        monthlySavings,
        setMonthlySavings,
        yearlySavings,
        setYearlySavings,
      }}
    >
      {children}
    </CalculatorContext.Provider>
  )
}

export function useCalculatorContext() {
  const context = useContext(CalculatorContext)
  if (context === undefined) {
    throw new Error("useCalculatorContext must be used within a CalculatorProvider")
  }
  return context
}

