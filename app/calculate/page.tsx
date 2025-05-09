import { CalculatorSection } from "../sections/calculator-journey";

export default function StandaloneCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12">
      <div className="max-w-2xl w-full p-8 bg-white rounded-lg shadow mb-8">
        <h1 className="text-3xl font-bold mb-4 text-center">Mortgage Savings Calculator</h1>
        <p className="text-gray-600 mb-6 text-center">Estimate your savings and set your mortgage goals with our easy-to-use calculator.</p>
        <CalculatorSection />
      </div>
    </div>
  );
} 