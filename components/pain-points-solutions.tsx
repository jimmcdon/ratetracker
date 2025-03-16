"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Clock, TrendingDown, Shield, Calculator, FileStack, CheckCircle, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

type PainPoint = {
  title: string
  reality: string
  solution: string
  icon: React.ElementType
  color: string
  gradient: string
  size?: "large" | "medium" | "small"
}

const painPoints: PainPoint[] = [
  {
    title: "Time-Consuming Rate Monitoring",
    reality: "Nobody has time to constantly check mortgage rates, research lenders, and calculate potential savings",
    solution:
      "Simply set your target rate once, and we'll monitor the market 24/7. You'll only hear from us when there's real money to be saved",
    icon: Clock,
    color: "from-gray-900",
    gradient: "bg-gradient-to-br from-gray-900/10 to-gray-100/20",
    size: "large"
  },
  {
    title: "Missed Opportunities",
    reality:
      "By the time most people realize rates have dropped significantly, they've already missed out on months of potential savings",
    solution:
      "Our real-time monitoring alerts you the moment rates hit your target, ensuring you never miss an opportunity to save",
    icon: TrendingDown,
    color: "from-gray-800",
    gradient: "bg-gradient-to-br from-gray-800/10 to-gray-100/20",
    size: "medium"
  },
  {
    title: "Predatory Marketing & Spam",
    reality:
      "Searching for rates online triggers an avalanche of unwanted calls, emails, and aggressive sales tactics from multiple lenders",
    solution:
      "Work with real humans who respect your privacy. No spam, no sales calls - just personalized notifications when genuine savings opportunities arise",
    icon: Shield,
    color: "from-gray-700",
    gradient: "bg-gradient-to-br from-gray-700/10 to-gray-100/20",
    size: "medium"
  },
  {
    title: "Complex Financial Decisions",
    reality: "Understanding when refinancing makes financial sense requires complex calculations and market knowledge",
    solution:
      "We combine AI-powered analysis with human expertise to do all the math for you. Our alerts only come when the savings are substantial enough to justify a rate reduction",
    icon: Calculator,
    color: "from-gray-600",
    gradient: "bg-gradient-to-br from-gray-600/10 to-gray-100/20",
    size: "small"
  },
  {
    title: "Overwhelming Process",
    reality: "Too many sources, too many lenders, and too much paperwork make rate shopping feel like a second job",
    solution:
      "Our human experts, backed by smart technology, handle the complexities. You get clear, actionable guidance and support throughout the entire process",
    icon: FileStack,
    color: "from-gray-500",
    gradient: "bg-gradient-to-br from-gray-500/10 to-gray-100/20",
    size: "small"
  },
]

const features = [
  {
    title: "Human Expertise",
    description: "Real mortgage professionals reviewing your opportunities",
    gradient: "from-gray-900/10 to-gray-100/20",
  },
  {
    title: "Smart Technology",
    description: "AI-powered rate monitoring and analysis",
    gradient: "from-gray-800/10 to-gray-100/20",
  },
  {
    title: "Respect for Privacy",
    description: "No spam, no unwanted calls, no harassment",
    gradient: "from-gray-700/10 to-gray-100/20",
  },
  {
    title: "Genuine Savings Focus",
    description: "We only reach out when there's meaningful money to be saved",
    gradient: "from-gray-600/10 to-gray-100/20",
  },
]

const PainPointCard = ({ point }: { point: PainPoint }) => {
  const Icon = point.icon
  const sizeClasses = {
    large: "md:col-span-2 md:row-span-2",
    medium: "md:col-span-1 md:row-span-2",
    small: "md:col-span-1 md:row-span-1"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300",
        sizeClasses[point.size || "medium"]
      )}
    >
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
        point.gradient
      )} />
      
      <div className="relative z-10">
        <div className={cn(
          "mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl",
          point.gradient
        )}>
          <Icon className={cn(
            "h-6 w-6 transition-transform duration-300 group-hover:scale-110",
            point.color.replace("from-", "text-")
          )} />
        </div>

        <h3 className="mb-4 text-xl font-semibold text-gray-900">{point.title}</h3>
        
        {point.size !== "small" && (
          <div className="space-y-4">
            <div>
              <h4 className="mb-2 flex items-center gap-2 font-medium text-gray-700">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                The Reality
              </h4>
              <p className="text-gray-600">{point.reality}</p>
            </div>
            <div>
              <h4 className="mb-2 flex items-center gap-2 font-medium text-gray-700">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                Our Solution
              </h4>
              <p className="text-gray-600">{point.solution}</p>
            </div>
          </div>
        )}
        
        {point.size === "small" && (
          <p className="text-gray-600">{point.solution}</p>
        )}
      </div>
    </motion.div>
  )
}

const PainPointsSolutions: React.FC = () => {
  return (
    <section className="py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            Why Most Homeowners Miss Out on Mortgage Savings
          </h2>
          <p className="text-gray-500">
            We've identified the key challenges that prevent homeowners from maximizing their mortgage savings.
            Here's how RateTracker solves each one.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {painPoints.map((point) => (
            <PainPointCard key={point.title} point={point} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-white pointer-events-none" />
          
          <div className="relative">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">The RateTracker Difference</h2>
            <p className="text-gray-700 mb-8 max-w-3xl">
              We're not just another automated system - we're real people using advanced technology to make mortgage
              savings effortless for you. Our unique approach combines:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className={cn(
                    "rounded-2xl bg-gradient-to-br p-6 relative group cursor-default",
                    feature.gradient
                  )}
                >
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-gray-900/5 to-gray-900/10" />
                  <CheckCircle className="h-8 w-8 text-gray-900/80 mb-3" />
                  <h3 className="font-medium text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="mt-12 flex justify-center"
            >
              <a
                href="#calculator"
                className="inline-flex items-center px-6 py-3 border border-gray-900 text-base font-medium rounded-full shadow-sm text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200"
              >
                Calculate Your Savings <ArrowRight className="ml-2 -mr-1 w-5 h-5" />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default PainPointsSolutions

