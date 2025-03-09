"use client"

import { useState, useEffect, useRef } from "react"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { motion } from "framer-motion"
import annotationPlugin from "chartjs-plugin-annotation"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, annotationPlugin)

const targetEmojiPlugin = {
  id: "targetEmoji",
  afterDraw: (chart) => {
    const {
      ctx,
      scales: { x, y },
    } = chart
    const targetX = x.getPixelForValue(110000 * (1 - 5 / 8.25))
    const targetY = y.getPixelForValue(5)

    ctx.save()
    ctx.font = "16px Arial"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText("🎯", targetX, targetY - 20)
    ctx.restore()
  },
}

export function InteractiveMortgageGraph() {
  const [currentRate, setCurrentRate] = useState(7.25)
  const [totalSavings, setTotalSavings] = useState(0)
  const animationRef = useRef<number | null>(null)
  const targetRate = 5

  const calculateSavings = (rate: number) => {
    return 110000 * (1 - rate / 8.25)
  }

  const calculatePayment = (principal: number, rate: number, termInMonths: number) => {
    const monthlyRate = rate / 100 / 12
    return (
      (principal * monthlyRate * Math.pow(1 + monthlyRate, termInMonths)) /
      (Math.pow(1 + monthlyRate, termInMonths) - 1)
    )
  }

  useEffect(() => {
    const startTime = performance.now()
    const duration = 5000 // 5 seconds

    const animateFrame = (time: number) => {
      const progress = Math.min((time - startTime) / duration, 1)
      const newRate = 7.25 - progress * 2.25 // Rate decreases from 7.25% to 5%
      setCurrentRate(newRate)
      setTotalSavings(calculateSavings(newRate))

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animateFrame)
      }
    }

    animationRef.current = requestAnimationFrame(animateFrame)
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  const data = {
    labels: Array.from({ length: 23 }, (_, i) => i * 5000), // Savings from 0 to 110,000
    datasets: [
      {
        label: "Interest Rate vs Savings",
        data: Array.from({ length: 23 }, (_, i) => ({
          x: i * 5000,
          y: 8.25 - (i * 8.25) / 22, // This will create a line from 8.25% to 0%
        })),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Interest Rate vs Total Savings",
        font: {
          size: 16,
        },
      },
      targetEmoji: targetEmojiPlugin,
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Total Savings ($)",
          font: {
            size: 12,
          },
        },
        ticks: {
          callback: (value: number) => `$${(value / 1000).toFixed(0)}K`,
          font: {
            size: 10,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Interest Rate (%)",
          font: {
            size: 12,
          },
        },
        min: 0,
        max: 8.25,
        ticks: {
          font: {
            size: 10,
          },
        },
      },
    },
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
        <div className="flex-grow sm:w-3/4 h-64 sm:h-80">
          <Line options={options} data={data} plugins={[targetEmojiPlugin]} />
        </div>

        <div className="mt-4 sm:mt-0 sm:w-1/4 flex sm:flex-col items-center justify-between">
          <div className="w-full text-center">
            <h3 className="text-base font-semibold text-gray-900 mb-2">Current Rate</h3>
            <div className="h-32 w-6 bg-gray-200 rounded-full overflow-hidden relative mx-auto">
              <motion.div
                className="absolute bottom-0 w-full bg-blue-500"
                initial={{ height: "12.12%" }} // (7.25 / 8.25) * 100
                animate={{ height: `${(currentRate / 8.25) * 100}%` }}
                transition={{ duration: 5 }}
              ></motion.div>
            </div>
            <p className="mt-2 text-sm font-semibold text-gray-900">{currentRate.toFixed(2)}%</p>
          </div>
        </div>
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">Total Savings: ${totalSavings.toFixed(2)}</p>
        <p className="text-sm text-gray-600 mt-1">Target Rate: {targetRate}%</p>
      </div>
    </div>
  )
}

