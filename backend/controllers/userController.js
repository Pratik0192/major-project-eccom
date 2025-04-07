import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import sendEmail from "../config/sendEmail.js";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import forgotPasswordTemplate from "../utils/forgotPasswordTemplate.js"
import generateotp from "../utils/generateOtp.js"


const createToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET)
}

const loginUser = async(req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if(!user) {
      return res.json({success: false, message: "user does not exist"});
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = createToken(user._id);
      return res.json({ success: true, token, message: "Login successful!" });
    } else {
      return res.json({ success: false, message: "Invalid credentials" });
    }
    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
}

const registerUser = async(req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    //check if user exist or not
    const exists = await userModel.findOne({ email });
    if(exists) {
      return res.json({ success: false, message: "user already exists"})
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      phone,
      password: hashedPassword
    })

    const save = await newUser.save()

    const token = createToken(save._id)

    const VerifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`

    const verifyEmail = await sendEmail({
      sendTo: email,
      subject: "Verification email from Lenskart2.0",
      html: verifyEmailTemplate ({
        name,
        url: VerifyEmailUrl
      })
    })

    return res.json({ 
      message: "User Registration Successfull",
      error: false,
      success: true,
      token 
    })
    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
}

const verifyEmailController = async(req, res) => {
  try {
    const { code } = req.body

    const user = await userModel.findOne({ _id: code })

    if(!user) {
      return res.status.json({
        message: "Invalid Code",
        error: true,
        success: false
      })
    }

    const updateUser = await userModel.updateOne({ _id: code }, {
      verify_email: true
    })

    return res.json({
      message : "Email verification done",
      success : true,
      error : false
    })

  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    })
  }
}

const adminLogin = async(req, res) => {
  try {
    const { email, password } = req.body;

    if( email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD ) {
      const token = jwt.sign(email+password, process.env.JWT_SECRET);
      res.json({ success: true, token })
    } else {
      res.json({ success: false, message: "Invalid credentials" })
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
}

const forgotPasswordController = async(req, res) => {
  try {
    const { email } = req.body
    const user = await userModel.findOne({ email })

    if(!user) {
      return res.status(400).json({
        message: "Email does not exist",
        error: true,
        success: false
      })
    }

    const otp = generateotp()
    const expireTime = new Date(Date.now() + 60 * 60 * 1000);  //1hr

    const update = await userModel.findByIdAndUpdate(user._id, {
      forgot_password_otp: otp,
      forgot_password_expiry: new Date(expireTime).toISOString()
    })

    await sendEmail({
      sendTo: email,
      subject: "Forgot Password - Lenskart2.0",
      html: forgotPasswordTemplate({
        name: user.name,
        otp: otp
      })
    })

    return res.json({
      message: "Check your email for the OTP",
      error: false,
      success: true
    })

  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    })
  }
} 

const verifyForgotPasswordOtp = async(req, res) => {
  try {
    const { email, otp } = req.body

    if(!email || !otp) {
      return res.status(400).json({
        message: "Provide required fields email, otp",
        error: true,
        success : false
      })
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    if (user.forgot_password_otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
        error: true,
        success: false,
      });
    }

    const currentTime = new Date()
    const otpExpiryTime = new Date(user.forgot_password_expiry);

    if (otpExpiryTime < currentTime) {
      return res.status(400).json({
        message: "OTP has expired",
        error: true,
        success: false,
      });
    }

    const updateUser = await userModel.findByIdAndUpdate(user?._id, {
      forgot_password_otp: "",
      forgot_password_expiry: ""
    })

    return res.json({
      message: "OTP verification successfull",
      error: false,
      success: true
    })

  } catch (error) {
    return response.status(500).json({
      message : error.message || error,
      error : true,
      success : false
    })
  }
}

const resetPassword = async(req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body

    if(!email || !newPassword) {
      return res.status(400).json({
        message : "provide required fields email, newPassword, confirmPassword"
      })
    }

    const user = await userModel.findOne({ email })

    if(!user) {
      return res.status(400).json({
        message : "Email is not available",
        error : true,
        success : false
      })
    }

    if(newPassword !== confirmPassword) {
      return res.status(400).json({
        message : "newPassword and confirmPassword must be same.",
        error : true,
        success : false,
      })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)

    const update = await userModel.findOneAndUpdate(user._id, {
      password: hashedPassword
    })

    return res.json({
      message: "Password updated successfully.",
      error: false,
      success: true
    })

  } catch (error) {
    return res.status(500).json({
      message : error.message || error,
      error : true,
      success : false
    })
  }
}

export { loginUser, registerUser, adminLogin, verifyEmailController, forgotPasswordController, verifyForgotPasswordOtp, resetPassword }