"use client"

import { ArrowRight } from "lucide-react"
import Image from 'next/image';
import ModalButton from './modal-button';

export default function TrackToSaveSection() {
  const recentTransfers = [
    {
      name: "Bryan Alice",
      type: "ReFi",
      detail: "Monthly savings",
      amount: 432.0,
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Cooper Craig",
      type: "Shorten the term",
      detail: "Total savings",
      amount: 132.35,
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Jaylen Church",
      type: "New Home Purchase",
      detail: "7% interest rate",
      amount: 35.28,
      image: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    <section className="relative py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Track to Save
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Let us monitor rates for you and alert you when it's time to save.
            </p>
            <div className="mt-8">
              <ModalButton>Start Tracking</ModalButton>
            </div>
          </div>
          <div className="mt-12 lg:mt-0 lg:col-span-7">
            <div className="relative h-64 overflow-hidden rounded-lg">
              <Image
                src="/placeholder.jpg"
                alt="Track and save visualization"
                width={500}
                height={300}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

