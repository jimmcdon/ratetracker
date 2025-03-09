"use client"

import { X, MoreHorizontal } from "lucide-react"

export function AnalyticsCard() {
  return (
    <div className="bg-white rounded-lg w-[380px] border border-gray-100 shadow-sm">
      {/* Card Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">task</span>
            <span className="text-sm text-gray-500">/</span>
            <span className="text-sm text-gray-500">analytics</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal className="w-4 h-4" />
            </button>
            <button className="text-gray-400 hover:text-gray-600">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900">Activities</h3>
        <p className="text-sm text-gray-500 mb-8">The Amount of stuff completed</p>

        {/* Progress Circle */}
        <div className="relative w-48 h-48 mx-auto mb-6">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="96" cy="96" r="88" fill="none" stroke="#f3f4f6" strokeWidth="12" strokeDasharray="553" />
            <circle
              cx="96"
              cy="96"
              r="88"
              fill="none"
              stroke="#374151"
              strokeWidth="12"
              strokeDasharray="553"
              strokeDashoffset="138"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-medium text-gray-900">24</span>
          </div>
        </div>

        <div className="text-center mb-6">
          <p className="text-sm font-medium text-gray-900">Total Tasks assigned</p>
          <p className="text-xs text-gray-500">Last Check on 28 Oct</p>
        </div>

        <button className="w-full text-sm text-gray-500 bg-gray-50 py-2 rounded-md mb-6 hover:bg-gray-100">
          What these stats mean?
        </button>

        {/* Stats List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-900"></div>
              <span className="text-sm text-gray-600">Total</span>
            </div>
            <span className="text-sm text-gray-900">24</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              <span className="text-sm text-gray-600">Unassigned</span>
            </div>
            <span className="text-sm text-gray-900">4</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-500"></div>
              <span className="text-sm text-gray-600">In Progress</span>
            </div>
            <span className="text-sm text-gray-900">12</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-400"></div>
              <span className="text-sm text-gray-600">Completed</span>
            </div>
            <span className="text-sm text-gray-900">6</span>
          </div>
        </div>
      </div>
    </div>
  )
}

