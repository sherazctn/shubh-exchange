import axios from "axios";
import Cookies from "js-cookie";

const URL = "http://62.72.57.126:5000";

export const SignUpApi = async (data: any) => {
    try {
        const response = await axios.post(`${URL}/user`, data);
        if (response?.status === 200) {
            Cookies.set('token', response?.data?.token);
            return { status: true, message: "User Created Successfully" };
        }
    } catch (error: any) {
        if (error?.status === 409) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
}

export const SignInApi = async (data: any) => {
    try {
        const response = await axios.post(`${URL}/user/login`, data);
        if (response?.status === 200) {
            Cookies.set('token', response?.data?.token);
            return { status: true, message: "User Logged In Successfully" };
        }
    } catch (error: any) {
        if (error?.status === 401) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
}

export const AuthCheckApi = async (token: string) => {
    try {
        const response = await axios.post(`${URL}/user/check`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response;
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
}