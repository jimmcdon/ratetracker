"use client"

import Image from "next/image"
import { motion } from "framer-motion"

const testimonials = [
  {
    quote: "RateTracker saved me over $15,000 on my mortgage!",
    detail:
      "The process was incredibly smooth. I just input my details, and RateTracker did all the heavy lifting. Within weeks, I had a much better rate.",
    name: "Sarah Johnson",
    company: "Homeowner",
    location: "California",
    image: "/placeholder.svg",
  },
  {
    quote: "I couldn't believe how easy it was to save $20,000",
    detail:
      "RateTracker's interface is so user-friendly. It took me less than 10 minutes to set up, and now I'm saving a fortune on my mortgage payments.",
    name: "Michael Chen",
    company: "First-time buyer",
    location: "New York",
    image: "/placeholder.svg",
  },
  {
    quote: "RateTracker helped me reduce my loan term and save $30,000",
    detail:
      "Not only did I get a lower rate, but I also shortened my loan term. The whole process was seamless, and the savings are incredible!",
    name: "Emily Rodriguez",
    company: "Property investor",
    location: "Texas",
    image: "/placeholder.svg",
  },
  {
    quote: "Saved $25,000 and got out of a bad loan, thanks to RateTracker",
    detail:
      "I was stuck in a high-interest loan, but RateTracker found me a much better deal. The transition was smooth, and now I'm saving thousands every year.",
    name: "David Thompson",
    company: "Refinancer",
    location: "Florida",
    image: "/placeholder.svg",
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-24 overflow-hidden bg-gray-50 relative">
      {/* Animated arrow background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="arrow-line"></div>
        <div className="pulsing-dot"></div>
      </div>

      <div className="mx-auto max-w-7xl px-4 relative z-10">
        <h2 className="text-4xl font-normal text-center text-gray-900 mb-16">
          Here's what our raving fans have to say about RateTracker
        </h2>

        <div className="relative">
          <div className="flex flex-wrap justify-center gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg p-6 shadow-lg w-full md:w-[calc(50%-1rem)] lg:w-[calc(25%-1rem)] max-w-sm"
                initial={{
                  opacity: 0,
                  y: 50,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
              >
                <div className="mb-4">
                  <p className="text-xl font-medium text-gray-900 mb-2">"{testimonial.quote}"</p>
                  {testimonial.detail && <p className="text-gray-600 text-sm">{testimonial.detail}</p>}
                </div>

                <div className="flex items-center gap-3">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={`${testimonial.name}'s profile picture`}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-medium text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">
                      {testimonial.company} • {testimonial.location}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .arrow-line {
          position: absolute;
          top: -10%;
          left: -10%;
          width: 120%;
          height: 120%;
          background: linear-gradient(to bottom right, transparent 49.5%, rgba(0, 0, 0, 0.1) 50%, transparent 50.5%);
          animation: moveArrow 20s linear infinite;
        }
        .pulsing-dot {
          position: absolute;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: rgba(0, 0, 0, 0.3);
          animation: moveDot 20s linear infinite, pulseDot 2s ease-in-out infinite;
        }
        @keyframes moveArrow {
          0% { transform: translate(0, 0); }
          100% { transform: translate(-10%, -10%); }
        }
        @keyframes moveDot {
          0% { top: -5%; left: -5%; }
          100% { top: 95%; left: 95%; }
        }
        @keyframes pulseDot {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.5); opacity: 0.7; }
        }
      `}</style>
    </section>
  )
}

