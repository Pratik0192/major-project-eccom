import express from "express"
import { loginUser, registerUser, adminLogin, verifyEmailController, forgotPasswordController, verifyForgotPasswordOtp, resetPassword } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/verify-email', verifyEmailController)
userRouter.post('/login', loginUser);
userRouter.put('/forgot-password', forgotPasswordController);
userRouter.put('/verify-forgot-password-otp', verifyForgotPasswordOtp)
userRouter.put('/reset-password', resetPassword);
userRouter.post('/admin', adminLogin);

export default userRouter;