import { StepCalculatorTest } from "@/components/calculators/step-calculator-test"
import { JourneyTimelineTest } from "@/components/journey-timeline-test"
import ModalButton from "@/components/modal-button"

export function CalculatorJourneySection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold tracking-tight mb-4">
            Calculate Your Savings and Start Your Journey
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Whether you want to lower your payment, unlock your cash, or own your dream home, we'll guide you through every step with personalized support and real-time rate tracking.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Calculator Column - Sticky on desktop */}
          <div className="relative lg:h-[calc(100vh-6rem)]">
            <div className="lg:sticky lg:top-24 lg:overflow-auto">
              <div className="relative p-[2px] rounded-lg bg-gradient-to-r from-gray-200 via-gray-900 to-gray-200 animate-gradient-x">
                <div className="relative bg-white rounded-lg">
                  <StepCalculatorTest />
                </div>
              </div>
            </div>
          </div>

          {/* Journey Column */}
          <div className="lg:pt-12">
            <JourneyTimelineTest />
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-16 text-center">
          <div className="inline-block">
            <ModalButton>Start Your Journey</ModalButton>
          </div>
        </div>
      </div>
    </section>
  )
} 