import axios from "axios";
import Cookies from "js-cookie";
import { messaging, getToken } from "../firebase";

const URL = "https://backend.shubhexchange.com";
// const URL = "http://62.72.57.126:8001";


export const formatDate = (dateString: any) => {
    const optionsDate: any = { day: '2-digit', month: 'short', year: 'numeric' };
    const optionsTime: any = { hour: '2-digit', minute: '2-digit', hour12: true };
    const date = new Date(dateString);

    const formattedDate = date.toLocaleDateString('en-US', optionsDate);
    const formattedTime = date.toLocaleTimeString('en-US', optionsTime);

    return `${formattedDate}, ${formattedTime}`;
};

export const CheckAdminApi = async () => {
    try {
        const response = await axios.get(`${URL}/user/check-admin`);
        if (response?.status === 200) {
            return { status: true };
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
};

export const SignUpApi = async (data: any) => {
    try {
        const fcmToken = await getToken(messaging, { vapidKey: "BDejpOAWOM3yEwFQ9LbqQTpbG8SvOnaMGmNq6nwYISbSD7lhh99aKePX9HVRKg-aREsls8nNRpeHMyETF3cryyQ" });
        Cookies.set('userFcmToken', fcmToken);
        const response = await axios.post(`${URL}/user`, { ...data, fcmToken });
        if (response?.status === 200) {
            Cookies.set('token', response?.data?.token);
            return { status: true, message: "User Created Successfully", data: response?.data?.data };
        }
    } catch (error: any) {
        if (error?.status === 409) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
};

export const SignInApi = async (data: any) => {
    try {
        const fcmToken = await getToken(messaging, { vapidKey: "BDejpOAWOM3yEwFQ9LbqQTpbG8SvOnaMGmNq6nwYISbSD7lhh99aKePX9HVRKg-aREsls8nNRpeHMyETF3cryyQ" });
        Cookies.set('userFcmToken', fcmToken);
        const response = await axios.post(`${URL}/user/login`, { ...data, fcmToken });
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
        console.log("response ", response);
        return response;
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

export const getOpenBetsByUserApi = async (savedToken: any) => {
    try {
        const token = savedToken || Cookies.get('token');
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

export const getUserDataForDashboard = async (token: string) => {
    try {
        const response = await axios.get(`${URL}/user/dashboard-data`, {
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

export const getBetsByUserApi = async (savedToken: any) => {
    try {
        const token = savedToken || Cookies.get('token');
        const response = await axios.get(`${URL}/bet/user`, {
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

export const getUserAmountForApprovalApi = async (savedToken: string) => {
    try {
        const token = savedToken || Cookies.get('token');
        const response = await axios.get(`${URL}/user/approval-amount`, {
            headers: {
                Authorization: `Bearer ${token}`,
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

export const createDepositApi = async (data: any) => {
    try {
        const token = Cookies.get('token');
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

export const getAllBanksApi = async () => {
    try {
        const response = await axios.get(`${URL}/bank/active`);
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

export const getUserDepositApi = async () => {
    try {
        const token = Cookies.get('token');
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
        const token = Cookies.get('token');
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

export const getUserDetailsApi = async (savedToken: string) => {
    try {
        const token = savedToken || Cookies.get('token');
        const response = await axios.get(`${URL}/user/login-details`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
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

export const webLogoApi = async () => {
    try {
        const response = await axios.get(`${URL}/website/logo`);
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
        const token = Cookies.get('token');
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
        const token = Cookies.get('token');
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

export const createWithdrawApi = async (data: any) => {
    try {
        const token = Cookies.get('token');
        const response = await axios.post(`${URL}/withdraw`, data, {
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

// ============================================================ extras

export const getSoccerMatchesApi = async () => {
    try {
        const response = await axios.get(`${URL}/redis/soccer-data`);
        if (response.status === 200) {
            return { status: true, data: response?.data }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
}

export const getSoccerUpcomingMatchesApi = async () => {
    try {
        const response = await axios.get(`${URL}/redis/soccer-data/upcoming`);
        if (response.status === 200) {
            return { status: true, data: response?.data }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
}

// ============== redis ================

export const retrieveGamesDataToRedisApi = async () => {
    try {
        const response = await axios.post(`${URL}/redis/games-data`);
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

export const retrieveSoccerDataToRedisApi = async () => {
    try {
        const response = await axios.post(`${URL}/redis/soccer-data`);
        if (response.status === 200) {
            return { status: true, live: response?.data?.live, upcoming: response?.data?.upcoming }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
}

export const retrieveCricketDataToRedisApi = async () => {
    try {
        const response = await axios.post(`${URL}/redis/cricket-data`);
        if (response.status === 200) {
            return { status: true, live: response?.data?.live, upcoming: response?.data?.upcoming }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
}

export const retrieveEventsDataToRedisApi = async () => {
    try {
        const response = await axios.get(`${URL}/redis/events-data`);
        return { status: true, data: response?.data?.data }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
}

export const retrieveMarketsToRedisApi = async (data: any) => {
    try {
        const response = await axios.post(`${URL}/redis/markets`, data);
        return { status: true, data: response?.data }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
}

export const retrieveUpdatedOddsToRedisApi = async (data: any) => {
    try {
        const marketIds = data.map((id: any) => id).join(",");
        const response = await axios.get(`${URL}/redis/data?market_id=${marketIds}`, data);
        return { status: true, data: response?.data }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
}

export const getSingleMarketOddsApi = async (eventId: any, sportId: any) => {
    try {
        const response = await axios.get(`${URL}/redis/single-market-odds?eventId=${eventId}&sportId=${sportId}`);
        return { status: true, data: response?.data }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
}

export const getMarketOddsApi = async (marketId: any) => {
    try {
        const response = await axios.get(`${URL}/redis/get-single-odd?marketId=${marketId}`);
        return { status: true, data: response?.data?.data };
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
}

export const getLiveMarketsApi = async (id: any) => {
    try {
        const response = await axios.get(`${URL}/redis/live-market?sportId=${id}`);
        return { status: true, data: response?.data };
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
}

export const getInplayMarketsApi = async (id: any) => {
    try {
        const response = await axios.get(`${URL}/redis/inplay-market?sportId=${id}`);
        return { status: true, data: response?.data };
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
}

export const getSingleSportMarketsApi = async (id: any) => {
    try {
        const response = await axios.get(`${URL}/redis/single-sports?sportId=${id}`);
        return { status: true, data: response?.data };
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
}

export const getPopularCricketEventsApi = async () => {
    try {
        const response = await axios.get(`${URL}/redis/popular-events/cricket`);
        return { status: true, data: response?.data };
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
}

export const fn_getCricketScoreApi = async (eventId: string) => {
    try {
        const response = await axios.get(`${URL}/redis/get-cricket-score?eventId=${eventId}`);
        return { status: true, data: response?.data };
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
}

export const getUpdatedBookmaker = async (eventId: any) => {
    try {
        const response = await axios.get(`${URL}/redis/markets-bookmaker?eventId=${eventId}`);
        return { status: true, data: response?.data };
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
};

export const getUpdatedBookmaker2 = async (eventId: any) => {
    try {
        const response = await axios.get(`${URL}/redis/bookmaker-2-eventId?eventId=${eventId}`);
        return { status: true, data: response?.data };
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
};

export const getUpdatedBookmaker3 = async (eventId: any) => {
    try {
        const response = await axios.get(`${URL}/redis/bookmaker-3-eventId?eventId=${eventId}`);
        return { status: true, data: response?.data };
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
};

export const getUpdatedFancyMarket = async (eventId: any) => {
    try {
        const response = await axios.get(`${URL}/redis/markets-fancy?eventId=${eventId}`);
        return { status: true, data: response?.data };
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
};

export const getExtraMarketsByEventIdApi = async (eventId: any) => {
    try {
        const response = await axios.get(`${URL}/redis/get-extra-eventId?eventId=${eventId}`);
        return { status: true, data: response?.data };
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
};

export const updateUserApi = async (data: any) => {
    try {
        const token = Cookies.get('token');
        const response = await axios.put(`${URL}/user/update`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return { status: true, data: response?.data };
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
};

export default URL;