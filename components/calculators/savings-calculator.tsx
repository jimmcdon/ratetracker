"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useCalculatorContext } from "@/contexts/calculator-context"
import { formatCurrency } from "@/lib/utils/calculator"

interface SavingsCalculatorProps {
  onCalculate?: (monthlySavings: number) => void
}

export function SavingsCalculator({ onCalculate }: SavingsCalculatorProps) {
  const { setMonthlySavings, setYearlySavings } = useCalculatorContext()
  const [currentPayment, setCurrentPayment] = useState("")
  const [targetPayment, setTargetPayment] = useState("")

  const handleCalculate = () => {
    const current = parseFloat(currentPayment)
    const target = parseFloat(targetPayment)
    
    if (!isNaN(current) && !isNaN(target)) {
      const monthlySavings = current - target
      const yearlySavings = monthlySavings * 12
      
      setMonthlySavings(monthlySavings)
      setYearlySavings(yearlySavings)
      onCalculate?.(monthlySavings)
    }
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Savings Calculator</h2>
          <p className="text-gray-500">Calculate your potential savings by comparing your current and target mortgage payments.</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPayment">Current Monthly Payment</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <Input
                id="currentPayment"
                type="text"
                placeholder="0.00"
                value={currentPayment}
                onChange={(e) => setCurrentPayment(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetPayment">Target Monthly Payment</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <Input
                id="targetPayment"
                type="text"
                placeholder="0.00"
                value={targetPayment}
                onChange={(e) => setTargetPayment(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </div>

        <Button 
          onClick={handleCalculate}
          className="w-full"
          disabled={!currentPayment || !targetPayment}
        >
          Calculate Savings
        </Button>

        {parseFloat(currentPayment) > 0 && parseFloat(targetPayment) > 0 && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Your Potential Savings</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Monthly Savings</p>
                <p className="text-xl font-semibold text-primary">
                  {formatCurrency(parseFloat(currentPayment) - parseFloat(targetPayment))}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Yearly Savings</p>
                <p className="text-xl font-semibold text-primary">
                  {formatCurrency((parseFloat(currentPayment) - parseFloat(targetPayment)) * 12)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
} 