import { createContext, useState } from "react";
import { products as productData } from '../assets/assets'

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const [productList, setProductList] = useState(productData);

  const value = {
    productList,
  }

  return (
    <ShopContext.Provider value={value} >
      {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider;