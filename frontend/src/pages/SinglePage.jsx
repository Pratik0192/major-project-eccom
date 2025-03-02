import React, { useContext, useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { ShopContext } from '../context/ShopContext'

const SinglePage = () => {

  const { products } = useContext(ShopContext);
  const {productId} = useParams()
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('')
  
  useEffect(() => {
    const fetchProductData = () => {
      const foundProduct = products.find((item) => item._id === productId);
      if(foundProduct) {
        setProductData(foundProduct);
        setImage(foundProduct.image[0])
      }
    }
  })

  console.log(productId);
  console.log(products);

  return (
    <div>
      
    </div>
  )
}

export default SinglePage