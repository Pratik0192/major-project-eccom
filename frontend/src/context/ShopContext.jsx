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

  }

  const getCartCount = () => {

  }

  const updateQuantity = async(itemId, size, quantity) => {

  }

  const getCartAmount = () => {

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