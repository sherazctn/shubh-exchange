import axios from "axios";
import Cookies from "js-cookie";

// const URL = "https://backend.shubhexchange.com";
const URL = "http://62.72.57.126:8080";

export const fn_getMarketsApi = async (data: any) => {
    try {
        const response = await axios.get(`${URL}/new/get-markets?eventId=${data?.eventId}&sportId=${data?.sportId}`);
        return { status: true, data: response.data };
    } catch (error: any) {
        console.error("Error fetching markets:", error);
        return { status: false, message: error?.response?.data?.message || "Network Error" };
    }
};

export const fn_getMarketsOddsApi = async (data: any) => {
    try {
        const response = await axios.get(`${URL}/new/bets-data?marketIds=${data}`);
        return { status: true, data: response.data };
    } catch (error: any) {
        console.error("Error fetching markets:", error);
        return { status: false, message: error?.response?.data?.message || "Network Error" };
    }
};