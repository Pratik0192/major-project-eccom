import { createContext, useState, useEffect } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

  const currency = '₹';
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [cartItems, setCartItems] = useState({});
  const [wishlistItems, setWishlistItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("")
  const [alertVisible, setAlertVisible] = useState(false);
  const [warningVisible, setWarningVisible] = useState(false); 
  const navigate = useNavigate();

  const addToCart = async(itemId, size) => {
    console.log("Add to Cart Clicked", { itemId, size }); // Debugging
    if(!size) {
      setWarningVisible(true); // ✅ Show warning alert
      setTimeout(() => setWarningVisible(false), 3000)
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
    setAlertVisible(true);
    setTimeout(() => setAlertVisible(false), 3000);

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

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
  
    if (quantity === 0) {
      delete cartData[itemId][size]; // Remove item if quantity is 0
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId]; // Remove product if no sizes remain
      }
    } else {
      cartData[itemId][size] = quantity;
    }
  
    setCartItems({ ...cartData });
  
    if (token) {
      try {
        await axios.post(backendUrl + "/api/cart/update", { itemId, size, quantity }, { headers: { token } });
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const removeFromCart = async (itemId, size) => {
    let cartData = structuredClone(cartItems);
    
    if (cartData[itemId]) {
      delete cartData[itemId][size]; // Remove specific size entry
  
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId]; // If no sizes remain, remove the item
      }
    }
  
    setCartItems({ ...cartData });
  
    if (token) {
      try {
        await axios.post(backendUrl + "/api/cart/remove", { itemId, size }, { headers: { token } });
        console.log("Item removed from cart on backend");
      } catch (error) {
        console.log("Backend Error", error.response?.data || error.message);
        toast.error(error.message);
      }
    }
  };
  
  

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

  const addToWishlist = async(itemId) => {
    if(!token) { 
      toast.error("Please login to add items to wishlist");
      return;
    }
    try {
      const response = await axios.post(
        backendUrl + "/api/wishlist/add",
        { itemId },
        { headers: { token } }
      )

      console.log("Wishlist Add Response:", response.data.wishlistData);

      if(response.data.success) {
        toast.success("Added to wishlist");
        getWishlistedItems(token);
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const removeWishlist = async(itemId) => {
    if(!token) {
      toast.error("please login to remove the items from wishlist");
      return;
    }

    try {
      const response = await axios.post(
        backendUrl + "/api/wishlist/remove",
        { itemId },
        { headers: {token} }
      );

      if(response.data.success) {
        toast.success("Removed from wishlist");
        getWishlistedItems(token)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong")
    }
  }

  const getWishlistedItems = async(token) => {
    if(!token) return;

    try {
      const response = await axios.post(
        backendUrl + "/api/wishlist/get",
        {},
        { headers: {token} }
      );

      if(response.data.success) {
        setWishlistItems(response.data.wishlistData || []);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong")
    }
  }

  const getWishlistCount = () => {
    console.log("Wishlist Items: ", wishlistItems);
    const count = Object.keys(wishlistItems).length;
    console.log("Wishlist count: ", count);
    return count
  };
  

  useEffect(() => {
    getProductsData()
  }, [])

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      getUserCart(savedToken);
      getWishlistedItems(savedToken);
    }
  }, []);
  
  console.log("token from context ", token);

  const value = {
    products, currency, delivery_fee,
    search, setSearch,
    cartItems, addToCart, removeFromCart , setCartItems,
    getCartCount, updateQuantity,
    getCartAmount,
    wishlistItems, addToWishlist, removeWishlist, getWishlistedItems,
    getWishlistCount,
    navigate,
    backendUrl,
    setToken, token 
  }

  return (
    <ShopContext.Provider value={value} >
      {props.children}
      {alertVisible && (
        <div className="fixed bottom-4 right-4 alert alert-success shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Item added to cart successfully!</span>
        </div>
      )}

      {warningVisible && (
        <div className="fixed bottom-4 right-4 alert alert-warning shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>Warning: Select a size first!</span>
        </div>
      )}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider;