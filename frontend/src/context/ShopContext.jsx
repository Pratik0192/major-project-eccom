import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

  const currency = '₹';
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("")
  const navigate = useNavigate();

  const addToCart = async(itemId, size) => {
    console.log("Add to Cart Clicked", { itemId, size }); // Debugging
    if(!size) {
      toast.error("Select a size first");
      return;
    }

    let cartData = structuredClone(cartItems);
    console.log("Before Update", cartData); // Debugging

    if(cartData[itemId]) {
      if(cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    console.log("After Update", cartData); // Debugging
    setCartItems({...cartData}); // Ensure React detects changes

    if(token) {
      try {
        await axios.post(backendUrl + '/api/cart/add', {itemId, size}, {headers: {token}});
        console.log("Cart updated on backend"); // Debugging
      } catch (error) {
        console.log("Backend Error", error.response?.data || error.message);
        toast.error(error.message);
      }
    }
};


  const getCartCount = () => {
    let totalCount = 0;
    for(const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if(cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          
        }
      }
    }
    return totalCount;
  }

  const updateQuantity = async(itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;

    setCartItems(cartData);

    if(token) {
      try {
        await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, {headers: {token}})
      } catch (error) {
        console.log(error);
        toast.error(error.message)
      }
    }
  }

  const getCartAmount = () => {
    let totalAmount = 0;
    for(const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for(const item in cartItems[items]) {
        try {
          if(cartItems[items][item] > 0) {
            totalAmount += itemInfo.discounted_price * cartItems[items][item];
          }
        } catch (error) {
          
        }
      }
    }
    return totalAmount;
  }

  const getProductsData = async() => {
    try {
      
      const response = await axios.get(backendUrl + '/api/product/list')

      // console.log(response.data);

      if(response.data.success) {
        setProducts(response.data.products)
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(response.error.message)
    }
  }

  const getUserCart = async(token) => {
    try {
      const response = await axios.post(backendUrl + '/api/cart/get', {}, {headers: {token}})
      if(response.data.success) {
        setCartItems(response.data.cartData)
      }
    } catch (error) {
      console.log(error);
      toast.error(response.error.message)
    }
  }

  useEffect(() => {
    getProductsData()
  }, [])

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      getUserCart(savedToken); // Fetch user cart after login
    }
  }, []);
  
  console.log(token);
  

  const value = {
    products, currency, delivery_fee,
    search, setSearch,
    cartItems, addToCart, setCartItems,
    getCartCount, updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken, token
  }

  return (
    <ShopContext.Provider value={value} >
      {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider;