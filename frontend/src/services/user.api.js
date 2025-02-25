import axios from "axios";

// const url = "https://team-pumpkin-assignment.onrender.com/api";
const url = "http://localhost:8080/api"


export const getAllUsers = async (token) => {
  try {
    const response = await axios.get(`${url}/users/all`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error.response?.data || error.message);
    return error.response?.data || { message: "Failed to fetch users" };
  }
};

export const registerUser = async (user) => {
  try {
    const response = await axios.post(`${url}/auth/register`, user);
    return response.data;
  } catch (error) {
    console.log(error)
    console.error("Registration error:", error.response?.data || error.message);
    return error.response?.data?.message || { message: "Registration failed" };
  }
};

export const sendOtp = async (email) => {
  try {
    const response = await axios.post(`${url}/auth/login/send-otp`, { email });
    return response.data;
  } catch (error) {
    console.error("Send OTP error:", error.response?.data || error.message);
    return error.response?.data || { message: "Failed to send OTP" };
  }
};

export const verifyOtpAndLogin = async (email, otp) => {
  try {
    const response = await axios.post(`${url}/auth/login/verify-otp`, { email, otp });
    return response.data;
  } catch (error) {
    console.error("OTP verification error:", error.response?.data || error.message);
    return error.response?.data || { message: "OTP verification failed" };
  }
};
