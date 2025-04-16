import axios from "axios";
import Cookies from "js-cookie";

// const URL = "https://backend.shubhexchange.com";
const URL = "https://test-backend.shubhexchange.com";

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

export const fn_getLiveEventsApi = async (id: any) => {
    try {
        const response = await axios.get(`${URL}/new/in-play?sportId=${id}`);
        return { status: true, data: response?.data };
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
};

export const fn_getExtraMarketsApi = async (id: any) => {
    try {
        const response = await axios.get(`${URL}/new/extra-markets?eventId=${id}`);
        return { status: true, data: response?.data };
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
};

export const fn_getAllEventsBySportApi = async (id: any) => {
    try {
        const response = await axios.get(`${URL}/new/all-events?sportId=${id}`);
        return { status: true, data: response?.data };
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
}