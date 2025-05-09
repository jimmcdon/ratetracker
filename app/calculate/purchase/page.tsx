'use client';
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";

function Sidebar() {
  return (
    <div className="w-full md:w-80 flex flex-col gap-6">
      {/* Did you know card */}
      <div className="bg-blue-50 p-4 rounded-xl flex items-center gap-4">
        <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="avatar" className="w-12 h-12 rounded-full" />
        <div>
          <div className="font-semibold">Did you know?</div>
          <div className="text-sm text-gray-600">
            Specific loans are built for situations like rental homes, so <span className="font-semibold">how you use the home</span> is important.
          </div>
        </div>
      </div>
      {/* Testimonial card */}
      <div className="bg-white p-4 rounded-xl shadow">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-green-500">★★★★★</span>
        </div>
        <div className="font-semibold mb-1">Had a great experience with RateTracker!</div>
        <div className="text-sm text-gray-600 mb-2">
          RateTracker helped me get approved and in my new home as a first time homebuyer with hardly any issues. My advisor answered all my questions and kept me informed throughout the process. Highly recommended!
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-gray-200 rounded-full px-2 py-1 text-xs">TD</span>
          <span className="text-xs text-gray-500">Thien D</span>
        </div>
      </div>
    </div>
  );
}

export default function PurchaseCalculationPage() {
  const [propertyValue, setPropertyValue] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [targetPayment, setTargetPayment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [hasRealtor, setHasRealtor] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const formatInput = (value, isPercent = false) => {
    let formatted = value.replace(/[^\d.]/g, "");
    const parts = formatted.split(".");
    if (parts.length > 2) {
      formatted = parts[0] + "." + parts.slice(1).join("");
    }
    return isPercent ? formatted + "%" : formatted;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    // TODO: Implement actual submission logic (API call, analytics, etc.)
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12">
        <h1 className="text-3xl font-bold mb-4 text-center">Thank you!</h1>
        <p className="text-gray-600 mb-6 text-center">We've received your information and will be in touch soon.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Purchase Calculation</h1>
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        <form className="w-full md:flex-1 bg-white rounded-lg shadow p-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label className="block mb-1">Property Value</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <Input
                type="text"
                placeholder="0.00"
                value={propertyValue}
                onChange={e => setPropertyValue(formatInput(e.target.value))}
                className="pl-8 text-lg"
                required
              />
            </div>
          </div>
          <div>
            <Label className="block mb-1">Down Payment</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <Input
                type="text"
                placeholder="0.00"
                value={downPayment}
                onChange={e => setDownPayment(formatInput(e.target.value))}
                className="pl-8 text-lg"
                required
              />
            </div>
          </div>
          <div>
            <Label className="block mb-1">Loan Term (years)</Label>
            <Input
              type="text"
              placeholder="30"
              value={loanTerm}
              onChange={e => setLoanTerm(formatInput(e.target.value))}
              className="text-lg"
              required
            />
          </div>
          <div>
            <Label className="block mb-1">Target Monthly Payment</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <Input
                type="text"
                placeholder="0.00"
                value={targetPayment}
                onChange={e => setTargetPayment(formatInput(e.target.value))}
                className="pl-8 text-lg"
                required
              />
            </div>
          </div>
          <div>
            <Label className="block mb-1">Name</Label>
            <Input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="text-lg"
              required
            />
          </div>
          <div>
            <Label className="block mb-1">Email</Label>
            <Input
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="text-lg"
              required
            />
          </div>
          <div>
            <Label className="block mb-2">Are you working with a realtor?</Label>
            <RadioGroup
              value={hasRealtor === true ? "yes" : hasRealtor === false ? "no" : ""}
              onValueChange={value => setHasRealtor(value === "yes")}
              className="flex gap-4"
              required
            >
              <div>
                <RadioGroupItem value="yes" id="realtor-yes" />
                <Label htmlFor="realtor-yes" className="ml-2">Yes</Label>
              </div>
              <div>
                <RadioGroupItem value="no" id="realtor-no" />
                <Label htmlFor="realtor-no" className="ml-2">No</Label>
              </div>
            </RadioGroup>
          </div>
          <Button type="submit" className="w-full text-lg" disabled={submitting}>
            {submitting ? "Submitting..." : "Calculate & Track My Rate"}
          </Button>
        </form>
        <div className="w-full md:w-80 flex-shrink-0">
          <Sidebar />
        </div>
      </div>
    </div>
  );
} 