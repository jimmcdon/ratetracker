"use client"

import { UserCircle, Target, UserCheck, PiggyBank } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { AnalyticsCard } from "./analytics-card"

export default function HowItWorksSection() {
  const steps = [
    {
      icon: <UserCircle className="w-5 h-5" />,
      title: "Get Organized",
      description: "Share your current mortgage details and financial information with our secure platform.",
    },
    {
      icon: <Target className="w-5 h-5" />,
      title: "Track Progress",
      description: "Monitor your performance with real-time dashboards and detailed analytics.",
      showCard: true,
    },
    {
      icon: <UserCheck className="w-5 h-5" />,
      title: "Get Personalized Estimates",
      description: "Receive customized rate estimates from our expert team.",
    },
    {
      icon: <PiggyBank className="w-5 h-5" />,
      title: "Save Money",
      description: "Maximize your savings with automated tracking and notifications.",
    },
  ]

  return (
    <section className="py-24 bg-gray-50/50">
      <div className="mx-auto max-w-5xl px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-normal tracking-tight text-gray-900 mb-4">How It Works</h2>
          <p className="text-base text-gray-500">Track your mortgage rate and get notified when it's time to save.</p>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] border-l border-dashed border-gray-200" />

          {/* Steps */}
          <div className="space-y-20">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start justify-center gap-8">
                <div className="w-1/2 flex justify-end">
                  <StepCard step={step} index={index} />
                </div>
                {step.showCard && (
                  <div className="w-1/2 pt-12">
                    <AnalyticsCard />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function StepCard({ step, index }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pr-16 max-w-sm"
    >
      {/* Step icon */}
      <div className="absolute right-0 top-0 flex items-center justify-center w-[55px] h-[55px]">
        <div className="absolute inset-0 bg-white rounded-full border border-gray-200" />
        <div className="relative z-10 p-3 bg-white rounded-full">{step.icon}</div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm relative mr-8">
        {/* Dotted border effect */}
        <div className="absolute -inset-px border border-dashed border-gray-200 rounded-lg pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <h3 className="text-lg font-medium text-gray-900">{step.title}</h3>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
        </div>
      </div>
    </motion.div>
  )
}

