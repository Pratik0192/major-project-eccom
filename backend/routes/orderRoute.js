import express from "express"
import { placeOrder } from "../controllers/orderController.js"
import authUser from "../middleware/auth.js";

const orderRouter = express.Router();

orderRouter.post("/place", authUser, placeOrder);

export default orderRouter