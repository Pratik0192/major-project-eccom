import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
import pic from "../assets/login.png";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { Apple } from "lucide-react";
import { ShopContext } from '../context/ShopContext';


const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit, reset } = useForm();

  // API Call Function
  const {backendUrl} = useContext(ShopContext)

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");

    try {
      const endpoint = isLogin ? "/api/user/login" : "/api/user/register";
      const response = await axios.post(backendUrl + endpoint, data);

      console.log("Response:", response.data);

      if (response.data.success) {
        localStorage.setItem("token", response.data.token); // Store token
        alert("Login Successful!");
        reset();
        window.location.href = "/"; // Redirect after login
      } else {
        setError(response.data.message);
      }

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100 px-6 py-2">
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-md -mt-20 border border-gray-100">
          {/* Header */}
          <img src={pic} className="mb-4" />

          {/* Toggle Buttons */}
          <div className="flex justify-between bg-gray-200 rounded-md p-1 mb-6">
            <button
              className={`w-1/2 py-2 text-sm font-medium rounded-md transition ${
                isLogin ? "bg-white shadow ring-1" : "text-gray-500"
              }`}
              onClick={() => { setIsLogin(true); reset(); setError(""); }}
            >
              Login
            </button>
            <button
              className={`w-1/2 py-2 text-sm font-medium rounded-md transition ${
                !isLogin ? "bg-white shadow ring-1" : "text-gray-500"
              }`}
              onClick={() => { setIsLogin(false); reset(); setError(""); }}
            >
              Sign Up
            </button>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* Input Fields */}
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {!isLogin && (
              <>
                <input
                  type="text"
                  {...register("name", { required: !isLogin })}
                  placeholder="Enter your full name"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-900"
                />
                <input
                  type="tel"
                  {...register("phone", { required: !isLogin, pattern: /^[0-9]{10}$/ })}
                  placeholder="Enter your phone number"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-900"
                />
              </>
            )}
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Enter your email"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-900"
            />
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="Enter your password"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-900"
            />

            {isLogin && (
              <div className="text-sm text-right text-blue-900 cursor-pointer">
                Forgot Password?
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-950 text-white py-2 rounded-md font-medium hover:bg-blue-800 cursor-pointer transition"
              disabled={loading}
            >
              {loading ? "Processing..." : isLogin ? "LOGIN" : "SIGN UP"}
            </button>
          </form>

          {/* OR Separator */}
          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="mx-2 text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Social Login Buttons */}
          <button className="w-full flex items-center justify-center space-x-2 border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition">
            <FcGoogle size={20} />
            <span>Continue with Google</span>
          </button>
          <button className="w-full flex items-center justify-center space-x-2 border border-gray-300 py-2 rounded-md mt-2 hover:bg-gray-100 transition">
            <Apple size={20} />
            <span>Continue with Apple</span>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
