import Container from '@/components/Container'
import React from 'react'
import ProductDetails from './ProductDetails'
import { product } from '@/utils/product'

interface Params {
  productid?: string
}

const Product = ({params}: {params: Params}) => {

  console.log('params', params)
  //params { productid: '43' }

  
  return (
    <div className='p-8'>
      <Container>
        <ProductDetails product = {product}/>
      </Container>
    </div>
  )
}

export default Product