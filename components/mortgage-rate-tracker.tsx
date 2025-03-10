"use client"

import { TrendingDown, Target, ArrowRight, DollarSign, LineChart, BarChart3, Calendar } from "lucide-react"
import { useCalculatorAnimation } from "@/hooks/useCalculatorAnimation"
import { calculateMonthlyPayment, formatCurrency, mortgageInputSchema } from "@/lib/utils/calculator"
import type { MortgageInput } from "@/lib/utils/calculator"
import { useEffect, useRef, useCallback, useState } from "react"
import confetti from 'canvas-confetti'

interface Point {
  x: string | number
  y: string | number
}

interface MortgageRateTrackerProps {
  currentRate?: number
  targetRate?: number
  loanAmount?: number
  loanTerm?: number
  animationDuration?: number
  width?: string
  debugState?: 'initial' | 'tracking' | 'target-hit' | 'savings'
}

export const MortgageRateTracker = ({
  currentRate = 7.25,
  targetRate = 5.0,
  loanAmount = 500000,
  loanTerm = 30,
  animationDuration = 5.25,
  width = "max-w-7xl",
  debugState,
}: MortgageRateTrackerProps) => {
  // First, move these state declarations to the top of the component, before any hooks
  const [messageState, setMessageState] = useState('initial')
  const [animatedSavings, setAnimatedSavings] = useState(0)

  // Validate inputs
  const validatedInput = mortgageInputSchema.safeParse({
    principal: loanAmount,
    rate: currentRate,
    years: loanTerm,
  })

  if (!validatedInput.success) {
    return (
      <div 
        role="alert"
        className="p-4 border-l-4 border-red-500 bg-red-50 text-red-700"
      >
        <h3 className="font-semibold mb-2">Invalid Parameters</h3>
        <p>Please check the following:</p>
        <ul className="list-disc ml-5">
          {validatedInput.error.issues.map((issue, index) => (
            <li key={index}>{issue.message}</li>
          ))}
        </ul>
      </div>
    )
  }

  // Then the useCalculatorAnimation hook can use isReplaying
  const { 
    animationState: calculatedAnimationState, 
    progress, 
    startTime,
  } = useCalculatorAnimation({
    animationDuration,
    // Pause automatic animation if in debug mode
    startPaused: !!debugState,
  })

  // Use debug state if provided, otherwise use calculated state
  const animationState = debugState || calculatedAnimationState

  const currentPayment = calculateMonthlyPayment({
    principal: loanAmount,
    rate: currentRate,
    years: loanTerm,
  })

  const targetPayment = calculateMonthlyPayment({
    principal: loanAmount,
    rate: targetRate,
    years: loanTerm,
  })

  const monthlySavings = currentPayment - targetPayment
  const annualSavings = monthlySavings * 12

  // Adjust the path point coordinates to ensure alignment
  const startPoint: Point = { x: "15%", y: "40%" }
  const targetPoint: Point = { x: "50%", y: "60%" }
  const endPoint: Point = { x: "85%", y: "40%" }

  // Convert percentage to pixels for animation - adjust padding calculation
  const getPixelCoordinates = (percentage: Point, container: HTMLDivElement) => {
    const width = container.clientWidth - 48 // Subtract padding (24px on each side)
    const height = container.clientHeight - 48 // Subtract padding (24px on each side)
    
    const x = (parseFloat(percentage.x as string) / 100) * width + 24
    const y = (parseFloat(percentage.y as string) / 100) * height + 24
    
    return { x, y }
  }

  // Get SVG coordinates (percentage-based)
  const getSVGCoordinates = (point: Point) => {
    return {
      x: point.x,
      y: point.y
    }
  }

  const containerRef = useRef<HTMLDivElement>(null)
  const requestRef = useRef<number | null>(null)
  const trackerPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  // Initialize tracker position
  useEffect(() => {
    if (containerRef.current) {
      const startPx = getPixelCoordinates(startPoint, containerRef.current)
      trackerPosRef.current = startPx
    }
  }, [])

  // Update tracker position in debug mode
  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const startPx = getPixelCoordinates(startPoint, container)
    const targetPx = getPixelCoordinates(targetPoint, container)

    if (debugState === 'initial') {
      trackerPosRef.current = startPx
    } else if (debugState === 'tracking') {
      trackerPosRef.current = {
        x: startPx.x + (targetPx.x - startPx.x) * 0.5,
        y: startPx.y + (targetPx.y - startPx.y) * 0.5,
      }
    } else if (debugState === 'target-hit' || debugState === 'savings') {
      trackerPosRef.current = targetPx
    }
  }, [debugState])

  // Animation callback for normal mode
  const animate = useCallback((timestamp: number) => {
    if (!startTime || !containerRef.current || debugState) {
      return
    }

    const elapsed = timestamp - startTime
    const progress = Math.min(elapsed / (animationDuration * 1000), 1)

    const container = containerRef.current
    const startPx = getPixelCoordinates(startPoint, container)
    const targetPx = getPixelCoordinates(targetPoint, container)

    // Normal animation when not in debug mode
    if (animationState === 'target-hit' || animationState === 'savings') {
      trackerPosRef.current = targetPx
    } else {
      trackerPosRef.current = {
        x: startPx.x + (targetPx.x - startPx.x) * progress,
        y: startPx.y + (targetPx.y - startPx.y) * progress,
      }
    }

    requestRef.current = requestAnimationFrame(animate)
  }, [animationState, startTime, animationDuration, debugState])

  // Start animation loop
  useEffect(() => {
    const animateFrame = (timestamp: number) => {
      animate(timestamp)
      requestRef.current = requestAnimationFrame(animateFrame)
    }
    
    requestRef.current = requestAnimationFrame(animateFrame)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [animate])

  const trackerPos = trackerPosRef.current
  const showSavings = animationState === "savings"
  const flashVisible = animationState === "target-hit"

  // Add this new effect
  useEffect(() => {
    if (messageState === 'calculating') {
      let startTime: number | null = null
      const duration = 3500 // Animation duration in ms
      const startValue = 0
      const endValue = annualSavings

      const animateSavings = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / duration, 1)
        
        // Easing function for smooth animation
        const eased = progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2

        const currentValue = Math.round(startValue + (endValue - startValue) * eased)
        setAnimatedSavings(currentValue)

        if (progress < 1) {
          requestAnimationFrame(animateSavings)
        }
      }

      requestAnimationFrame(animateSavings)
    } else {
      setAnimatedSavings(0)
    }
  }, [messageState, annualSavings])

  // Modify the effect that handles message transitions
  useEffect(() => {
    if (animationState === 'target-hit') {
      setMessageState('target-hit')
    } else if (animationState === 'savings') {
      const timer1 = setTimeout(() => {
        setMessageState('calculating')
      }, 4000)

      const timer2 = setTimeout(() => {
        setMessageState('congratulations')
        
        // Trigger confetti with money stack
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect()
          const windowHeight = window.innerHeight
          const originY = rect.top / windowHeight
          const originX = rect.left / window.innerWidth

          // Center burst with more particles
          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: originY + 0.3, x: 0.5 },
            colors: ['#111827', '#374151', '#4B5563', '#6B7280'],
            disableForReducedMotion: true,
            scalar: 1.2,
            gravity: 0.7,
            ticks: 200
          })

          // Multiple side bursts after short delays
          setTimeout(() => {
            // Left burst
            confetti({
              particleCount: 80,
              angle: 60,
              spread: 55,
              origin: { x: originX + 0.2, y: originY + 0.3 },
              colors: ['#111827', '#374151', '#4B5563', '#6B7280'],
              disableForReducedMotion: true,
              scalar: 1.2,
              gravity: 0.7,
              ticks: 200
            })
            // Right burst
            confetti({
              particleCount: 80,
              angle: 120,
              spread: 55,
              origin: { x: originX + 0.8, y: originY + 0.3 },
              colors: ['#111827', '#374151', '#4B5563', '#6B7280'],
              disableForReducedMotion: true,
              scalar: 1.2,
              gravity: 0.7,
              ticks: 200
            })
          }, 150)

          // Additional bursts for more celebration
          setTimeout(() => {
            confetti({
              particleCount: 100,
              spread: 100,
              origin: { y: originY + 0.3, x: 0.3 },
              colors: ['#111827', '#374151', '#4B5563', '#6B7280'],
              disableForReducedMotion: true,
              scalar: 1.2,
              gravity: 0.7,
              ticks: 200
            })
            confetti({
              particleCount: 100,
              spread: 100,
              origin: { y: originY + 0.3, x: 0.7 },
              colors: ['#111827', '#374151', '#4B5563', '#6B7280'],
              disableForReducedMotion: true,
              scalar: 1.2,
              gravity: 0.7,
              ticks: 200
            })
          }, 300)
        }
      }, 6000)

      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
      }
    } else {
      setMessageState('initial')
    }
  }, [animationState])

  // Add debug controls if in debug mode
  const debugControls = debugState && (
    <div className="absolute top-0 left-0 right-0 bg-yellow-100 p-2 text-sm">
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => window.location.search = '?debug=initial'}
          className={`px-2 py-1 rounded ${debugState === 'initial' ? 'bg-yellow-500' : 'bg-yellow-200'}`}
        >
          Initial
        </button>
        <button
          onClick={() => window.location.search = '?debug=tracking'}
          className={`px-2 py-1 rounded ${debugState === 'tracking' ? 'bg-yellow-500' : 'bg-yellow-200'}`}
        >
          Tracking
        </button>
        <button
          onClick={() => window.location.search = '?debug=target-hit'}
          className={`px-2 py-1 rounded ${debugState === 'target-hit' ? 'bg-yellow-500' : 'bg-yellow-200'}`}
        >
          Target Hit
        </button>
        <button
          onClick={() => window.location.search = '?debug=savings'}
          className={`px-2 py-1 rounded ${debugState === 'savings' ? 'bg-yellow-500' : 'bg-yellow-200'}`}
        >
          Savings
        </button>
        <button
          onClick={() => window.location.search = ''}
          className="px-2 py-1 rounded bg-red-200"
        >
          Exit Debug
        </button>
      </div>
    </div>
  )

  return (
    <div 
      className="w-[350px] sm:w-[560px] mx-auto"
      role="region"
      aria-label="Mortgage Rate Tracker Visualization"
    >
      {debugControls}
      <div 
        className="w-[350px] sm:w-[560px] bg-gray-50 rounded-lg shadow-lg overflow-hidden mt-8"
      >
        {/* Header with glass effect */}
        <div 
          className={`py-3 px-4 bg-gray-900 text-white backdrop-blur-sm bg-opacity-90 transition-opacity duration-1000`}
          role="banner"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center mb-1 sm:mb-0">
              <LineChart className="w-3 h-3 sm:w-4 sm:h-4 mr-1" aria-hidden="true" />
              <h2 className="text-xs sm:text-base font-light tracking-wide">RateTracker In Action</h2>
            </div>
            <div className="flex items-center text-gray-400 text-[10px] sm:text-xs">
              <DollarSign className="w-2 h-2 sm:w-3 sm:h-3 mr-1" aria-hidden="true" />
              <span>{formatCurrency(loanAmount).replace('$', '')} over {loanTerm} years</span>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div 
          ref={containerRef}
          className="relative p-2 sm:p-4"
          style={{ height: "200px", minHeight: "200px" }}
          role="img"
          aria-label={`Mortgage rate tracking from ${currentRate}% to target ${targetRate}%`}
          tabIndex={0}
        >
          {/* Grid background - always visible but very faint initially */}
          <div className={`absolute inset-0 m-6 flex flex-col justify-between transition-opacity duration-1000 ${
            animationState === 'initial' ? 'opacity-10' : 'opacity-20'
          }`} aria-hidden="true">
            {[...Array(8)].map((_, i) => (
              <div key={`h-${i}`} className="w-full border-b border-gray-400" />
            ))}
          </div>
          <div className="absolute inset-0 m-6 flex justify-between opacity-20" aria-hidden="true">
            {[...Array(7)].map((_, i) => (
              <div key={`v-${i}`} className="h-full border-r border-gray-400" />
            ))}
          </div>

          {/* Current Rate Display - Visible during initial state */}
          <div 
            className={`absolute left-16 top-6 font-mono text-sm transition-all duration-1000 px-4 py-1 rounded ${
              animationState === 'initial' 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-95'
            }`}
            style={{
              color: '#374151',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              fontFamily: 'Monaco, Consolas, monospace',
              letterSpacing: '0.1em',
              zIndex: 40,
              border: '1px solid #e5e7eb'
            }}
            role="status"
            aria-live="polite"
          >
            CURRENT RATE: {currentRate}%
          </div>

          {/* Digital readout display - Target Identified */}
          <div 
            className={`absolute left-1/2 top-6 -translate-x-1/2 font-mono text-sm transition-all duration-1000 px-4 py-1 rounded ${
              animationState === 'tracking' 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-95'
            }`}
            style={{
              color: '#32ff4a',
              backgroundColor: 'rgba(0, 0, 0, 0.75)',
              fontFamily: 'Monaco, Consolas, monospace',
              letterSpacing: '0.1em',
              zIndex: 40
            }}
            role="status"
            aria-live="polite"
          >
            TARGET RATE IDENTIFIED
          </div>

          {/* Digital readout display - Target Acquired / Calculating / Congratulations */}
          <div 
            className={`absolute left-1/2 top-6 -translate-x-1/2 font-mono text-sm transition-all duration-1000 px-4 py-1 rounded ${
              (animationState === 'target-hit' || animationState === 'savings')
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-95'
            }`}
            style={{
              color: messageState === 'target-hit' ? '#ef4444' : 
                    messageState === 'congratulations' ? '#32ff4a' : '#32ff4a',
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              fontFamily: 'Monaco, Consolas, monospace',
              letterSpacing: '0.1em',
              zIndex: 40
            }}
            role="status"
            aria-live="polite"
          >
            {messageState === 'target-hit' && 'TARGET RATE ACQUIRED'}
            {messageState === 'calculating' && 'CALCULATING SAVINGS'}
            {messageState === 'congratulations' && 'CONGRATULATIONS ON YOUR SAVINGS'}
          </div>

          {/* Target icon at intersection */}
          <div
            className={`absolute transition-all duration-500 ${
              (animationState === 'tracking' || animationState === 'target-hit' || 
               animationState === 'savings') && messageState !== 'congratulations'
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-95'
            }`}
            style={{
              left: "50%",
              top: "60%",
              transform: 'translate(-50%, -50%)',
              zIndex: 35
            }}
          >
            <div className="relative">
              {/* Outer circle */}
              <div className="w-8 h-8 rounded-full border-2 border-gray-800 flex items-center justify-center">
                {/* Inner circle */}
                <div className="w-2 h-2 rounded-full bg-gray-800" />
              </div>
              {/* Pulsing effect */}
              <div className="absolute inset-0 animate-ping opacity-30">
                <div className="w-8 h-8 rounded-full border-2 border-gray-800" />
              </div>
            </div>
          </div>

          {/* Initial radar dot - show during initial and tracking */}
          <div
            className={`absolute transition-opacity duration-500 ${
              animationState === 'initial' || animationState === 'tracking' ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              left: `${startPoint.x}`,
              top: `${startPoint.y}`,
              transform: "translate(-50%, -50%)",
              zIndex: 30
            }}
          >
            <div className="w-2 h-2 rounded-full bg-gray-800 shadow-lg z-20 relative" />
            <div className="absolute top-1/2 left-1/2 w-8 h-8 -mt-4 -ml-4 z-10">
              <div className="w-full h-full rounded-full bg-gray-700 opacity-30 animate-ping" style={{ animationDuration: "2s" }} />
            </div>
            <div className="absolute top-1/2 left-1/2 w-6 h-6 -mt-3 -ml-3 z-10">
              <div className="w-full h-full rounded-full bg-gray-700 opacity-40 animate-ping" style={{ animationDuration: "2s", animationDelay: "0.5s" }} />
            </div>
            <div className="absolute top-1/2 left-1/2 w-4 h-4 -mt-2 -ml-2 z-10">
              <div className="w-full h-full rounded-full bg-gray-700 opacity-50 animate-ping" style={{ animationDuration: "2s", animationDelay: "1s" }} />
            </div>
          </div>

          {/* Savings vertical bar animation */}
          <div 
            className={`absolute transition-all duration-[2000ms] ease-out ${
              (messageState === 'calculating' || messageState === 'congratulations') ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              right: '48px',
              bottom: '36px',
              width: '24px',
              height: (messageState === 'calculating' || messageState === 'congratulations') ? 'calc(100% - 96px)' : '0px',
              background: 'linear-gradient(to top, #32ff4a33, #32ff4a)',
              borderRadius: '4px',
              transformOrigin: 'bottom',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Centered amount display */}
            <div 
              className="absolute whitespace-nowrap text-xs sm:text-sm font-bold"
              style={{
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%) rotate(-90deg)',
                color: '#000',
                zIndex: 10
              }}
            >
              {messageState === 'calculating' 
                ? formatCurrency(animatedSavings)
                : formatCurrency(annualSavings)
              }
            </div>
          </div>

          {/* SVG and animation elements */}
          <svg 
            className={`absolute inset-0 transition-opacity duration-500 ${
              messageState === 'congratulations' ? 'opacity-0' : 'opacity-100'
            }`}
            width="100%" 
            height="100%" 
            style={{ overflow: "visible" }}
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="trackingGradient" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#e5e7eb" />
                <stop offset="20%" stopColor="#374151" />
                <stop offset="40%" stopColor="#e5e7eb" />
                <stop offset="100%" stopColor="#e5e7eb" />
                <animate attributeName="x1" from="-100%" to="100%" dur="3s" repeatCount="indefinite" />
                <animate attributeName="x2" from="0%" to="200%" dur="3s" repeatCount="indefinite" />
              </linearGradient>
            </defs>

            {/* Background static line */}
            <line
              x1={getSVGCoordinates(startPoint).x}
              y1={getSVGCoordinates(startPoint).y}
              x2={getSVGCoordinates(targetPoint).x}
              y2={getSVGCoordinates(targetPoint).y}
              stroke="#e5e7eb"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
              className={`transition-opacity duration-500 ${
                animationState === 'initial' ? 'opacity-0' : 'opacity-100'
              }`}
            />

            {/* Animated gradient line */}
            <line
              x1={getSVGCoordinates(startPoint).x}
              y1={getSVGCoordinates(startPoint).y}
              x2={getSVGCoordinates(targetPoint).x}
              y2={getSVGCoordinates(targetPoint).y}
              stroke="url(#trackingGradient)"
              strokeWidth="3"
              style={{ opacity: animationState === "tracking" ? 1 : 0 }}
              vectorEffect="non-scaling-stroke"
            />

            {/* Savings path - only show briefly during target hit */}
            {showSavings && (
              <line
                x1={getSVGCoordinates(targetPoint).x}
                y1={getSVGCoordinates(targetPoint).y}
                x2={getSVGCoordinates(endPoint).x}
                y2={getSVGCoordinates(endPoint).y}
                stroke="#111827"
                strokeWidth="2"
                className="transition-all duration-[6000ms]"
                strokeDasharray="400"
                strokeDashoffset={showSavings ? "0" : "400"}
                vectorEffect="non-scaling-stroke"
              />
            )}
          </svg>

          {/* Moving tracker beacon - only show during tracking */}
          <div
            className={`absolute transition-opacity duration-500 ${
              animationState === 'tracking' ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              left: `${trackerPos.x}px`,
              top: `${trackerPos.y}px`,
              transform: "translate(-50%, -50%)",
              zIndex: 30
            }}
          >
            {/* Inner beacon dot */}
            <div className="w-2 h-2 rounded-full bg-gray-800 shadow-lg z-20 relative" />

            {/* Pulsing circles - always show in initial state */}
            <div className="absolute top-1/2 left-1/2 w-6 h-6 -mt-3 -ml-3 z-10">
              <div
                className="w-full h-full rounded-full bg-gray-700 opacity-30 animate-ping"
                style={{ animationDuration: "1.5s" }}
              />
            </div>
            <div className="absolute top-1/2 left-1/2 w-4 h-4 -mt-2 -ml-2 z-10">
              <div
                className="w-full h-full rounded-full bg-gray-700 opacity-50 animate-ping"
                style={{ animationDuration: "1.5s", animationDelay: "0.5s" }}
              />
            </div>
          </div>

          {/* Add money stack component */}
          <div 
            className={`absolute left-1/2 top-24 -translate-x-1/2 transition-all duration-1000 ${
              messageState === 'congratulations' 
                ? 'opacity-100 scale-100 translate-y-0' 
                : 'opacity-0 scale-95 -translate-y-4'
            }`}
            style={{
              fontSize: '3rem',
              filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
              zIndex: 40
            }}
            role="img"
            aria-label="Stack of money"
          >
            <div className="relative flex flex-col items-center">
              <span className="animate-bounce" style={{ animationDuration: '2s' }}>💵</span>
              <span className="absolute -bottom-2 transform scale-90 opacity-75">💵</span>
              <span className="absolute -bottom-4 transform scale-80 opacity-50">💵</span>
            </div>
          </div>
        </div>

        {/* Summary section with cards */}
        <div className="pt-2 sm:pt-3 px-2 sm:px-6 pb-4 sm:pb-8 border-t border-gray-200">
          <div className="flex flex-col items-center">
            <div className="w-full">
              {/* Card container - restore absolute positioning */}
              <div className="relative min-h-[280px] sm:min-h-[84px]">
                {/* Current Rate Card - Show during initial state */}
                <div
                  className={`absolute w-full rounded-lg bg-white p-2 sm:p-3 shadow-lg border-l-4 border-gray-800 transition-all duration-1000 ${
                    animationState === 'initial'
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4 pointer-events-none'
                  }`}
                >
                  <div className="flex flex-col">
                    <div className="flex items-center justify-center text-gray-500 mb-1 sm:mb-2">
                      <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      <span className="text-xs sm:text-sm font-medium">Current Rate</span>
                    </div>
                    <div className="text-gray-900 text-lg sm:text-2xl font-bold text-center mb-1 sm:mb-2">
                      {currentRate}%
                    </div>
                    <div className="flex items-center justify-between text-[10px] sm:text-xs">
                      <span className="text-gray-500">Monthly:</span>
                      <span className="text-gray-800 font-semibold">{formatCurrency(currentPayment)}</span>
                    </div>
                  </div>
                </div>

                {/* Target Rate Card - Show during tracking state */}
                <div
                  className={`absolute w-full rounded-lg bg-white p-2 sm:p-3 shadow-lg border-l-4 border-red-500 transition-all duration-1000 ${
                    (animationState === 'tracking' || (animationState === 'savings' && messageState !== 'calculating'))
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4 pointer-events-none'
                  }`}
                >
                  <div className="flex flex-col">
                    <div className="flex items-center justify-center text-gray-500 mb-1 sm:mb-2">
                      <Target className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      <span className="text-xs sm:text-sm font-medium">Target Rate</span>
                    </div>
                    <div className="text-gray-900 text-lg sm:text-2xl font-bold text-center mb-1 sm:mb-2">
                      {targetRate}%
                    </div>
                    <div className="flex items-center justify-between text-[10px] sm:text-xs">
                      <span className="text-gray-500">Monthly:</span>
                      <span className="text-gray-800 font-semibold">{formatCurrency(targetPayment)}</span>
                    </div>
                  </div>
                </div>

                {/* Three cards grid - Show during calculating state */}
                <div
                  className={`absolute w-full grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 transition-all duration-1000 ${
                    (messageState === 'calculating' || messageState === 'congratulations')
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4 pointer-events-none'
                  }`}
                >
                  {/* Old Rate Card */}
                  <div className="rounded-lg bg-white p-2 sm:p-3 shadow-lg border-l-4 border-gray-800">
                    <div className="flex flex-col">
                      <div className="flex items-center justify-center text-gray-500 mb-1 sm:mb-2">
                        <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        <span className="text-xs sm:text-sm font-medium">Old Rate</span>
                      </div>
                      <div className="text-gray-900 text-lg sm:text-2xl font-bold text-center mb-1 sm:mb-2">
                        {currentRate}%
                      </div>
                      <div className="flex items-center justify-between text-[10px] sm:text-xs">
                        <span className="text-gray-500">Monthly:</span>
                        <span className="text-gray-800 font-semibold">{formatCurrency(currentPayment)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Target Rate Card */}
                  <div className="rounded-lg bg-white p-2 sm:p-3 shadow-lg border-l-4 border-red-500">
                    <div className="flex flex-col">
                      <div className="flex items-center justify-center text-gray-500 mb-1 sm:mb-2">
                        <Target className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        <span className="text-xs sm:text-sm font-medium">Target Rate</span>
                      </div>
                      <div className="text-gray-900 text-lg sm:text-2xl font-bold text-center mb-1 sm:mb-2">
                        {targetRate}%
                      </div>
                      <div className="flex items-center justify-between text-[10px] sm:text-xs">
                        <span className="text-gray-500">Monthly:</span>
                        <span className="text-gray-800 font-semibold">{formatCurrency(targetPayment)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Annual Savings Card */}
                  <div className="rounded-lg bg-white p-2 sm:p-3 shadow-lg border-l-4 border-green-500">
                    <div className="flex flex-col">
                      <div className="flex items-center justify-center text-gray-500 mb-1 sm:mb-2">
                        <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        <span className="text-xs sm:text-sm font-medium">Annual Savings</span>
                      </div>
                      <div className="text-gray-900 text-lg sm:text-2xl font-bold text-center mb-1 sm:mb-2">
                        {formatCurrency(annualSavings)}
                      </div>
                      <div className="flex items-center justify-between text-[10px] sm:text-xs">
                        <span className="text-gray-500">Monthly:</span>
                        <span className="text-gray-800 font-semibold">{formatCurrency(monthlySavings)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MortgageRateTracker