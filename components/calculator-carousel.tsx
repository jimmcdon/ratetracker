"use client"

import { useState } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { StepCalculator } from "@/components/calculators/step-calculator"
// Keep the import but comment it out for now
// import { MortgageRateTracker } from "@/components/mortgage-rate-tracker"

interface CalculatorCarouselProps {
  onTargetPaymentEntered?: (payment: number) => void
}

export default function CalculatorCarousel({ onTargetPaymentEntered }: CalculatorCarouselProps) {
  // Keep the state for future use
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <Carousel
      opts={{
        align: "start",
        loop: false,
        duration: 50,
      }}
      className="w-full relative"
    >
      <CarouselContent>
        <CarouselItem>
          <StepCalculator onCalculate={onTargetPaymentEntered} />
        </CarouselItem>
        {/* Additional calculators can be added here later */}
        {/* Example:
        <CarouselItem>
          <MortgageRateTracker />
        </CarouselItem>
        */}
      </CarouselContent>
      {/* Navigation arrows can be added back when needed */}
    </Carousel>
  )
} 