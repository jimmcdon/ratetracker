"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowLeft, Calculator, ArrowRightCircle, Home, Banknote, TrendingDown, Mail, User, Calendar } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useCalculatorContext } from "@/contexts/calculator-context"
import { formatCurrency } from "@/lib/utils/calculator"
import { calculateMonthlyPayment } from "@/lib/utils/calculator"
import ModalButton from '@/components/modal-button'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { usePostHog } from 'posthog-js/react'

type LoanGoal = 'purchase' | 'refinance' | 'cashout'

interface StepCalculatorTestProps {
  onCalculate?: (monthlySavings: number) => void
  onProgressChange?: (stage: 'initial' | 'details' | 'complete') => void
}

interface Step {
  id: string
  title: string
  description?: string
  icon?: React.ComponentType<any>
  showFor?: LoanGoal[]
}

const steps: Step[] = [
  {
    id: "goal",
    title: "What's Your Goal?",
    description: "Let us help you achieve your mortgage goals.",
    icon: Home
  },
  {
    id: "property-value",
    title: "What is your property value?",
    description: "Enter the estimated value of your home.",
    icon: Home,
    showFor: ['purchase', 'refinance']
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
  },
  {
    id: "contact-info",
    title: "Almost there!",
    description: "Let's make sure we can reach you with rate updates."
  },
  {
    id: "schedule-broker",
    title: "Would you like to speak with a broker?",
    description: "Get expert guidance on your mortgage journey."
  },
  {
    id: "calendar",
    title: "Schedule Your Call",
    description: "Choose a time that works best for you."
  },
  {
    id: "success",
    title: "All Set!",
    description: "We've got everything we need."
  }
]

