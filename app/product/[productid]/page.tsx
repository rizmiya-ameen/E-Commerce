import Container from '@/components/Container'
import React from 'react'
import ProductDetails from './ProductDetails'
import { ListRating } from './ListRating'
import { products } from '@/utils/products'

interface Params {
  productid?: string
}

const Product = ({params}: {params: Params}) => {

  //console.log('params', params)
  //params { productid: '43' }

  const product = products.find(item => item.id === params.productid)
  
  return (
    <div className='p-8'>
      <Container>
        <ProductDetails product = {product}/>

        <div className='flex flex-col mt-20 gap-4'>
          <div>Add Rating</div>
          <ListRating product={product}/>
        </div>
      </Container>
    </div>
  )
}

export default Product