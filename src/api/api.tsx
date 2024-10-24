import axios from "axios";
import Cookies from "js-cookie";

const URL = "http://62.72.57.126:5000";
const token = Cookies.get('token');

export const formatDate = (dateString: any) => {
    const optionsDate: any = { day: '2-digit', month: 'short', year: 'numeric' };
    const optionsTime: any = { hour: '2-digit', minute: '2-digit', hour12: true };
    const date = new Date(dateString);

    const formattedDate = date.toLocaleDateString('en-US', optionsDate);
    const formattedTime = date.toLocaleTimeString('en-US', optionsTime);

    return `${formattedDate}, ${formattedTime}`;
};

export const SignUpApi = async (data: any) => {
    try {
        const admin = localStorage.getItem('adminId')
        const response = await axios.post(`${URL}/user`, { ...data, admin: admin || Cookies.get('token') });
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
        const admin = localStorage.getItem('adminId')
        const response = await axios.post(`${URL}/user/login`, { ...data, admin: admin || Cookies.get('token') });
        if (response?.status === 200) {
            Cookies.set('token', response?.data?.token);
            return { status: true, message: "User Logged In Successfully", data: response?.data?.data };
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
        const admin = localStorage.getItem('adminId')
        const response = await axios.get(`${URL}/bank/active/${admin || Cookies.get('token')}`);
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
            return { status: true, message: "Bank Added ", data: response?.data?.data }
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

export const createDepositApi = async (data: any) => {
    try {
        const admin = localStorage.getItem('adminId')
        const token = Cookies.get('token');
        data.append('admin', admin || Cookies.get('token'));
        const response = await axios.post(`${URL}/deposit`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        if (response.status === 200) {
            return { status: true, message: "Deposited Request Sent Successfully" }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
}

export const createWithdrawApi = async (data: any) => {
    try {
        const admin = localStorage.getItem('adminId')
        const token = Cookies.get('token');
        const response = await axios.post(`${URL}/withdraw`, { ...data, admin }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        if (response.status === 200) {
            return { status: true, message: "Withdraw Request Sent Successfully" }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
}

export const getUserDepositApi = async () => {
    try {
        const response = await axios.get(`${URL}/deposit/user`, {
            headers: {
                Authorization: `Bearer ${token}`,
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

export const getUserWithdrawApi = async () => {
    try {
        const response = await axios.get(`${URL}/withdraw/user`, {
            headers: {
                Authorization: `Bearer ${token}`,
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

export const placeBetsApi = async (data: any) => {
    try {
        const token = Cookies.get('token');
        const response = await axios.post(`${URL}/bet`, { bets: data }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        if (response.status === 200) {
            return { status: true, message: "Bets Placed", wallet: response?.data?.wallet }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
}

export const getOpenBetsByUserApi = async () => {
    try {
        const token = Cookies.get('token');
        const response = await axios.get(`${URL}/bet/user/open`, {
            headers: {
                Authorization: `Bearer ${token}`,
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

export default URL;