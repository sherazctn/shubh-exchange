import axios from "axios";
import Cookies from "js-cookie";

const URL = "http://62.72.57.126:5000";
const token = Cookies.get('token');

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

export const getAvailableGames = async () => {
    try {
        const response = await axios.get(`${URL}/game/available`);
        if (response?.status === 200) {
            return { status: true, data: response?.data?.data }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
}

export const webNameApi = async () => {
    try {
        const response = await axios.get(`${URL}/website/name`);
        if (response?.status === 200) {
            return { status: true, data: response?.data?.data }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
}

export const webColorApi = async () => {
    try {
        const response = await axios.get(`${URL}/website/website-color/active`);
        if (response?.status === 200) {
            return { status: true, data: response?.data?.data }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
}

export const panelColorApi = async () => {
    try {
        const response = await axios.get(`${URL}/website/color/active`);
        if (response?.status === 200) {
            return { status: true, data: response?.data?.data }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
}

export const getAllBanksApi = async () => {
    try {
        const response = await axios.get(`${URL}/bank/admin`);
        if (response?.status === 200) {
            return { status: true, data: response?.data?.data }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
}

export const createBankApi = async (data: any) => {
    try {
        const response = await axios.post(`${URL}/bank`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            return { status: true, message: "Bank Added " }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
}

export const getUserBankApi = async () => {
    try {
        const response = await axios.get(`${URL}/bank`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            return { status: true, data: response?.data?.data }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
}

export const deleteBankByIdApi = async (id: string) => {
    try {
        const response = await axios.delete(`${URL}/bank/${id}`);
        if (response.status === 200) {
            return { status: true, message: "Bank Deleted" }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
}

export default URL;