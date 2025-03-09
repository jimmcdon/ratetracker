"use client"

import { useState, useEffect } from "react"
import { TrendingDown, Target, ArrowRight, DollarSign, LineChart, BarChart3, Calendar } from "lucide-react"

const MortgageRateTracker = ({
  currentRate = 7.25,
  targetRate = 5.0,
  loanAmount = 500000,
  loanTerm = 30,
  animationDuration = 5.25, // Increased by 75% from 3 seconds to 5.25 seconds
  width = "max-w-4xl", // Add this line
}) => {
  const [animationState, setAnimationState] = useState("initial") // 'initial', 'tracking', 'target-hit', 'savings'
  const [progress, setProgress] = useState(0)

  // Calculate monthly payments
  const calculateMonthlyPayment = (principal, rate, years) => {
    const monthlyRate = rate / 100 / 12
    const numPayments = years * 12
    return (
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)
    )
  }

  const currentPayment = calculateMonthlyPayment(loanAmount, currentRate, loanTerm)
  const targetPayment = calculateMonthlyPayment(loanAmount, targetRate, loanTerm)
  const monthlySavings = currentPayment - targetPayment
  const annualSavings = monthlySavings * 12

  // Animation control
  useEffect(() => {
    let animationTimer: NodeJS.Timeout
    let progressInterval: NodeJS.Timeout

    const runAnimation = () => {
      // Reset state
      setAnimationState("initial")
      setProgress(0)

      // Start tracking after a short delay
      animationTimer = setTimeout(() => {
        setAnimationState("tracking")

        // Hit target after the animation duration
        animationTimer = setTimeout(() => {
          setAnimationState("target-hit")

          // Show savings after flash effect
          animationTimer = setTimeout(() => {
            setAnimationState("savings")

            // Progress animation for the savings bar
            let progressVal = 0
            progressInterval = setInterval(() => {
              progressVal += 2
              setProgress(Math.min(progressVal, 100))

              if (progressVal >= 100) {
                clearInterval(progressInterval)
              }
            }, 40) // 50 steps over 2 seconds = 40ms per step
          }, 1000) // Longer pause at target hit
        }, animationDuration * 1000)
      }, 800) // Delay before tracking begins

      // Schedule the next animation cycle after a 4-second pause
      animationTimer = setTimeout(runAnimation, (animationDuration + 7) * 1000) // Total duration + 4 seconds pause
    }

    // Start the initial animation cycle
    runAnimation()

    // Cleanup function
    return () => {
      clearTimeout(animationTimer)
      clearInterval(progressInterval)
    }
  }, [animationDuration])

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Calculate the path point coordinates
  const startPoint = { x: 80, y: 80 } // Moved more to top-left corner
  const targetPoint = { x: 400, y: 300 }
  const endPoint = { x: 700, y: 140 }

  // Calculate tracker position based on animation state
  const getTrackerPosition = () => {
    if (animationState === "initial") return startPoint
    if (animationState === "target-hit" || animationState === "savings") return targetPoint

    // During 'tracking' state, use React's animation frame for smooth movement
    const elapsed = Date.now() % ((animationDuration + 7) * 1000) // Total cycle duration
    const animationProgress = Math.min(elapsed / (animationDuration * 1000), 1)

    return {
      x: startPoint.x + (targetPoint.x - startPoint.x) * animationProgress,
      y: startPoint.y + (targetPoint.y - startPoint.y) * animationProgress,
    }
  }

  // Get current tracker position
  const trackerPos = getTrackerPosition()

  // Determine if savings path and bar should be visible
  const showSavings = animationState === "savings"
  const flashVisible = animationState === "target-hit"

  return (
    <div className="w-full overflow-x-auto pt-20">
      <div className={`${width} mx-auto bg-gray-50 rounded-xl shadow-lg overflow-hidden min-w-[820px]`}>
        {/* Header with glass effect */}
        <div className="py-3 px-6 bg-gray-900 text-white backdrop-blur-sm bg-opacity-90">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center mb-2 sm:mb-0">
              <LineChart className="w-6 h-6 mr-2" />
              <h2 className="text-xl font-light tracking-wide">RateTracker In Action</h2>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center text-sm">
              <div className="flex items-center text-gray-400 mb-1 sm:mb-0 sm:mr-4">
                <Calendar className="w-4 h-4 mr-1" />
                Last updated: {new Date().toLocaleDateString()}
              </div>
              <div className="flex items-center text-gray-400">
                <DollarSign className="w-4 h-4 mr-1" />
                {formatCurrency(loanAmount)} over {loanTerm} years
              </div>
            </div>
          </div>
        </div>

        <div className="relative p-6" style={{ height: "480px" }}>
          {/* Status text above target - removed as we're adding callouts instead */}
          {/* Callout bubbles for different stages */}

          {/* Initial tracking callout */}
          <div
            className={`absolute bg-white shadow-lg rounded-lg p-3 transform transition-all duration-500 ${animationState === "tracking" ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
            style={{ left: "120px", top: "60px", width: "160px" }}
          >
            <div className="text-gray-800 font-medium text-sm text-center">Tracking Target Rate</div>
            {/* Callout triangle */}
            <div
              className="absolute w-3 h-3 bg-white transform rotate-45"
              style={{ bottom: "-6px", left: "15px" }}
            ></div>
          </div>

          {/* Target acquired callout */}
          <div
            className={`absolute bg-white shadow-lg rounded-lg p-3 transform transition-all duration-500 ${animationState === "target-hit" ? "opacity-100 scale-100 animate-pulse" : "opacity-0 scale-95"}`}
            style={{ left: "400px", top: "220px", width: "160px", transform: "translateX(-50%)" }}
          >
            <div className="text-gray-900 font-bold text-base text-center">Target Acquired!</div>
            {/* Callout triangle */}
            <div
              className="absolute w-3 h-3 bg-white transform rotate-45"
              style={{ bottom: "-6px", left: "50%", marginLeft: "-6px" }}
            ></div>
          </div>

          {/* Savings callout - moved to top center */}
          <div
            className={`absolute bg-white shadow-lg rounded-lg p-3 transform transition-all duration-500 ${animationState === "savings" ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
            style={{ left: "50%", top: "30px", width: "240px", transform: "translateX(-50%)" }}
          >
            <div className="text-gray-800 font-bold text-base text-center">Congratulations on your Savings!</div>
            {/* Callout triangle */}
            <div
              className="absolute w-3 h-3 bg-white transform rotate-45"
              style={{ bottom: "-6px", left: "50%", marginLeft: "-6px" }}
            ></div>
          </div>

          {/* Confetti effect - subtler and covering the entire component */}
          {animationState === "savings" && (
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              {[...Array(100)].map((_, i) => {
                const size = Math.random() * 4 + 2 // Smaller particles (2-6px)
                const color = ["#9CA3AF", "#6B7280", "#4B5563", "#374151", "#111827"][Math.floor(Math.random() * 5)]
                const left = Math.random() * 800 // Spread across the full width
                const top = Math.random() * 100 // Start near the top
                const animDuration = Math.random() * 3 + 5 + "s" // Slower (5-8s)
                const animDelay = Math.random() * 1.5 + "s" // More staggered

                return (
                  <div
                    key={i}
                    className="absolute rounded-sm animate-confetti"
                    style={{
                      width: size + "px",
                      height: size + "px",
                      backgroundColor: color,
                      left: left + "px",
                      top: top + "px",
                      animationDuration: animDuration,
                      animationDelay: animDelay,
                    }}
                  ></div>
                )
              })}
            </div>
          )}
          {/* Grid background */}
          <div className="absolute inset-0 m-6 flex flex-col justify-between opacity-20">
            {[...Array(8)].map((_, i) => (
              <div key={`h-${i}`} className="w-full border-b border-gray-400"></div>
            ))}
          </div>
          <div className="absolute inset-0 m-6 flex justify-between opacity-20">
            {[...Array(7)].map((_, i) => (
              <div key={`v-${i}`} className="h-full border-r border-gray-400"></div>
            ))}
          </div>

          {/* Current rate box - positioned to align with the target */}
          <div
            className="absolute rounded-lg bg-white p-4 shadow-md border-l-4 border-gray-800"
            style={{ left: "60px", top: "300px", width: "180px", transform: "translateY(-50%)" }}
          >
            <div className="flex items-center text-gray-500 mb-1">
              <TrendingDown className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">Current Rate</span>
            </div>
            <div className="text-gray-900 text-2xl font-bold">{currentRate}%</div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-gray-500">Monthly:</span>
              <span className="text-gray-800 font-semibold">{formatCurrency(currentPayment)}</span>
            </div>
          </div>

          {/* Target rate - styled as a professional target icon */}
          <div className="absolute" style={{ left: "400px", top: "300px", transform: "translate(-50%, -50%)" }}>
            <div className="w-24 h-24 rounded-full border-[3px] border-gray-400 flex items-center justify-center">
              <div className="w-18 h-18 rounded-full border-[3px] border-gray-600 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border-[3px] border-gray-700 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center">
                    <Target className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute mt-1 top-full left-1/2 transform -translate-x-1/2">
              <div className="text-gray-800 text-sm font-bold">{targetRate}%</div>
            </div>
          </div>

          {/* Tracking line with animated gradient */}
          <svg className="absolute inset-0" width="100%" height="100%" style={{ overflow: "visible" }}>
            {/* Defs for animated gradient */}
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
              x1={startPoint.x}
              y1={startPoint.y}
              x2={targetPoint.x}
              y2={targetPoint.y}
              stroke="#e5e7eb"
              strokeWidth="2"
            />

            {/* Animated gradient line */}
            <line
              x1={startPoint.x}
              y1={startPoint.y}
              x2={targetPoint.x}
              y2={targetPoint.y}
              stroke="url(#trackingGradient)"
              strokeWidth="3"
            />

            {/* Savings path */}
            {showSavings && (
              <line
                x1={targetPoint.x}
                y1={targetPoint.y}
                x2={endPoint.x}
                y2={endPoint.y}
                stroke="#111827"
                strokeWidth="2"
                className="transition-all duration-1000"
                strokeDasharray="400"
                strokeDashoffset={showSavings ? "0" : "400"}
              />
            )}
          </svg>

          {/* Tracker beacon with radar-like pulse effect */}
          <div
            className="absolute"
            style={{
              left: `${trackerPos.x}px`,
              top: `${trackerPos.y}px`,
              transform: "translate(-50%, -50%)",
              opacity: animationState === "savings" ? 0 : 1,
            }}
          >
            {/* Inner beacon dot */}
            <div className="w-4 h-4 rounded-full bg-gray-800 shadow-lg z-20 relative"></div>

            {/* Pulsing circles */}
            <div className="absolute top-1/2 left-1/2 w-12 h-12 -mt-6 -ml-6 z-10">
              <div
                className="w-full h-full rounded-full bg-gray-700 opacity-30 animate-ping"
                style={{ animationDuration: "1.5s" }}
              ></div>
            </div>
            <div className="absolute top-1/2 left-1/2 w-8 h-8 -mt-4 -ml-4 z-10">
              <div
                className="w-full h-full rounded-full bg-gray-700 opacity-50 animate-ping"
                style={{ animationDuration: "1.5s", animationDelay: "0.5s" }}
              ></div>
            </div>
          </div>

          {/* Green tracker (shows after target hit) */}
          {showSavings && (
            <div
              className="absolute w-4 h-4 rounded-full bg-gray-900 shadow-lg transform -translate-x-2 -translate-y-2"
              style={{
                left: showSavings ? `${endPoint.x}px` : `${targetPoint.x}px`,
                top: showSavings ? `${endPoint.y}px` : `${targetPoint.y}px`,
                filter: "drop-shadow(0 0 4px rgba(17, 24, 39, 0.8))",
                transition: "left 2s, top 2s",
              }}
            />
          )}

          {/* Flash effect */}
          {flashVisible && (
            <div
              className="absolute w-20 h-20 bg-white rounded-full opacity-70 transform -translate-x-10 -translate-y-10"
              style={{
                left: `${targetPoint.x}px`,
                top: `${targetPoint.y}px`,
                animation: "flash 0.5s forwards",
              }}
            />
          )}

          {/* New payment box - positioned above the end of the savings line */}
          <div
            className={`absolute rounded-lg bg-white p-4 shadow-md border-l-4 border-gray-900 transition-opacity duration-500 ${showSavings ? "opacity-100" : "opacity-0"}`}
            style={{ right: "60px", top: "110px", width: "180px", transform: "translateY(-100%)" }}
          >
            <div className="flex items-center text-gray-500 mb-1">
              <ArrowRight className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">New Payment</span>
            </div>
            <div className="text-gray-900 text-2xl font-bold">{formatCurrency(targetPayment)}</div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-gray-500">Monthly Savings:</span>
              <span className="text-gray-800 font-semibold">{formatCurrency(monthlySavings)}</span>
            </div>
          </div>

          {/* Vertical Savings progress bar - adjusted position */}
          <div
            className={`absolute transition-opacity duration-500 ${showSavings ? "opacity-100" : "opacity-0"}`}
            style={{
              right: "160px", // Moved left 100px (from 60px to 160px)
              top: "180px", // Moved up 20px (from 200px to 180px)
              height: "140px",
              width: "60px",
              transform: "translateX(50%)", // Center it with the payment box
            }}
          >
            <div className="text-gray-700 text-center text-sm font-medium mb-2 flex items-center justify-center">
              <BarChart3 className="w-4 h-4 mr-1" />
              <span>Annual Savings</span>
            </div>

            {/* Savings amount */}
            <div className="text-gray-900 text-sm font-bold mb-2 text-center">
              {formatCurrency((annualSavings * progress) / 100)}
            </div>

            {/* Vertical progress bar container with glass effect */}
            <div className="relative h-full w-6 mx-auto">
              <div className="absolute inset-0 rounded-full bg-gray-200 backdrop-blur-sm bg-opacity-50 border border-gray-300"></div>
              <div
                className="absolute bottom-0 w-full rounded-full bg-gray-900 transition-all duration-2000"
                style={{ height: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes flash {
            0% { transform: scale(0) translate(-50%, -50%); opacity: 0; }
            50% { transform: scale(1) translate(-50%, -50%); opacity: 0.8; }
            100% { transform: scale(1.5) translate(-50%, -50%); opacity: 0; }
          }
          
          @keyframes pulse {
            0% { opacity: 0; transform: scale(0.5); }
            50% { opacity: 0.6; }
            100% { opacity: 0; transform: scale(1.5); }
          }
          
          .animate-pulse {
            animation: 0.8s ease-in-out 0s infinite alternate pulse-text;
          }
          
          @keyframes pulse-text {
            0% { opacity: 0.7; }
            100% { opacity: 1; transform: scale(1.05); }
          }
          
          @keyframes confetti {
            0% { transform: translateY(0) rotate(0deg); opacity: 0.7; }
            100% { transform: translateY(450px) rotate(720deg); opacity: 0; }
          }
          
          .animate-confetti {
            animation-name: confetti;
            animation-timing-function: ease-in-out;
            animation-iteration-count: 1;
            animation-fill-mode: both;
          }
        `}</style>
      </div>
    </div>
  )
}

export default MortgageRateTracker

