"use client"

import { ArrowRight } from "lucide-react"

interface TrackToSaveSectionProps {
  openModal: () => void
}

export default function TrackToSaveSection({ openModal }: TrackToSaveSectionProps) {
  const recentTransfers = [
    {
      name: "Bryan Alice",
      type: "ReFi",
      detail: "Monthly savings",
      amount: 432.0,
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Cooper Craig",
      type: "Shorten the term",
      detail: "Total savings",
      amount: 132.35,
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Jaylen Church",
      type: "New Home Purchase",
      detail: "7% interest rate",
      amount: 35.28,
      image: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    <section className="py-24 bg-gradient-custom from-customRed via-white to-customBlue">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div>
            <h2 className="text-5xl font-normal tracking-tight text-gray-900 mb-4">Track to Save!</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              Get Started Now and Explore New Possibilities with Our Comprehensive Resources.
            </p>
            <button
              className="inline-flex items-center justify-center rounded-full bg-gray-900 px-8 py-3 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
              onClick={openModal}
            >
              Get Started now
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>

          {/* Right Column */}
          <div className="relative">
            {/* Gradient Blob */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-gradient-custom from-customRed to-customBlue rounded-full blur-3xl opacity-20" />

            {/* Transfers List */}
            <div className="relative bg-white rounded-2xl shadow-lg p-6 max-w-md ml-auto">
              <div className="space-y-4">
                {recentTransfers.map((transfer, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img src={transfer.image || "/placeholder.svg"} alt="" className="w-10 h-10 rounded-full" />
                      <div>
                        <div className="font-medium text-gray-900">{transfer.name}</div>
                        <div className="text-sm font-medium text-gray-600">{transfer.type}</div>
                        <div className="text-sm text-gray-500">{transfer.detail}</div>
                      </div>
                    </div>
                    <div className="font-semibold text-gray-900">${transfer.amount.toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

