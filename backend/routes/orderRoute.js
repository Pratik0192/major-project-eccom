import express from "express"
import { placeOrder, placeOrderStripe, verifyStripe } from "../controllers/orderController.js"
import authUser from "../middleware/auth.js";

const orderRouter = express.Router();

//payment features
orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/stripe", authUser, placeOrderStripe);

//verify payment
orderRouter.post('/verifyStripe', authUser, verifyStripe);

export default orderRouter