import express from "express"
import { addWishlist, getWishlist, removeWishlist } from "../controllers/wishlistController.js";
import authUser from "../middleware/auth.js";

const wishlistRouter = express.Router();

wishlistRouter.post("/add", authUser, addWishlist);
wishlistRouter.post("/get", authUser, getWishlist);
wishlistRouter.post("/remove", authUser, removeWishlist);

export default wishlistRouter;