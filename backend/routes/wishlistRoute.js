import express from "express"
import { addWishlist, getWishlist, removeWishlist } from "../controllers/wishlistController.js";

const wishlistRouter = express.Router();

wishlistRouter.post("/add", addWishlist);
wishlistRouter.get("/get", getWishlist);
wishlistRouter.post("/remove", removeWishlist);

export default wishlistRouter