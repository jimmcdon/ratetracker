'use client';
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

function Sidebar() {
  return (
    <div className="w-full md:w-80 flex flex-col gap-6">
      <div className="bg-blue-50 p-4 rounded-xl flex items-center gap-4">
        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="avatar" className="w-12 h-12 rounded-full" />
        <div>
          <div className="font-semibold">Did you know?</div>
          <div className="text-sm text-gray-600">
            Cash out refinancing lets you access your home equity for big expenses or investments.
          </div>
        </div>
      </div>
      <div className="bg-white p-4 rounded-xl shadow">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-green-500">★★★★★</span>
        </div>
        <div className="font-semibold mb-1">Got the cash I needed!</div>
        <div className="text-sm text-gray-600 mb-2">
          The cash out process was simple and fast. I was able to renovate my home and increase its value. Thank you!
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-gray-200 rounded-full px-2 py-1 text-xs">AM</span>
          <span className="text-xs text-gray-500">Alex M</span>
        </div>
      </div>
    </div>
  );
}

export default function CashoutCalculationPage() {
  const [propertyValue, setPropertyValue] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [cashAmount, setCashAmount] = useState("");
  const [cashoutType, setCashoutType] = useState(null);
  const [currentRate, setCurrentRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [targetPayment, setTargetPayment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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
      <h1 className="text-3xl font-bold mb-8 text-center">Cash Out Calculation</h1>
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
            <Label className="block mb-1">Current Loan Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <Input
                type="text"
                placeholder="0.00"
                value={loanAmount}
                onChange={e => setLoanAmount(formatInput(e.target.value))}
                className="pl-8 text-lg"
                required
              />
            </div>
          </div>
          <div>
            <Label className="block mb-1">Cash Amount Needed</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <Input
                type="text"
                placeholder="0.00"
                value={cashAmount}
                onChange={e => setCashAmount(formatInput(e.target.value))}
                className="pl-8 text-lg"
                required
              />
            </div>
          </div>
          <div>
            <Label className="block mb-2">How would you like to access your cash?</Label>
            <RadioGroup
              value={cashoutType || ""}
              onValueChange={value => setCashoutType(value)}
              className="flex gap-4"
              required
            >
              <div>
                <RadioGroupItem value="refinance" id="cashout-refinance" />
                <Label htmlFor="cashout-refinance" className="ml-2">Refinance current mortgage</Label>
              </div>
              <div>
                <RadioGroupItem value="heloc" id="cashout-heloc" />
                <Label htmlFor="cashout-heloc" className="ml-2">Add a 2nd/HELOC</Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <Label className="block mb-1">Current Interest Rate (%)</Label>
            <div className="relative">
              <Input
                type="text"
                placeholder="5.5"
                value={currentRate.replace('%', '')}
                onChange={e => setCurrentRate(formatInput(e.target.value, true))}
                className="text-lg pr-14"
                required
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
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