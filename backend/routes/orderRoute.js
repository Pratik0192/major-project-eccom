import express from "express"
import { placeOrder, placeOrderRazorpay, placeOrderStripe, userOrders, verifyRazorpay, verifyStripe } from "../controllers/orderController.js"
import authUser from "../middleware/auth.js";

const orderRouter = express.Router();

//payment features
orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/stripe", authUser, placeOrderStripe);
orderRouter.post("/razorpay", authUser, placeOrderRazorpay);

//verify payment
orderRouter.post('/verifyStripe', authUser, verifyStripe);
orderRouter.post('/verifyrazorpay', authUser, verifyRazorpay);

orderRouter.post('/userorders', authUser, userOrders);

export default orderRouter