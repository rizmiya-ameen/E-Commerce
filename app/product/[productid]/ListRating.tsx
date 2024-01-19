"use client"

import Heading from "@/components/Heading"
import moment from "moment"

interface ListRatingProps {
  product: any
}

export const ListRating: React.FC<ListRatingProps> = ({product}) => {
  return (
    <div>
      <Heading title="Product Review"/>

      <div className="text-sm mt-2">
        {product.reviews && product.reviews.map((review: any) => {
          return <div key={review.id} className="max-w-[300px]">
            <div>
              <div>Avatar</div>
              <div>{review?.user?.name}</div>

              {/* npm i moment - can use it to format the dates*/}
              <div>{moment(review.createdDate).fromNow()}</div>
              <p >{review.comment}</p>
            </div>
          </div>
        })}
      </div>
    </div>
  )
}
