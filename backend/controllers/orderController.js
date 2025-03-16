import Stripe from "stripe"
import OrderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

//cod
export const placeOrder = async(req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items, 
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now()
    }

    const newOrder = new OrderModel(orderData)
    await newOrder.save()

    await userModel.findByIdAndUpdate(userId, {cartData: {}})
    res.json({ success: true, message: "Order Places" })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message})
  }
}