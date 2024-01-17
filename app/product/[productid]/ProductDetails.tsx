import React from 'react'

interface ProductDetailsProps {
  product: any
}

const ProductDetails = ({product}: ProductDetailsProps) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
      <div>Images</div>
      <div>
        <h2>{product.name}</h2>
      </div>
    </div>
  )
}

export default ProductDetails