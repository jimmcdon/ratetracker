"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PaymentSavingsCalculator } from "@/components/payment-savings-calculator"
import { calculateMortgage, calculateInterestRate } from "@/lib/mortgage-utils"

export default function CalculatorCarousel() {
  const [loanAmount, setLoanAmount] = useState<string>("")
  const [loanTerm, setLoanTerm] = useState<string>("")
  const [currentRate, setCurrentRate] = useState<string>("")
  const [currentPayment, setCurrentPayment] = useState<string>("")
  const [targetPayment, setTargetPayment] = useState<string>("")
  const [targetRate, setTargetRate] = useState<string>("")
  const [monthlySavings, setMonthlySavings] = useState<number>(0)

  useEffect(() => {
    if (loanAmount && loanTerm && currentRate) {
      const payment = calculateMortgage(Number(loanAmount), Number(currentRate), Number(loanTerm))
      setCurrentPayment(payment.toFixed(2))
    } else {
      setCurrentPayment("")
    }
  }, [loanAmount, loanTerm, currentRate])

  useEffect(() => {
    if (loanAmount && loanTerm && targetPayment) {
      const rate = calculateInterestRate(Number(loanAmount), Number(targetPayment), Number(loanTerm))
      setTargetRate(rate.toFixed(3))
    } else {
      setTargetRate("")
    }
  }, [loanAmount, loanTerm, targetPayment])

  const handleCalculate = () => {
    if (loanAmount && loanTerm && currentRate && targetRate) {
      const currentPayment = calculateMortgage(Number(loanAmount), Number(currentRate), Number(loanTerm))
      const targetPayment = calculateMortgage(Number(loanAmount), Number(targetRate), Number(loanTerm))
      const savings = currentPayment - targetPayment
      setMonthlySavings(savings)
    }
  }

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md">
      <div className="mb-6 space-y-4">
        <div>
          <Label htmlFor="loan-amount">Loan Amount ($)</Label>
          <Input
            id="loan-amount"
            type="number"
            step="1000"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            placeholder="Enter your loan amount"
          />
        </div>
        <div>
          <Label htmlFor="loan-term">Loan Term (Years)</Label>
          <Input
            id="loan-term"
            type="number"
            step="1"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            placeholder="Enter your loan term"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="current-rate">Current Rate (%)</Label>
          <Input
            id="current-rate"
            type="number"
            step="0.125"
            value={currentRate}
            onChange={(e) => setCurrentRate(e.target.value)}
            placeholder="Enter your current rate"
          />
          {currentPayment && (
            <div className="flex justify-center">
              <div className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                Current Payment: ${currentPayment}
              </div>
            </div>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="target-payment">Target Payment ($)</Label>
          <Input
            id="target-payment"
            type="number"
            step="0.01"
            value={targetPayment}
            onChange={(e) => setTargetPayment(e.target.value)}
            placeholder="Enter your target payment"
          />
          {targetRate && (
            <div className="flex justify-center">
              <div className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                Target Rate: {targetRate}%
              </div>
            </div>
          )}
        </div>
        <Button onClick={handleCalculate} className="w-full">
          Calculate Savings
        </Button>
        {monthlySavings > 100 && (
          <Button className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white">What are you waiting for?</Button>
        )}
      </div>
      <PaymentSavingsCalculator
        loanAmount={Number(loanAmount) || 0}
        loanTerm={Number(loanTerm) || 30}
        currentRate={Number(currentRate) || 0}
        currentPayment={Number(currentPayment) || 0}
        targetPayment={Number(targetPayment) || 0}
        targetRate={Number(targetRate) || 0}
      />
    </div>
  )
}