export function StepCalculatorTest({ onCalculate, onProgressChange }: StepCalculatorTestProps) {
  const posthog = usePostHog()
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
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [wantsBrokerCall, setWantsBrokerCall] = useState<boolean | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined)
  const [hasRealtor, setHasRealtor] = useState<boolean | null>(null)

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
      if (currentStep === 0 && onProgressChange) {
        onProgressChange('details')
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
    const currentPayment = getCurrentPayment()
    const monthlySavings = currentPayment - parseFloat(targetPayment)
    const targetRate = calculateTargetRate()
    
    setMonthlySavings(monthlySavings)
    setYearlySavings(monthlySavings * 12)
    
    // Track calculation completion
    posthog.capture('calculator_completed', {
      loan_goal: loanGoal,
      property_value: parseFloat(propertyValue),
      loan_amount: parseFloat(loanAmount),
      monthly_savings: monthlySavings,
      yearly_savings: monthlySavings * 12,
      target_rate: targetRate
    })
    
    if (onCalculate) {
      onCalculate(monthlySavings)
    }

    if (onProgressChange) {
      onProgressChange('complete')
    }
    
    // Find the index of the results step
    const resultsStepIndex = visibleSteps.findIndex(step => step.id === "results")
    setCurrentStep(resultsStepIndex)
  }

  const getSummaryData = () => {
    return {
      loanType: loanGoal,
      propertyValue: propertyValue ? formatCurrency(parseFloat(propertyValue)) : '',
      loanAmount: loanAmount ? formatCurrency(parseFloat(loanAmount)) : '',
      cashAmount: cashAmount ? formatCurrency(parseFloat(cashAmount)) : '',
      currentRate: currentRate,
      marketRate: marketRate,
      downPayment: downPayment ? formatCurrency(parseFloat(downPayment)) : '',
      loanTerm: loanTerm ? `${loanTerm} years` : '',
      targetPayment: targetPayment ? formatCurrency(parseFloat(targetPayment)) : '',
      targetRate: calculateTargetRate()?.toFixed(2) + '%',
      currentPayment: formatCurrency(getCurrentPayment())
    }
  }

  const handleContactSubmit = async () => {
    try {
      // Validate form data before attempting to submit
      if (!name || !email || (loanGoal === 'purchase' && hasRealtor === null)) {
        console.log('Invalid form data:', { name, email, loanGoal, hasRealtor });
        return;
      }

      // First proceed to next step regardless of API call success
      // This ensures the user can continue even if there are network issues
      const nextStepIndex = visibleSteps.findIndex(step => step.id === "schedule-broker");
      if (nextStepIndex !== -1) {
        setCurrentStep(nextStepIndex);
      }

      // Then attempt to submit the data to the API
      try {
        const response = await fetch('/api/calculator/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            calculatorData: getSummaryData(),
            hasRealtor: loanGoal === 'purchase' ? hasRealtor : undefined
          })
        });

        if (response.ok) {
          // Try to track event, but don't block progress if it fails
          try {
            posthog.capture('contact_info_submitted', {
              loan_goal: loanGoal
            });
          } catch (analyticsError) {
            console.error('Analytics error (non-blocking):', analyticsError);
          }
        } else {
          console.error('API response not ok:', await response.text());
        }
      } catch (apiError) {
        console.error('Error submitting contact info to API:', apiError);
        // We don't block the user's progress due to API errors
      }
    } catch (error) {
      console.error('Error in handleContactSubmit:', error);
    }
  }

  const handleBrokerPreference = (wantsBroker: boolean) => {
    setWantsBrokerCall(wantsBroker)
    console.log('Broker call preference:', wantsBroker)
  }

  const handleBrokerPreferenceClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (wantsBrokerCall) {
      // If they want a call, move to calendar step
      const calendarStepIndex = visibleSteps.findIndex(step => step.id === "calendar");
      setCurrentStep(calendarStepIndex);
    } else {
      handleBrokerPreference(false);
    }
  };

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
    
    const targetRate = calculateTargetRate()
    if (typeof targetRate === 'undefined') return null
    
    const formattedTargetRate = targetRate.toFixed(2)
    const newLoanAmount = loanGoal === 'cashout' 
      ? parseFloat(loanAmount) + parseFloat(cashAmount)
      : loanGoal === 'purchase'
      ? parseFloat(propertyValue) - parseFloat(downPayment)
      : parseFloat(loanAmount)

    const ResultContent = () => {
      switch (loanGoal) {
        case 'cashout':
          const targetRatePayment = calculateMonthlyPayment({
            principal: newLoanAmount,
            rate: targetRate,
            years: parseFloat(loanTerm)
          })
          return (
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary mb-6">
                ${parseInt(cashAmount).toLocaleString()}
              </p>
              <p className="text-xl mb-4">Cash Available Today</p>
              <div className="text-gray-600 space-y-1 mb-6">
                <p>New loan amount: {formatCurrency(newLoanAmount)}</p>
                <p>Monthly payment: {formatCurrency(targetRatePayment)}</p>
              </div>
            </div>
          )
        case 'purchase':
          return (
            <div className="space-y-2">
              <p className="text-lg">For a {formatCurrency(parseFloat(propertyValue))} home</p>
              <p className="text-lg">with {formatCurrency(parseFloat(downPayment))} down</p>
              <p className="text-lg font-semibold">Your target rate is {formattedTargetRate}%</p>
            </div>
          )
        case 'refinance':
          return (
            <div className="space-y-2">
              <p className="text-lg">Current Payment: {formatCurrency(getCurrentPayment())}</p>
              <p className="text-lg">Target Payment: {formatCurrency(parseFloat(targetPayment))}</p>
              <p className="text-lg font-semibold">Your target rate is {formattedTargetRate}%</p>
            </div>
          )
        default:
          return null
      }
    }

    const handleContinueToContact = () => {
      const contactInfoIndex = visibleSteps.findIndex(step => step.id === "contact-info")
      setCurrentStep(contactInfoIndex)
    }

    return (
      <div className="text-center space-y-6">
        <ResultContent />
        
        {/* Call to Action Buttons */}
        <div className="space-y-3">
          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-white"
            onClick={handleContinueToContact}
          >
            {loanGoal === 'cashout' ? 'Get Your Cash Today' : 'Track Your Rate Now'}
          </Button>
        </div>
      </div>
    )
  }

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"
  ];

  const handleScheduleSubmit = async () => {
    if (!selectedDate || !selectedTime) return

    try {
      // Find the success step index
      const successStepIndex = visibleSteps.findIndex(step => step.id === "success");
      
      // First move to the success step to provide immediate feedback
      if (successStepIndex !== -1) {
        setCurrentStep(successStepIndex);
      }
      
      // Then attempt API call
      try {
        const response = await fetch('/api/calculator/schedule', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            date: selectedDate,
            time: selectedTime,
            ...getSummaryData()
          })
        });

        if (response.ok) {
          // Try to track event, but don't block progress if it fails
          try {
            posthog.capture('broker_call_scheduled', {
              loan_goal: loanGoal,
              scheduled_date: selectedDate,
              scheduled_time: selectedTime
            });
          } catch (analyticsError) {
            console.error('Analytics error (non-blocking):', analyticsError);
          }
        } else {
          console.error('API response not ok:', await response.text());
          // Don't block user progress, but log the error
        }
      } catch (apiError) {
        console.error('Error submitting schedule to API:', apiError);
        // We don't block the user's progress due to API errors
      }
    } catch (error) {
      console.error('Error in handleScheduleSubmit:', error);
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const currentStepData = visibleSteps[currentStep]
      
      switch (currentStepData.id) {
        case "property-value":
          if (propertyValue && parseFloat(propertyValue) > 0) handleNext()
          break
        case "loan-amount":
          if (loanAmount && parseFloat(loanAmount) > 0) handleNext()
          break
        case "cash-amount":
          if (cashAmount && parseFloat(cashAmount) > 0) handleNext()
          break
        case "down-payment":
          if (downPayment && parseFloat(downPayment) > 0) handleNext()
          break
        case "current-rate":
          if (currentRate && parseFloat(currentRate) > 0) handleNext()
          break
        case "market-rate":
          if (marketRate && parseFloat(marketRate) > 0) handleNext()
          break
        case "loan-term":
          if (loanTerm && parseFloat(loanTerm) > 0) handleNext()
          break
        case "target-payment":
          if (targetPayment && parseFloat(targetPayment) > 0) handleCalculate()
          break
        case "contact-info":
          if (name && email && (loanGoal !== 'purchase' || hasRealtor !== null)) {
            handleContactSubmit()
          }
          break
      }
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
                onKeyPress={handleKeyPress}
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
                onKeyPress={handleKeyPress}
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
                onKeyPress={handleKeyPress}
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
                onKeyPress={handleKeyPress}
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
                onKeyPress={handleKeyPress}
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

      case "contact-info":
        return (
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={handleKeyPress}
              className="text-lg text-center"
              autoFocus
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              className="text-lg text-center"
            />
            {loanGoal === 'purchase' && (
              <div className="space-y-2">
                <p className="text-sm text-center text-gray-500">Are you working with a realtor?</p>
                <RadioGroup
                  value={hasRealtor === true ? "yes" : hasRealtor === false ? "no" : ""}
                  onValueChange={(value) => {
                    console.log('Setting hasRealtor to:', value === "yes");
                    setHasRealtor(value === "yes");
                  }}
                  className="grid grid-cols-2 gap-4"
                >
                  <div>
                    <RadioGroupItem
                      value="yes"
                      id="realtor-yes"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="realtor-yes"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                    >
                      <span className="mb-2">Yes</span>
                      <User className="h-6 w-6" />
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem
                      value="no"
                      id="realtor-no"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="realtor-no"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                    >
                      <span className="mb-2">No</span>
                      <User className="h-6 w-6" />
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}
            <div className="flex justify-between">
              <Button variant="ghost" onClick={handleBack}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button 
                onClick={handleContactSubmit}
                disabled={!name || !email || (loanGoal === 'purchase' && hasRealtor === null)}
              >
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )

      case "schedule-broker":
        return (
          <div className="space-y-4">
            <RadioGroup
              value={wantsBrokerCall === null ? "" : wantsBrokerCall.toString()}
              onValueChange={(value) => handleBrokerPreference(value === "true")}
              className="grid grid-cols-1 gap-4"
            >
              <Label className="cursor-pointer">
                <div className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-gray-50">
                  <RadioGroupItem value="true" id="true" />
                  <Calendar className="w-5 h-5 text-primary" />
                  <div className="flex-1">
                    <Label htmlFor="true">Yes, schedule a call with me</Label>
                    <p className="text-sm text-gray-500">Get expert guidance on your mortgage journey.</p>
                  </div>
                </div>
              </Label>
              <Label className="cursor-pointer">
                <div className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-gray-50">
                  <RadioGroupItem value="false" id="false" />
                  <Mail className="w-5 h-5 text-primary" />
                  <div className="flex-1">
                    <Label htmlFor="false">Not right now, email me updates</Label>
                    <p className="text-sm text-gray-500">Keep me updated about rates via email.</p>
                  </div>
                </div>
              </Label>
            </RadioGroup>
            <div className="flex justify-between">
              <Button variant="ghost" onClick={handleBack}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button 
                onClick={handleBrokerPreferenceClick}
                disabled={wantsBrokerCall === null}
              >
                {wantsBrokerCall ? 'Schedule Call' : 'Continue'} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="text-center pt-4 border-t">
              <Button 
                variant="link" 
                className="text-gray-500 text-sm hover:text-gray-700"
                onClick={() => {
                  // Handle opt-out logic here
                  console.log('User opted out of contact');
                  handleBrokerPreference(false);
                }}
              >
                I've changed my mind - don't contact me
              </Button>
            </div>
          </div>
        )

      case "calendar":
        return (
          <div className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={(date: Date | undefined) => setSelectedDate(date)}
                className="rounded-md border"
                disabled={(date: Date) => 
                  date < new Date() || // Can't select past dates
                  date.getDay() === 0 || // No Sundays
                  date.getDay() === 6    // No Saturdays
                }
              />
              
              {selectedDate && (
                <div className="w-full space-y-2">
                  <h4 className="text-sm font-medium text-center">Available Times</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        className="w-full"
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-between">
              <Button variant="ghost" onClick={handleBack}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button
                onClick={handleScheduleSubmit}
                disabled={!selectedDate || !selectedTime}
              >
                Schedule Call <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )

      case "success":
        return (
          <div className="space-y-6 text-center">
            <div className="p-4">
              {wantsBrokerCall ? (
                <>
                  <h3 className="text-xl font-semibold mb-2">Your Call is Scheduled!</h3>
                  <p className="text-gray-600 mb-4">
                    We'll see you on {selectedDate?.toLocaleDateString()} at {selectedTime}.
                  </p>
                  <p className="text-gray-600">
                    In the meantime, we'll keep tracking rates and notify you when they match your goals.
                  </p>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-semibold mb-2">We're On It!</h3>
                  <p className="text-gray-600">
                    We'll keep tracking rates and notify you as soon as they match your goals.
                  </p>
                </>
              )}
            </div>
            <Button 
              className="w-full bg-primary hover:bg-primary/90 text-white"
              onClick={() => {
                // Reset the calculator
                setCurrentStep(0)
                setLoanGoal(null)
                setPropertyValue("")
                setLoanAmount("")
                setCashAmount("")
                setCurrentRate("")
                setMarketRate("")
                setDownPayment("")
                setLoanTerm("")
                setTargetPayment("")
                setName("")
                setEmail("")
                setWantsBrokerCall(null)
                setSelectedDate(undefined)
                setSelectedTime(undefined)
                setHasRealtor(null)
              }}
            >
              Start New Calculation
            </Button>
          </div>
        )

      default:
        return null
    }
  }

  useEffect(() => {
    if (onProgressChange) {
      onProgressChange('initial')
    }
  }, [onProgressChange])

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold">{currentStepData?.title}</h3>
          {currentStepData?.description && (
            <p className="text-gray-500 text-sm">{currentStepData.description}</p>
          )}
          
          {/* Step Indicator Dots */}
          <div className="flex justify-center items-center gap-2 mt-4">
            {visibleSteps.map((step, index) => (
              <div
                key={step.id}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentStep
                    ? "bg-primary w-4" // Current step is wider and primary color
                    : index < currentStep
                    ? "bg-primary/40" // Completed steps are faded primary
                    : "bg-gray-200" // Future steps are gray
                }`}
                title={step.title}
              />
            ))}
          </div>
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