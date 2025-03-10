import { z } from 'zod'

// Validation schemas
export const mortgageInputSchema = z.object({
  principal: z.number().positive(),
  rate: z.number().min(0).max(100),
  years: z.number().positive().int(),
})

export type MortgageInput = z.infer<typeof mortgageInputSchema>

// Utility functions
export const calculateMonthlyPayment = ({ principal, rate, years }: MortgageInput): number => {
  const monthlyRate = rate / 100 / 12
  const numPayments = years * 12
  return (
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1)
  )
}

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export const calculateTotalInterest = ({ principal, rate, years }: MortgageInput): number => {
  const monthlyPayment = calculateMonthlyPayment({ principal, rate, years })
  return (monthlyPayment * years * 12) - principal
}

export const calculateAmortizationSchedule = ({ principal, rate, years }: MortgageInput) => {
  const monthlyRate = rate / 100 / 12
  const monthlyPayment = calculateMonthlyPayment({ principal, rate, years })
  const schedule = []
  let balance = principal
  
  for (let month = 1; month <= years * 12; month++) {
    const interest = balance * monthlyRate
    const principal = monthlyPayment - interest
    balance -= principal
    
    schedule.push({
      month,
      payment: monthlyPayment,
      principal,
      interest,
      balance: Math.max(0, balance),
    })
  }
  
  return schedule
} 