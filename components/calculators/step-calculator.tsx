"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowLeft, Calculator, ArrowRightCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useCalculatorContext } from "@/contexts/calculator-context"
import { formatCurrency } from "@/lib/utils/calculator"
import { calculateMonthlyPayment } from "@/lib/utils/calculator"
import ModalButton from '@/components/modal-button'

interface StepCalculatorProps {
  onCalculate?: (monthlySavings: number) => void
}

type Step = {
  id: string
  title: string
  description?: string
}

const steps: Step[] = [
  {
    id: "welcome",
    title: "Let's find your target and see how much you will save!",
    description: "We'll help you understand your potential savings with a lower rate."
  },
  {
    id: "loan-amount",
    title: "What is your loan amount?",
    description: "Enter the total amount of your mortgage loan."
  },
  {
    id: "loan-term",
    title: "What is the term of your loan?",
    description: "Enter the length of your mortgage in years."
  },
  {
    id: "current-rate",
    title: "What is your current interest rate?",
    description: "Enter your current mortgage interest rate as a percentage."
  },
  {
    id: "payment-inputs",
    title: "What monthly payment are you targeting?",
    description: "Enter the monthly payment you'd like to achieve based on your current payment."
  },
  {
    id: "results",
    title: "Here's your target rate to track",
    description: "We'll notify you when rates drop to this level."
  }
]

