"use client"

import { motion } from "framer-motion"

interface PhoneMockupProps {
  variant: 'equity' | 'rate' | 'purchase'
}

type AlertContent = {
  equity: {
    icon: string;
    title: string;
    message: string;
    amount: string;
    label: string;
  };
  rate: {
    icon: string;
    title: string;
    message: string;
    amount: string;
    label: string;
  };
  purchase: {
    icon: string;
    title: string;
    message: string;
    submessage: string;
    amount: string;
    label: string;
  };
}

const alertContent: AlertContent = {
  equity: {
    icon: "💰",
    title: "Equity Available",
    message: "Access up to $150,000",
    amount: "$150,000",
    label: "Available Equity"
  },
  rate: {
    icon: "💸",
    title: "Rate Alert",
    message: "New rate available at 3% - Save $250/mo",
    amount: "3%",
    label: "New Rate"
  },
  purchase: {
    icon: "🏠",
    title: "Target Rate Achieved",
    message: "Your target rate has been achieved",
    submessage: "Your new home payment is $2,340/mo",
    amount: "$2,340",
    label: "Monthly Payment"
  }
}

export function PhoneMockup({ variant }: PhoneMockupProps) {
  const content = alertContent[variant]

  const isPurchaseVariant = (content: AlertContent[keyof AlertContent]): content is AlertContent['purchase'] => {
    return 'submessage' in content;
  }

  return (
    <div className="relative w-full max-w-[380px] aspect-[1/2]">
      {/* Phone Frame */}
      <div className="absolute inset-0 bg-black rounded-[3rem] overflow-hidden">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-7 bg-black rounded-b-3xl z-20" />
        
        {/* Screen Content */}
        <div className="absolute inset-[1px] bg-gray-50 rounded-[calc(3rem-1px)]">
          {/* Alert Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute top-20 left-4 right-4 bg-white rounded-xl p-4 shadow-lg"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-lg">
                {content.icon}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-blue-600">{content.title}</div>
                <div className="text-lg font-semibold mt-1">{content.message}</div>
                {isPurchaseVariant(content) && (
                  <div className="text-gray-600">{content.submessage}</div>
                )}
                <div className="mt-2">
                  <div className="text-sm text-gray-500">{content.label}</div>
                  <div className="text-xl font-semibold">{content.amount}</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Rate Graph */}
          {(variant === 'rate' || variant === 'purchase') && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute bottom-20 left-4 right-4 h-40"
            >
              <div className="w-full h-full relative">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path
                    d="M0,20 Q25,40 50,60 T100,80"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="0.5"
                  />
                  <path
                    d="M0,20 Q25,40 50,60 T100,80"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="2"
                    strokeDasharray="1 1"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      from="2"
                      to="0"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </path>
                </svg>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500 rounded-full" />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
} 