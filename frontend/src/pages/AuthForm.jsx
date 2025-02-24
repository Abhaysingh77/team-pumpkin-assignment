import { useState } from "react";
import { registerUser, sendOtp, verifyOtpAndLogin } from "../services/user.api";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [otp, setOtp] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOtpChange = (e) => setOtp(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        enqueueSnackbar("Verifying OTP...", { variant: "info" });
        const res = await verifyOtpAndLogin(formData.email, otp);
        if (res?.token) {
          localStorage.setItem("token", res.token);
          localStorage.setItem("userId", res.user._id);
          enqueueSnackbar("Login Successful!", { variant: "success" });
          navigate("/chat");
        } else {
          enqueueSnackbar(res?.message || "OTP Verification Failed!", { variant: "error" });
        }
      } else {
        enqueueSnackbar("Registering user...", { variant: "info" });
        await registerUser(formData);
        enqueueSnackbar("Registration Successful! Please log in.", { variant: "success" });
        setIsLogin(true);
      }
    } catch (error) {
      enqueueSnackbar("Something went wrong!", { variant: "error" });
      console.error(error);
    }
  };

  const handleSendOtp = async () => {
    try {
      enqueueSnackbar("Sending OTP...", { variant: "info" });
      await sendOtp(formData.email);
      enqueueSnackbar("OTP Sent!", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Failed to send OTP!", { variant: "error" });
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#8BABD8]">
      <div className="relative w-full max-w-md p-12 py-16 bg-white rounded-lg shadow-md">
        <div className="absolute top-1 right-1">
          <img src="/Dotted Shape.png" alt="Decoration" />
        </div>
        <div className="absolute bottom-1 left-1">
          <img src="/Dotted Shape.png" alt="Decoration" />
        </div>
        <div className="w-full flex justify-center">
          <img src="/image 66.png" alt="Logo" />
        </div>
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
                onClick={handleSendOtp}
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
            className="w-full p-2 text-white bg-[#6E80A4] rounded"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
        <p
          className="mt-4 text-sm text-center text-blue-500 cursor-pointer"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
}
