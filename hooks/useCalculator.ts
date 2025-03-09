"use client"

import { useState } from "react"
import { calculateMortgage } from "@/lib/mortgage-utils"

interface CalculatorInputs {
  loanAmount: number
  interestRate: number
  loanTerm: number
}

interface CalculatorResults {
  monthlyPayment: number
  totalInterest: number
  totalPayment: number
}

export function useCalculator(initialInputs: CalculatorInputs) {
  const [inputs, setInputs] = useState<CalculatorInputs>(initialInputs)
  const [results, setResults] = useState<CalculatorResults | null>(null)

  const calculateResults = () => {
    const monthlyPayment = calculateMortgage(inputs.loanAmount, inputs.interestRate, inputs.loanTerm)
    const totalPayment = monthlyPayment * inputs.loanTerm * 12
    const totalInterest = totalPayment - inputs.loanAmount

    setResults({
      monthlyPayment,
      totalInterest,
      totalPayment,
    })
  }

  const updateInput = (name: keyof CalculatorInputs, value: number) => {
    setInputs((prev) => ({ ...prev, [name]: value }))
  }

  return {
    inputs,
    results,
    updateInput,
    calculateResults,
  }
}

