export const CalculatorSkeleton = () => {
  return (
    <div className="w-full animate-pulse">
      <div className="space-y-4">
        {/* Header */}
        <div className="h-12 bg-gray-200 rounded-lg w-3/4" />
        
        {/* Input fields */}
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex space-x-4">
              <div className="h-4 bg-gray-200 rounded w-1/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
        
        {/* Results area */}
        <div className="mt-6 space-y-4">
          <div className="h-8 bg-gray-200 rounded-lg w-2/3" />
          <div className="h-24 bg-gray-200 rounded-lg w-full" />
        </div>
        
        {/* Action buttons */}
        <div className="flex space-x-4 mt-6">
          <div className="h-10 bg-gray-200 rounded-lg w-1/4" />
          <div className="h-10 bg-gray-200 rounded-lg w-1/4" />
        </div>
      </div>
    </div>
  )
}

export default CalculatorSkeleton 