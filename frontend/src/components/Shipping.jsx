import React, { useContext, useState } from "react";
import stripelogo from "../assets/stripe_logo.png";
import razorpaylogo from "../assets/razorpay_logo.png"
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import toast from "react-hot-toast"

const Shipping = () => {

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const { navigate, backendUrl, token, getCartAmount, cartItems, setCartItems, products, delivery_fee,} = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);
        try {
          const { data } = await axios.post(backendUrl + '/api/order/verifyrazorpay', response, {headers: {token}})
          if(data.success) {
            navigate('/orders')
            setCartItems({})
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const onSubmitHandler = async(e) => {
    e.preventDefault();
    try {

      let orderItems = []

      for(const items in cartItems) {
        for(const item in cartItems[items]) {
          if(cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if(itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }

      switch(paymentMethod) {
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place', orderData, {headers: {token}})
          console.log(response.data);
          if(response.data.success) {
            toast.success("Order Placed")
            setCartItems({})
            setTimeout(() => {
              navigate('/orders')
            }, 3000);
          } else {
            toast.error(response.data.message)
          }
          break;
        
        case 'stripe':
          const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, {headers: {token}})
          if(responseStripe.data.success) {
            const { session_url } = responseStripe.data
            window.location.replace(session_url)
          } else {
            toast.error(responseStripe.data.message)
          }
          break

        case 'razorpay':
          const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, { headers: {token}})
          if(responseRazorpay.data.success) {
            console.log(responseRazorpay.data.order);
            initPay(responseRazorpay.data.order)
          }
          break;

        default:
          break;
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  return (
    <form className="bg-gray-100 min-h-screen p-4 text-gray-700" onSubmit={onSubmitHandler}>
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">
        {/* Left Side: Shipping Form */}
        <div className="w-full lg:w-2/3 bg-white shadow-md p-6 rounded-md">
          <h2 className="text-2xl font-semibold mb-4">Shipping Details</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={onChangeHandler}
                placeholder="First Name"
                className="border p-2 w-full rounded-md"
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={onChangeHandler}
                placeholder="Last Name"
                className="border p-2 w-full rounded-md"
              />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChangeHandler}
              placeholder="Email"
              className="border p-2 w-full rounded-md"
            />
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={onChangeHandler}
              placeholder="Street Address"
              className="border p-2 w-full rounded-md"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={onChangeHandler}
                placeholder="City"
                className="border p-2 w-full rounded-md"
              />
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={onChangeHandler}
                placeholder="State"
                className="border p-2 w-full rounded-md"
              />
              <input
                type="text"
                name="zipcode"
                value={formData.zipcode}
                onChange={onChangeHandler}
                placeholder="Zipcode"
                className="border p-2 w-full rounded-md"
              />
            </div>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={onChangeHandler}
              placeholder="Country"
              className="border p-2 w-full rounded-md"
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={onChangeHandler}
              placeholder="Phone Number"
              className="border p-2 w-full rounded-md"
            />
          </div>
        </div>

        {/* Right Side: Bill Details */}
        <div className="w-full lg:w-1/3 bg-white shadow-md p-6 rounded-md">
          <h2 className="text-2xl font-semibold mb-4">Bill Details</h2>

          <div className="flex justify-between py-2">
            <span>Total item price</span>
            <span className="font-medium">₹{getCartAmount()}</span>
          </div>

          <div className="flex justify-between py-2 font-semibold text-lg">
            <span>Total payable</span>
            <span>₹{getCartAmount()}</span>
          </div>

          {/* Apply Coupon */}
          <button className="w-full border border-gray-300 p-2 rounded-md mt-4 hover:bg-gray-200">
            Apply Coupon
          </button>

          {/* Apply Insurance */}
          <button className="w-full border border-gray-300 p-2 rounded-md mt-2 hover:bg-gray-200">
            Apply Insurance
          </button>

          {/* Payment Method */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Payment Method</h3>
            <div className="flex items-center gap-4 mt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="stripe"
                  checked={paymentMethod === "stripe"}
                  onChange={() => setPaymentMethod("stripe")}
                  className="w-4 h-4"
                />
                <img className='h-5' src={stripelogo} alt="" />
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="razorpay"
                  checked={paymentMethod === "razorpay"}
                  onChange={() => setPaymentMethod("razorpay")}
                  className="w-4 h-4"
                />
                <img className='h-5' src={razorpaylogo} alt="" />
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="w-4 h-4"
                />
                <span className="">Cash on Delivery</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white font-semibold p-3 rounded-md mt-4 hover:bg-green-600"
          >
            Place Order
          </button>
        </div>
      </div>
    </form>
  );
};

export default Shipping;
