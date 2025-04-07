import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  phone: {type: String, required: true},
  password: {type: String, required: true},
  cartData: { type: Object, default: {}},
  wishlistData: { type: Object, default: {} },
  verify_email: {
    type: Boolean,
    default: false
  },
  last_login_date: {
    type: Date,
    default: ""
  },
  forgot_password_otp : {
    type: String,
    default: null
  },
  forgot_password_expiry: {
    type: Date,
    default: ""
  },
  role: {
    type: String,
    enum: ['ADMIN', 'USER'],
    default: 'USER'
  }

}, {timestamps: true, minimize: false})

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;