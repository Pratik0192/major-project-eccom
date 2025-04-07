import Stripe from "stripe"
import razorpay from "razorpay"
import OrderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import sendEmail from "../config/sendEmail.js";
import orderDetailTemplate from "../utils/orderDetailTemplate.js";

const currency = 'inr'
const deliveryCharge = 50

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
})

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

    const user = await userModel.findById(userId);
    if(user && user.email) {
      await sendEmail({
        sendTo: user.email,
        subject: "Order Confirmation - Your Order has been Placed!",
        html: orderDetailTemplate({
          orderId: newOrder._id,
          items,
          amount,
          address,
          paymentMethod: "COD"
        })
      })
    }

    res.json({ success: true, message: "Order Placed" })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message})
  }
}

export const placeOrderStripe = async(req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;

    const orderData = {
      userId,
      items, 
      address,
      amount,
      paymentMethod: "STRIPE",
      payment: false,
      date: Date.now()
    }

    const newOrder = new OrderModel(orderData)
    await newOrder.save()

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name
        },
        unit_amount: item.discounted_price * 100
      },
      quantity: item.quantity
    }))

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: 'Delivery Charges'
        },
        unit_amount: deliveryCharge * 100
      },
      quantity: 1
    })

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: 'payment'
    })

    res.json({ success: true, session_url:session.url })

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message})
  }
}

export const verifyStripe = async(req, res) => {
  const { orderId, success, userId } = req.body

  try {
    if(success === 'true') {
      await OrderModel.findByIdAndUpdate(orderId, {payment: true});
      await userModel.findByIdAndUpdate(userId, { cartData: {} })
      res.json({success: true})
    } else {
      await OrderModel.findByIdAndUpdate(orderId)
      res.json({ success: false })
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message}) 
  }
}

export const placeOrderRazorpay = async(req, res) => {
  try {
    const { userId, items, amount, address } = req.body

    const orderData = {
      userId,
      items, 
      address,
      amount,
      paymentMethod: "RAZORPAY",
      payment: false,
      date: Date.now()
    }

    const newOrder = new OrderModel(orderData)
    await newOrder.save()

    const options = {
      amount: amount * 100,
      currency: currency.toUpperCase(),
      receipt: newOrder._id.toString()
    }

    await razorpayInstance.orders.create(options, (error, order) => {
      if(error) {
        console.log(error);
        return res.json({success: false, message: error})
      }
      res.json({ success: true, order })
    })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message}) 
  }
}

export const verifyRazorpay = async(req, res) => {
  try {
    const { userId, razorpay_order_id } = req.body

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
    console.log(orderInfo);
    if(orderInfo.status === 'paid') {
      await OrderModel.findByIdAndUpdate(orderInfo.receipt, {payment: true});
      await userModel.findByIdAndUpdate(userId, {cartData: {}})
      res.json({ success: true, message: "Payment Successfull" })
    } else {
      res.json({ success: false,  message: "payment failed"})
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message})
  }
}

export const userOrders = async (req, res) => {
  try {
    
    const { userId } = req.body
    const orders = await OrderModel.find({ userId })
    res.json({success: true, orders})

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message})
  }
}