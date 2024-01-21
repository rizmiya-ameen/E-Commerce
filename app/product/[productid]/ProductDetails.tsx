"use client";

import Button from "@/components/Button";
import SetColor from "@/components/products/SetColor";
import { SetQuantity } from "@/components/products/SetQuantity";
import { useCart } from "@/hooks/useCart";
import { Rating } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

interface ProductDetailsProps {
  product: any;
}

export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImg: SelectedImgType;
  quantity: number;
  price: number;
};

export type SelectedImgType = {
  color: string;
  colorCode: string;
  image: string;
};

const Horizontal = () => {
  return <hr className="w-[30%] my-2" />;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
 
  const { handleAddProductToCart, cartProducts } = useCart();

  const [ isProductInCart, setIsProductInCart ] = useState(false)

  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: { ...product.images[0] },
    quantity: 1,
    price: product.price,
  });

  useEffect(() => {
    setIsProductInCart(false);

    if(cartProducts) {
      const existingIndex = cartProducts.findIndex(
        (item) => item.id === product.id
      )

      if (existingIndex > -1) {
        setIsProductInCart(true);
      }
    }
  }, [cartProducts])

  const productRating =
    product.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
    product.reviews.length;

  const handleColorSelect = useCallback(
    (value: SelectedImgType) => {
      setCartProduct((prev) => {
        return { ...prev, selectedImg: value };
      });
    },
    [cartProduct.selectedImg]
  );

  console.log(cartProducts);
  //console.log(cartTotalQty)

  /*
  const handleQtyIncrease = useCallback(() => {

    if (cartProduct.quantity === 50) return 50;
    setCartProduct(prev => {
      return {...prev, quantity: ++prev.quantity}
    })
  }, [cartProduct])

  
  const handleQtyDecrease = useCallback(() => {

    if (cartProduct.quantity === 1) {
      return 1
    }
    setCartProduct(prev => {
      return {...prev, quantity: --prev.quantity}
    })
  }, [cartProduct])
  */

  const handleQtyDecrease = useCallback(() => {
    setCartProduct((prev) => {
      if (prev.quantity === 1) {
        return { ...prev, quantity: 1 };
      } else {
        return { ...prev, quantity: prev.quantity - 1 };
      }
    });
  }, [cartProduct]);

  const handleQtyIncrease = useCallback(() => {
    setCartProduct((prev) => {
      if (prev.quantity === 10) {
        return { ...prev, quantity: 10 };
      } else {
        return { ...prev, quantity: prev.quantity + 1 };
      }
    });
  }, [cartProduct]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div>Images</div>
      <div className="flex flex-col gap-1 text-slate-500 text-sm">
        <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
        <div className="flex items-center gap-2">
          <Rating value={productRating} readOnly />
          <p>{product.reviews.length} reviews</p>
        </div>

        <Horizontal />

        <div className="text-justify">{product.description}</div>

        <Horizontal />

        <div>
          <span className="font-semibold">BRAND:</span> {product.brand}
        </div>

        <div className={product.inStock ? "text-teal-400" : "text-rose-400"}>
          {product.inStock ? "In stock" : "Out of stock"}
        </div>
      </div>

      <Horizontal />

      <SetColor
        images={product.images}
        cartProduct={cartProduct}
        handleColorSelect={handleColorSelect}
      />

      <Horizontal />

      <SetQuantity
        cartProduct={cartProduct}
        handleQtyIncrease={handleQtyIncrease}
        handleQtyDecrease={handleQtyDecrease}
      />

      <Horizontal />

      <div className="max-w-[300px]">
        <Button label="Add To Cart" onClick={() => handleAddProductToCart(cartProduct)} />
      </div>
    </div>
  );
};

export default ProductDetails;

//console.log(cartProduct);

/*
  {
    "id": "648437b38c44d52b9542e340",
    "name": "Apple iPhone 13, 64GB",
    "description": "The product is refurbished, fully functional, and in excellent condition.",
    "category": "Phone",
    "brand": "Apple",
    "selectedImg": {
        "color": "Black",
        "colorCode": "#000000",
        "image": "https://m.media-amazon.com/images/I/61g+McQpg7L._AC_SX679_.jpg"
    },
    "quantity": 1,
    "price": 40
}
*/

//onsole.log(product);

/*
{
  "id": "648437b38c44d52b9542e340",
  "name": "Apple iPhone 13, 64GB",
  "description": "The product is refurbished, fully functional, and in excellent condition. ",
  "price": 40,
  "brand": "Apple",
  "category": "Phone",
  "inStock": true,
  "images": [
      {
          "color": "Black",
          "colorCode": "#000000",
          "image": "https://m.media-amazon.com/images/I/61g+McQpg7L._AC_SX679_.jpg"
      },
      {
          "color": "Blue",
          "colorCode": " #0000FF",
          "image": "https://m.media-amazon.com/images/I/713Om9vCHUL._AC_SX679_.jpg"
      },
      {
          "color": "Red",
          "colorCode": "#FF0000",
          "image": "https://m.media-amazon.com/images/I/61thdjmfHcL.__AC_SX300_SY300_QL70_FMwebp_.jpg"
      }
  ],
  "reviews": [
      {
          "id": "6499b4887402b0efd394d8f3",
          "userId": "6499b184b0e9a8c8709821d3",
          "productId": "648437b38c44d52b9542e340",
          "rating": 4,
          "comment": "good enough. I like the camera and casing. the delivery was fast too.",
          "createdDate": "2023-06-26T15:53:44.483Z",
          "user": {
              "id": "6499b184b0e9a8c8709821d3",
              "name": "Chaoo",
              "email": "example1@gmail.com",
              "emailVerified": null,
              "image": "https://lh3.googleusercontent.com/a/AAcHTtcuRLwWi1vPKaQOcJlUurlhRAIIq2LgYccE8p32=s96-c",
              "hashedPassword": null,
              "createdAt": "2023-06-26T15:40:52.558Z",
              "updatedAt": "2023-06-26T15:40:52.558Z",
              "role": "USER"
          }
      },
      {
          "id": "6499a110efe4e4de451c7edc",
          "userId": "6475af156bad4917456e6e1e",
          "productId": "648437b38c44d52b9542e340",
          "rating": 4,
          "comment": "I really liked it!!",
          "createdDate": "2023-06-26T14:30:40.998Z",
          "user": {
              "id": "6475af156bad4917456e6e1e",
              "name": "Charles",
              "email": "example@gmail.com",
              "emailVerified": null,
              "image": "https://lh3.googleusercontent.com/a/AAcHTteOiCtILLBWiAoolIW9PJH-r5825pBDl824_8LD=s96-c",
              "hashedPassword": null,
              "createdAt": "2023-05-30T08:08:53.979Z",
              "updatedAt": "2023-05-30T08:08:53.979Z",
              "role": "ADMIN"
          }
      }
  ]
}
*/
