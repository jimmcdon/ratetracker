import { StepCalculatorTest } from "@/components/calculators/step-calculator-test"
import { JourneyTimelineTest } from "@/components/journey-timeline-test"
import ModalButton from "@/components/modal-button"

export function CalculatorSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold tracking-tight mb-4">
            Calculate Your Savings
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Use our calculator to estimate your savings and set your mortgage goals.
          </p>
        </div>
        <div className="relative max-w-xl mx-auto">
          <div className="relative p-[2px] rounded-lg bg-gradient-to-r from-gray-200 via-gray-900 to-gray-200 animate-gradient-x">
            <div className="relative bg-white rounded-lg">
              <StepCalculatorTest />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function JourneySection() {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold tracking-tight mb-4">
            Start Your Journey
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            We'll guide you through every step with personalized support and real-time rate tracking.
          </p>
        </div>
        <div className="lg:pt-12 max-w-3xl mx-auto">
          <JourneyTimelineTest />
        </div>
        <div className="mt-16 text-center">
          <div className="inline-block">
            <ModalButton>Start Your Journey</ModalButton>
          </div>
        </div>
        <div className="mt-10 text-xs text-gray-500 text-center max-w-2xl mx-auto">
          All rates listed are quoted with a standard loan cost of 3.5% to determine APR. Rates are subject to change and may vary based on creditworthiness or loan terms.<br />
          All loan officers affiliated with RateTracker have been trained, vetted, and uphold their fiduciary responsibility while maintaining the same pay structure.
        </div>
      </div>
    </section>
  )
} 