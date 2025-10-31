import React from 'react'

function ProductSkeleton() {
  return (
    <div className="animate-pulse p-4  rounded-lg bg-gray-100">
      <div className="h-40 bg-gray-300 rounded-md mb-4"></div>
      <div className="h-4 bg-gray-300 rounded-md mb-2"></div>
      <div className="h-4 bg-gray-300 rounded-md w-1/2"></div>
    </div>
  )
}

export default ProductSkeleton