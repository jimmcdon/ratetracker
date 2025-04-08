"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowLeft, Calculator, ArrowRightCircle, Home, Banknote, TrendingDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useCalculatorContext } from "@/contexts/calculator-context"
import { formatCurrency } from "@/lib/utils/calculator"
import { calculateMonthlyPayment } from "@/lib/utils/calculator"
import ModalButton from '@/components/modal-button'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

type LoanGoal = 'purchase' | 'refinance' | 'cashout'

interface StepCalculatorTestProps {
  onCalculate?: (monthlySavings: number) => void
}

type Step = {
  id: string
  title: string
  description?: string
  showFor?: LoanGoal[]
}

const steps: Step[] = [
  {
    id: "goal",
    title: "What's Your Goal?",
    description: "Let us help you achieve your mortgage goals."
  },
  {
    id: "property-value",
    title: "What is your property value?",
    description: "Enter the estimated value of your home."
  },
  {
    id: "loan-amount",
    title: "What is your current loan amount?",
    description: "Enter the remaining balance on your mortgage.",
    showFor: ['refinance', 'cashout']
  },
  {
    id: "cash-amount",
    title: "How much cash would you like to unlock?",
    description: "Enter the amount you'd like to take out from your equity.",
    showFor: ['cashout']
  },
  {
    id: "current-rate",
    title: "What is your current interest rate?",
    description: "Enter your current mortgage interest rate as a percentage.",
    showFor: ['refinance', 'cashout']
  },
  {
    id: "down-payment",
    title: "What is your down payment?",
    description: "Enter your planned down payment amount.",
    showFor: ['purchase']
  },
  {
    id: "market-rate",
    title: "What is the current market rate?",
    description: "Enter today's market rate as a percentage.",
    showFor: ['purchase']
  },
  {
    id: "loan-term",
    title: "What is the term of your loan?",
    description: "Enter the length of your mortgage in years."
  },
  {
    id: "target-payment",
    title: "What monthly payment are you targeting?",
    description: "Enter your desired monthly payment."
  },
  {
    id: "results",
    title: "Here's your personalized rate target",
    description: "We'll notify you when rates match your goals."
  }
]

