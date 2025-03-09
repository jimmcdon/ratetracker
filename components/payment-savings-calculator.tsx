"use client"

import { TrendingDown } from "lucide-react"
import { calculateMortgage } from "@/lib/mortgage-utils"

interface PaymentSavingsCalculatorProps {
  currentRate: number
  targetRate: number
  loanAmount: number
  loanTerm: number
}

export function PaymentSavingsCalculator({
  currentRate = 0,
  targetRate = 0,
  loanAmount = 0,
  loanTerm = 30,
}: PaymentSavingsCalculatorProps) {
  const currentPayment = calculateMortgage(loanAmount, currentRate, loanTerm)
  const targetPayment = calculateMortgage(loanAmount, targetRate, loanTerm)
  const monthlySavings = currentPayment - targetPayment
  const yearlySavings = monthlySavings * 12

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm transition-all duration-300 ease-in-out">
      <div className="flex justify-between items-start mb-8">
        <div>
          <p className="text-sm text-gray-600">Monthly Payment Savings</p>
          <h3 className="text-4xl font-normal text-gray-900 mt-1 transition-all duration-300 ease-in-out">
            ${Math.max(0, Math.round(monthlySavings)).toLocaleString()}
          </h3>
          <p className="text-sm text-gray-600 mt-1 transition-all duration-300 ease-in-out">
            ${Math.max(0, Math.round(yearlySavings)).toLocaleString()} saved per year
          </p>
        </div>
        <div className="bg-gray-100 p-3 rounded-full">
          <TrendingDown className="w-6 h-6 text-gray-600" />
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-normal text-gray-600">Current Rate</p>
            <p className="text-2xl font-normal text-gray-900">{currentRate.toFixed(3)}%</p>
            <p className="text-sm text-gray-600">${Math.round(currentPayment).toLocaleString()}/mo</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-normal text-gray-600">Target Rate</p>
            <p className="text-2xl font-normal text-gray-900">{targetRate.toFixed(3)}%</p>
            <p className="text-sm text-gray-600">${Math.round(targetPayment).toLocaleString()}/mo</p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Example based on:</p>
          <p className="text-sm font-medium text-gray-900">
            ${loanAmount.toLocaleString()} loan balance • {loanTerm} year fixed
          </p>
        </div>
      </div>
    </div>
  )
}

