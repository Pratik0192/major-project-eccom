import Stripe from "stripe"
import OrderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const currency = 'inr'
const deliveryCharge = 50

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