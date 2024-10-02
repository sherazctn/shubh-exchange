import axios from "axios";

const URL = "http://localhost:8000";

export const SignUpApi = async (data: any) => {
    try {
        const response = await axios.post(`${URL}/user`, data);
        if (response?.status === 200) {
            return { status: true, message: "User Created Successfully" };
        }
    } catch (error: any) {
        if (error?.status === 409) {
            return { status: false, message: error?.response?.data?.message };
        }else{
            return { status: false, message: "Network Error" }
        }
    }
}