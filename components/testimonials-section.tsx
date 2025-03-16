"use client"

import * as React from "react"
import { motion } from "framer-motion"
import Marquee from "react-fast-marquee"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

type Testimonial = {
  content: string
  author: string
  role: string
  company: string
  rating: number
  gradient: string
}

const testimonials: Testimonial[] = [
  {
    content:
      "RateTracker helped me save over $400 per month on my mortgage. Their alerts were timely and the guidance was invaluable.",
    author: "Sarah Johnson",
    role: "Homeowner",
    company: "San Francisco, CA",
    rating: 5,
    gradient: "from-gray-900/10 to-gray-100/20",
  },
  {
    content:
      "The combination of AI monitoring and human expertise made the refinancing process smooth and stress-free.",
    author: "Michael Chen",
    role: "Tech Professional",
    company: "Seattle, WA",
    rating: 5,
    gradient: "from-gray-800/10 to-gray-100/20",
  },
  {
    content:
      "I appreciate that they only contacted me when there was genuine savings potential. No spam, just real opportunities.",
    author: "Emily Rodriguez",
    role: "Small Business Owner",
    company: "Austin, TX",
    rating: 5,
    gradient: "from-gray-700/10 to-gray-100/20",
  },
  {
    content:
      "Their platform saved me countless hours of rate monitoring and calculations. The ROI was immediate and significant.",
    author: "David Kim",
    role: "Financial Analyst",
    company: "Chicago, IL",
    rating: 5,
    gradient: "from-gray-600/10 to-gray-100/20",
  },
  {
    content:
      "Finally, a service that respects my privacy while delivering real value. The savings were better than I expected.",
    author: "Lisa Thompson",
    role: "Healthcare Professional",
    company: "Boston, MA",
    rating: 5,
    gradient: "from-gray-500/10 to-gray-100/20",
  },
]

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl p-8 transition-all hover:shadow-lg",
        "bg-gradient-to-br",
        testimonial.gradient
      )}
    >
      <div className="relative z-10 flex h-full flex-col justify-between">
        <div>
          <div className="flex items-center space-x-1">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star
                key={i}
                className="h-5 w-5 fill-gray-900 text-gray-900"
              />
            ))}
          </div>
          <div className="mt-4 text-lg leading-normal text-gray-900">
            {testimonial.content}
          </div>
        </div>
        <div className="mt-6">
          <div className="font-medium text-gray-900">{testimonial.author}</div>
          <div className="text-sm text-gray-600">
            {testimonial.role} • {testimonial.company}
          </div>
        </div>
      </div>
    </div>
  )
}

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 bg-gray-50/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="relative flex flex-col items-center justify-center space-y-4 px-6 py-8 md:px-8">
            <h2 className="text-center text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
              Trusted by Homeowners Nationwide
            </h2>
            <p className="max-w-2xl text-center text-gray-600">
              Join thousands of satisfied homeowners who've discovered significant savings through our intelligent rate monitoring service.
            </p>
          </div>
        </motion.div>

        <div className="space-y-8">
          {/* First Row - Left to Right */}
          <Marquee
            gradient={false}
            speed={40}
            pauseOnHover={true}
            className="py-4"
          >
            <div className="flex gap-6">
              {testimonials.slice(0, 3).map((testimonial) => (
                <TestimonialCard key={testimonial.author} testimonial={testimonial} />
              ))}
            </div>
          </Marquee>

          {/* Second Row - Right to Left */}
          <Marquee
            gradient={false}
            speed={40}
            direction="right"
            pauseOnHover={true}
            className="py-4"
          >
            <div className="flex gap-6">
              {testimonials.slice(3).map((testimonial) => (
                <TestimonialCard key={testimonial.author} testimonial={testimonial} />
              ))}
            </div>
          </Marquee>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-sm text-gray-800">
            <Star className="w-4 h-4 fill-gray-900 text-gray-900" />
            <span>4.9/5 average rating from over 200+ homeowners</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TestimonialsSection

