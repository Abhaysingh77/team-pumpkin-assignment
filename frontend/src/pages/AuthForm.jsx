import { useState } from "react";
import { registerUser, sendOtp, verifyOtpAndLogin } from "../services/user.api";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log("Logging in with:", formData.email, formData.otp);
      // Call login API
      verifyOtpAndLogin(formData.email, otp)
        .then((response) => {
          console.log(response);
          localStorage.setItem("userId", response.user._id);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("Registering with:", formData);
      // Call register API
      registerUser(formData)
        .then((response) => {
          setIsLogin(true);
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          {isLogin ? "Login" : "Register"}
        </h2>

        <form onSubmit={handleSubmit} className="mt-4">
          {!isLogin && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 mb-3 border rounded"
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 mb-3 border rounded"
                required
              />
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded"
            required
          />

          {isLogin && (
            <>
              <button
                type="button"
                className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                onClick={() => sendOtp(formData.email)}
              >
                Send OTP
              </button>

              <input
                type="text"
                name="otp"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={handleOtpChange}
                className="w-full p-2 mt-3 mb-3 border rounded"
                required
              />
            </>
          )}

          <button
            type="submit"
            className="w-full p-2 text-white bg-green-500 rounded hover:bg-green-600"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p
          className="mt-4 text-sm text-center text-blue-500 cursor-pointer"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
}