export function StepCalculator({ onCalculate }: StepCalculatorProps) {
  const { setMonthlySavings, setYearlySavings } = useCalculatorContext()
  const [currentStep, setCurrentStep] = useState(0)
  const [loanAmount, setLoanAmount] = useState("")
  const [loanTerm, setLoanTerm] = useState("")
  const [currentRate, setCurrentRate] = useState("")
  const [targetPayment, setTargetPayment] = useState("")

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      // Set default target payment when moving to payment-inputs step
      if (steps[currentStep + 1].id === "payment-inputs") {
        const currentPayment = getCurrentPayment()
        const defaultTarget = Math.floor(currentPayment / 500) * 500
        setTargetPayment(defaultTarget.toString())
      }
      setCurrentStep(current => current + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(current => current - 1)
    }
  }

  const calculateTargetRate = () => {
    const amount = parseFloat(loanAmount)
    const years = parseFloat(loanTerm)
    const target = parseFloat(targetPayment)
    
    // Binary search to find the rate that gives us our target payment
    let low = 0
    let high = 20 // Max 20% rate
    let mid
    let iterations = 0
    const MAX_ITERATIONS = 50
    const TOLERANCE = 0.01

    while (iterations < MAX_ITERATIONS) {
      mid = (low + high) / 2
      const payment = calculateMonthlyPayment({
        principal: amount,
        rate: mid,
        years: years
      })

      if (Math.abs(payment - target) < TOLERANCE) {
        return mid
      }

      if (payment > target) {
        high = mid
      } else {
        low = mid
      }
      iterations++
    }

    return mid
  }

  const getCurrentPayment = () => {
    const amount = parseFloat(loanAmount)
    const years = parseFloat(loanTerm)
    const rate = parseFloat(currentRate)

    return calculateMonthlyPayment({
      principal: amount,
      rate: rate,
      years: years
    })
  }

  const handleCalculate = () => {
    const current = getCurrentPayment()
    const target = parseFloat(targetPayment)
    
    if (!isNaN(current) && !isNaN(target)) {
      const monthlySavings = current - target
      const yearlySavings = monthlySavings * 12
      
      setMonthlySavings(monthlySavings)
      setYearlySavings(yearlySavings)
      onCalculate?.(monthlySavings)
      handleNext()
    }
  }

  const formatInput = (value: string, isPercent = false) => {
    // Remove any non-numeric characters except decimal point
    let formatted = value.replace(/[^\d.]/g, '')
    
    // Ensure only one decimal point
    const parts = formatted.split('.')
    if (parts.length > 2) {
      formatted = parts[0] + '.' + parts.slice(1).join('')
    }
    
    // Add % for percentage inputs if needed
    return isPercent ? formatted + '%' : formatted
  }

  const renderStepContent = (step: Step) => {
    switch (step.id) {
      case "welcome":
        return (
          <div className="text-center">
            <div className="mb-6">
              <Calculator className="w-12 h-12 mx-auto text-primary animate-pulse-scale" />
            </div>
            <Button onClick={handleNext} className="mt-6">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )
      
      case "loan-amount":
        return (
          <div className="space-y-4">
            <div className="relative w-48 mx-auto">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <Input
                type="text"
                placeholder="0.00"
                value={loanAmount}
                onChange={(e) => setLoanAmount(formatInput(e.target.value))}
                className="pl-8 text-lg text-center"
                autoFocus
              />
            </div>
            <div className="flex justify-between">
              <Button variant="ghost" onClick={handleBack}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button 
                onClick={handleNext}
                disabled={!loanAmount || parseFloat(loanAmount) <= 0}
              >
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )
      
      case "loan-term":
        return (
          <div className="space-y-4">
            <div className="relative w-32 mx-auto">
              <Input
                type="text"
                placeholder="30"
                value={loanTerm}
                onChange={(e) => setLoanTerm(formatInput(e.target.value))}
                className="text-lg text-center pr-14"
                autoFocus
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">years</span>
            </div>
            <div className="flex justify-between">
              <Button variant="ghost" onClick={handleBack}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button 
                onClick={handleNext}
                disabled={!loanTerm || parseFloat(loanTerm) <= 0}
              >
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )

      case "current-rate":
        return (
          <div className="space-y-4">
            <div className="relative w-32 mx-auto">
              <Input
                type="text"
                placeholder="5.5"
                value={currentRate.replace('%', '')}
                onChange={(e) => setCurrentRate(formatInput(e.target.value, true))}
                className="text-lg text-center pr-8"
                autoFocus
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
            </div>
            <div className="flex justify-between">
              <Button variant="ghost" onClick={handleBack}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button 
                onClick={handleNext}
                disabled={!currentRate || parseFloat(currentRate) <= 0}
              >
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )

      case "payment-inputs":
        const currentPayment = getCurrentPayment()
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="relative flex items-center justify-center gap-4">
                <div className="relative w-48">
                  <p className="text-sm text-gray-500 mb-2 text-center">Target Monthly Payment</p>
                  <span className="absolute left-3 top-[calc(50%+4px)] -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    type="text"
                    placeholder="0.00"
                    value={targetPayment}
                    onChange={(e) => setTargetPayment(formatInput(e.target.value))}
                    className="pl-8 text-lg text-center"
                    autoFocus
                  />
                </div>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="flex flex-col items-start"
                >
                  <span className="text-xs text-gray-500">Current Payment</span>
                  <span className="text-sm font-medium text-gray-700">{formatCurrency(currentPayment)}</span>
                </motion.div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-xs font-medium text-gray-500 mb-3 text-center">Current Loan Details</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Loan Amount:</span>
                    <span className="text-sm font-medium text-gray-700">{formatCurrency(parseFloat(loanAmount))}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Term:</span>
                    <span className="text-sm font-medium text-gray-700">{loanTerm} years</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Rate:</span>
                    <span className="text-sm font-medium text-gray-700">{currentRate}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                    <span className="text-sm text-gray-500">Monthly Payment:</span>
                    <span className="text-sm font-semibold text-gray-900">{formatCurrency(currentPayment)}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="ghost" onClick={handleBack}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button 
                  onClick={handleCalculate}
                  disabled={!targetPayment || parseFloat(targetPayment) <= 0}
                >
                  Calculate <Calculator className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )
      
      case "results":
        const targetRate = calculateTargetRate() || 0
        const monthlySavings = getCurrentPayment() - parseFloat(targetPayment)
        const yearlySavings = monthlySavings * 12
        
        return (
          <div className="space-y-6">
            <div className="grid gap-4">
              <div className="p-6 bg-primary/10 rounded-lg text-center">
                <p className="text-sm text-gray-500 mb-2">Target Rate to Track</p>
                <p className="text-3xl font-semibold text-primary">
                  {targetRate.toFixed(2)}%
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-primary/5 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Monthly Savings</p>
                  <p className="text-xl font-semibold text-primary">
                    {formatCurrency(monthlySavings)}
                  </p>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Yearly Savings</p>
                  <p className="text-xl font-semibold text-primary">
                    {formatCurrency(yearlySavings)}
                  </p>
                </div>
              </div>
            </div>
            <div className="pt-4">
              <div className="w-full">
                <ModalButton>Track Your Rate Now!</ModalButton>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <Card className="max-w-xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="p-6"
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-gray-900">
                {steps[currentStep].title}
              </h2>
              {steps[currentStep].description && (
                <p className="text-gray-500">
                  {steps[currentStep].description}
                </p>
              )}
              <div className="flex items-center gap-2 pt-4">
                {steps.map((step, index) => (
                  <button
                    key={step.id}
                    onClick={() => index < currentStep && setCurrentStep(index)}
                    disabled={index > currentStep}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      index === currentStep
                        ? "w-8 bg-primary"
                        : index < currentStep
                        ? "w-8 bg-primary/40 hover:bg-primary/60"
                        : "w-4 bg-gray-200 cursor-not-allowed"
                    }`}
                    title={step.title}
                  />
                ))}
              </div>
            </div>
            
            {renderStepContent(steps[currentStep])}
          </div>
        </motion.div>
      </AnimatePresence>
    </Card>
  )
} 