export function StepCalculatorTest({ onCalculate }: StepCalculatorTestProps) {
  const { setMonthlySavings, setYearlySavings } = useCalculatorContext()
  const [currentStep, setCurrentStep] = useState(0)
  const [loanGoal, setLoanGoal] = useState<LoanGoal | null>(null)
  const [propertyValue, setPropertyValue] = useState("")
  const [loanAmount, setLoanAmount] = useState("")
  const [cashAmount, setCashAmount] = useState("")
  const [currentRate, setCurrentRate] = useState("")
  const [marketRate, setMarketRate] = useState("")
  const [downPayment, setDownPayment] = useState("")
  const [loanTerm, setLoanTerm] = useState("")
  const [targetPayment, setTargetPayment] = useState("")

  const getVisibleSteps = () => {
    if (!loanGoal) return steps.filter(step => step.id === "goal")
    return steps.filter(step => !step.showFor || step.showFor.includes(loanGoal))
  }

  const visibleSteps = getVisibleSteps()
  const currentStepData = visibleSteps[currentStep]

  const handleNext = () => {
    if (currentStep < visibleSteps.length - 1) {
      if (visibleSteps[currentStep + 1].id === "target-payment") {
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

  const getCurrentPayment = () => {
    let amount = 0
    let rate = 0
    
    if (loanGoal === 'purchase') {
      amount = parseFloat(propertyValue) - parseFloat(downPayment)
      rate = parseFloat(marketRate)
    } else if (loanGoal === 'cashout') {
      amount = parseFloat(loanAmount) + parseFloat(cashAmount)
      rate = parseFloat(currentRate)
    } else {
      amount = parseFloat(loanAmount)
      rate = parseFloat(currentRate)
    }
    
    const years = parseFloat(loanTerm)

    return calculateMonthlyPayment({
      principal: amount,
      rate: rate,
      years: years
    })
  }

  const calculateTargetRate = () => {
    let amount = 0
    if (loanGoal === 'purchase') {
      amount = parseFloat(propertyValue) - parseFloat(downPayment)
    } else if (loanGoal === 'cashout') {
      amount = parseFloat(loanAmount) + parseFloat(cashAmount)
    } else {
      amount = parseFloat(loanAmount)
    }
    
    const years = parseFloat(loanTerm)
    const target = parseFloat(targetPayment)
    
    let low = 0
    let high = 20
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
    let formatted = value.replace(/[^\d.]/g, '')
    const parts = formatted.split('.')
    if (parts.length > 2) {
      formatted = parts[0] + '.' + parts.slice(1).join('')
    }
    return isPercent ? formatted + '%' : formatted
  }

  const getResultsContent = () => {
    if (!loanGoal) return null
    
    const targetRate = calculateTargetRate().toFixed(2)
    const newLoanAmount = loanGoal === 'cashout' 
      ? parseFloat(loanAmount) + parseFloat(cashAmount)
      : loanGoal === 'purchase'
      ? parseFloat(propertyValue) - parseFloat(downPayment)
      : parseFloat(loanAmount)

    switch (loanGoal) {
      case 'cashout':
        return (
          <div className="text-center space-y-4">
            <div className="space-y-2">
              <p className="text-lg">For ${formatCurrency(parseFloat(cashAmount))} cash out</p>
              <p className="text-lg">with a new loan amount of ${formatCurrency(newLoanAmount)}</p>
              <p className="text-lg font-semibold">Your target rate is {targetRate}%</p>
            </div>
            <div className="w-full">
              <ModalButton>Track Your Rate to Get Your Cash</ModalButton>
            </div>
          </div>
        )
      case 'purchase':
        return (
          <div className="text-center space-y-4">
            <div className="space-y-2">
              <p className="text-lg">For a ${formatCurrency(parseFloat(propertyValue))} home</p>
              <p className="text-lg">with ${formatCurrency(parseFloat(downPayment))} down</p>
              <p className="text-lg font-semibold">Your target rate is {targetRate}%</p>
            </div>
            <div className="w-full">
              <ModalButton>Track Your Rate to Own Your Dream Home</ModalButton>
            </div>
          </div>
        )
      case 'refinance':
        return (
          <div className="text-center space-y-4">
            <div className="space-y-2">
              <p className="text-lg">Current Payment: ${formatCurrency(getCurrentPayment())}</p>
              <p className="text-lg">Target Payment: ${formatCurrency(parseFloat(targetPayment))}</p>
              <p className="text-lg font-semibold">Your target rate is {targetRate}%</p>
            </div>
            <div className="w-full">
              <ModalButton>Track Your Rate to Save</ModalButton>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const renderStepContent = (step: Step) => {
    switch (step.id) {
      case "goal":
        return (
          <div className="space-y-6">
            <RadioGroup
              value={loanGoal || ""}
              onValueChange={(value) => setLoanGoal(value as LoanGoal)}
              className="grid grid-cols-1 gap-4"
            >
              <Label className="cursor-pointer">
                <div className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-gray-50">
                  <RadioGroupItem value="purchase" id="purchase" />
                  <Home className="w-5 h-5 text-primary" />
                  <div className="flex-1">
                    <Label htmlFor="purchase">Own Your Dream Home</Label>
                    <p className="text-sm text-gray-500">Find the perfect rate for your new home</p>
                  </div>
                </div>
              </Label>
              <Label className="cursor-pointer">
                <div className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-gray-50">
                  <RadioGroupItem value="cashout" id="cashout" />
                  <Banknote className="w-5 h-5 text-primary" />
                  <div className="flex-1">
                    <Label htmlFor="cashout">Unlock Your Cash</Label>
                    <p className="text-sm text-gray-500">Access your home equity when you need it</p>
                  </div>
                </div>
              </Label>
              <Label className="cursor-pointer">
                <div className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-gray-50">
                  <RadioGroupItem value="refinance" id="refinance" />
                  <TrendingDown className="w-5 h-5 text-primary" />
                  <div className="flex-1">
                    <Label htmlFor="refinance">Lower Your Payment</Label>
                    <p className="text-sm text-gray-500">Reduce your monthly payment with a better rate</p>
                  </div>
                </div>
              </Label>
            </RadioGroup>
            <Button 
              onClick={handleNext}
              disabled={!loanGoal}
              className="w-full"
            >
              Continue <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )

      case "property-value":
      case "loan-amount":
      case "cash-amount":
      case "down-payment":
        return (
          <div className="space-y-4">
            <div className="relative w-48 mx-auto">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <Input
                type="text"
                placeholder="0.00"
                value={
                  step.id === "property-value" ? propertyValue :
                  step.id === "loan-amount" ? loanAmount :
                  step.id === "cash-amount" ? cashAmount :
                  downPayment
                }
                onChange={(e) => {
                  const value = formatInput(e.target.value)
                  if (step.id === "property-value") setPropertyValue(value)
                  else if (step.id === "loan-amount") setLoanAmount(value)
                  else if (step.id === "cash-amount") setCashAmount(value)
                  else setDownPayment(value)
                }}
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
                disabled={
                  (step.id === "property-value" && (!propertyValue || parseFloat(propertyValue) <= 0)) ||
                  (step.id === "loan-amount" && (!loanAmount || parseFloat(loanAmount) <= 0)) ||
                  (step.id === "cash-amount" && (!cashAmount || parseFloat(cashAmount) <= 0)) ||
                  (step.id === "down-payment" && (!downPayment || parseFloat(downPayment) <= 0))
                }
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

      case "market-rate":
        return (
          <div className="space-y-4">
            <div className="relative w-32 mx-auto">
              <Input
                type="text"
                placeholder="6.5"
                value={marketRate.replace('%', '')}
                onChange={(e) => setMarketRate(formatInput(e.target.value, true))}
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
                disabled={!marketRate || parseFloat(marketRate) <= 0}
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

      case "target-payment":
        return (
          <div className="space-y-4">
            <div className="relative w-48 mx-auto">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <Input
                type="text"
                placeholder="0.00"
                value={targetPayment}
                onChange={(e) => setTargetPayment(formatInput(e.target.value))}
                className="pl-8 text-lg text-center"
                autoFocus
              />
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
        )

      case "results":
        return getResultsContent()

      default:
        return null
    }
  }

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold">{currentStepData?.title}</h3>
          {currentStepData?.description && (
            <p className="text-gray-500 text-sm">{currentStepData.description}</p>
          )}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStepData?.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {currentStepData && renderStepContent(currentStepData)}
          </motion.div>
        </AnimatePresence>
      </div>
    </Card>
  )
} 