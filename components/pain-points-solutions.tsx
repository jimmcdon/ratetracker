import type React from "react"
import { CheckCircle } from "lucide-react"

type PainPoint = {
  title: string
  reality: string
  solution: string
}

const painPoints: PainPoint[] = [
  {
    title: "Time-Consuming Rate Monitoring",
    reality: "Nobody has time to constantly check mortgage rates, research lenders, and calculate potential savings",
    solution:
      "Simply set your target rate once, and we'll monitor the market 24/7. You'll only hear from us when there's real money to be saved",
  },
  {
    title: "Missed Opportunities",
    reality:
      "By the time most people realize rates have dropped significantly, they've already missed out on months of potential savings",
    solution:
      "Our real-time monitoring alerts you the moment rates hit your target, ensuring you never miss an opportunity to save",
  },
  {
    title: "Predatory Marketing & Spam",
    reality:
      "Searching for rates online triggers an avalanche of unwanted calls, emails, and aggressive sales tactics from multiple lenders",
    solution:
      "Work with real humans who respect your privacy. No spam, no sales calls - just personalized notifications when genuine savings opportunities arise",
  },
  {
    title: "Complex Financial Decisions",
    reality: "Understanding when refinancing makes financial sense requires complex calculations and market knowledge",
    solution:
      "We combine AI-powered analysis with human expertise to do all the math for you. Our alerts only come when the savings are substantial enough to justify a rate reduction",
  },
  {
    title: "Overwhelming Process",
    reality: "Too many sources, too many lenders, and too much paperwork make rate shopping feel like a second job",
    solution:
      "Our human experts, backed by smart technology, handle the complexities. You get clear, actionable guidance and support throughout the entire process",
  },
]

const PainPointsSolutions: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Why Most Homeowners Miss Out on Mortgage Savings
        </h2>

        <div className="space-y-8">
          {painPoints.map((point, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">{point.title}</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">The Reality</h4>
                  <p className="text-gray-600">{point.reality}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">How RateTracker Solves This</h4>
                  <p className="text-gray-600">{point.solution}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">The RateTracker Difference</h2>
          <p className="text-gray-700 mb-4">
            We're not just another automated system - we're real people using advanced technology to make mortgage
            savings effortless for you. Our unique approach combines:
          </p>
          <ul className="space-y-2">
            {[
              "Human Expertise: Real mortgage professionals reviewing your opportunities",
              "Smart Technology: AI-powered rate monitoring and analysis",
              "Respect for Privacy: No spam, no unwanted calls, no harassment",
              "Genuine Savings Focus: We only reach out when there's meaningful money to be saved",
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default PainPointsSolutions

