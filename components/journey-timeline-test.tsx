'use client'

import React from "react"
import { motion } from "framer-motion"
import { Search, FileText, UserCheck, Target, Bell, PiggyBank } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface JourneyStep {
  id: number
  title: string
  description: string
  icon: LucideIcon
  details?: {
    title: string
    value: string
  }[]
}

const journeySteps: JourneyStep[] = [
  {
    id: 1,
    title: "Start Your Journey",
    description: "Tell us your goal - whether it's lowering your payment, unlocking your cash, or owning your dream home.",
    icon: Search,
    details: [
      { title: "Time Required", value: "2 minutes" },
      { title: "Next Step", value: "Information Review" }
    ]
  },
  {
    id: 2,
    title: "Share Your Details",
    description: "Provide your current situation and goals so we can personalize your rate tracking experience.",
    icon: FileText,
    details: [
      { title: "Required Info", value: "Goals & Current Status" },
      { title: "Purpose", value: "Custom Rate Tracking" }
    ]
  },
  {
    id: 3,
    title: "Expert Guidance",
    description: "Connect with a dedicated mortgage expert who will understand your goals and create your personalized strategy.",
    icon: UserCheck,
    details: [
      { title: "Meeting Type", value: "Virtual Consultation" },
      { title: "Duration", value: "15-30 minutes" }
    ]
  },
  {
    id: 4,
    title: "Set Your Strategy",
    description: "Define your target rate and timeline based on your specific goals and market conditions.",
    icon: Target,
    details: [
      { title: "Strategy", value: "Personalized Plan" },
      { title: "Monitoring", value: "24/7 Automated" }
    ]
  },
  {
    id: 5,
    title: "Stay Informed",
    description: "Receive real-time updates when market conditions align with your goals and strategy.",
    icon: Bell,
    details: [
      { title: "Alert Method", value: "Email & SMS" },
      { title: "Response Time", value: "Same Day Review" }
    ]
  },
  {
    id: 6,
    title: "Achieve Your Goals",
    description: "Get your personalized offer and take the final steps toward your mortgage goals.",
    icon: PiggyBank,
    details: [
      { title: "Success Rate", value: "97% of clients" },
      { title: "Process Time", value: "30-45 days" }
    ]
  }
]

const JourneyTimelineTest: React.FC = () => {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-200" />

      {/* Journey Steps */}
      {journeySteps.map((step) => {
        const Icon = step.icon
        return (
          <div key={step.id} className="relative pl-24 pb-12 last:pb-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: step.id * 0.1 }}
              className="relative"
            >
              {/* Step indicator with number */}
              <div className="absolute -left-24 flex items-center justify-center">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  {/* Step number */}
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-primary text-white text-sm font-medium flex items-center justify-center">
                    {step.id}
                  </div>
                  <div className="absolute top-0 left-0 w-full h-full rounded-full border-2 border-primary/20 animate-ping" />
                </div>
              </div>

              {/* Step content */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                {/* Title and description */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>

                {/* Details grid */}
                {step.details && (
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    {step.details.map((detail, idx) => (
                      <div key={idx} className="bg-gray-50 p-3 rounded-md">
                        <p className="text-xs text-gray-500 mb-1">{detail.title}</p>
                        <p className="text-sm font-medium text-gray-900">{detail.value}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )
      })}
    </div>
  )
}

export { JourneyTimelineTest } 