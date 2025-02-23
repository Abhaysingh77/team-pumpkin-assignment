import axios from 'axios';
const url = 'http://localhost:8080/api'

export const getAllUsers = async () => {
    try {
        const response = await axios.get(`${url}/users/all`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        return error
    }
}

export const registerUser = async (user) => {
    try {
        const response = await axios.post(`${url}/auth/register`, user);
        return response.data;
    } catch (error) {
        return error
    }
}

export const sendOtp = async (email) => {
    try {
        const response = await axios.post(`${url}/auth/login/send-otp`, { email });
        return response.data;
    } catch (error) {
        return error
    }
}

export const verifyOtpAndLogin = async (email, otp) => {
    try {
        const response = await axios.post(`${url}/auth/login/verify-otp`, { email, otp });
        return response.data;
    } catch (error) {
        return error
    }
}