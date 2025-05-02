import axios from "axios";
import Cookies from "js-cookie";

const URL = "https://backend.shubhexchange.com";
// const URL = "https://test-backend.shubhexchange.com";

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
};

export const fn_cashoutCalculation = async (data: any[], currentOdds: any[]) => {
    if (!data || data.length === 0) {
        console.log("Give correct bet");
        return;
    }

    let totalCashout = 0;

    for (const bet of data) {
        const selectionName = bet?.selectionName?.toLowerCase();
        const side = bet?.side?.toLowerCase();
        const stake = Number(bet?.stake);
        const originalOdd = Number(bet?.odd);

        const runnOdd = currentOdds?.find(
            (odds: any) => odds?.nat?.toLowerCase() === selectionName
        );

        if (!runnOdd) {
            console.warn(`No current odds found for selection: ${selectionName}`);
            continue;
        }

        const spottedBet = runnOdd?.odds?.find(
            (o: any) => o?.tno === bet?.tno && o?.otype === side
        );

        if (!spottedBet || !spottedBet?.odds) {
            console.warn(`No matching current odds found for bet:`, bet);
            continue;
        }

        const currentOdd = Number(spottedBet?.odds);
        let cashout = 0;

        if (side === "back") {
            cashout = (stake * currentOdd) / originalOdd;
        } else if (side === "lay") {
            const originalLiability = (originalOdd - 1) * stake;
            const currentLiability = (currentOdd - 1) * stake;
            cashout = originalLiability - currentLiability;
        } else {
            console.warn(`Unknown bet side: ${side}`);
            continue;
        }

        console.log(`Cashout for bet on ${selectionName} (${side}) = ₹${cashout.toFixed(2)}`);
        totalCashout += cashout;
    }

    console.log(`Total Cashout Value: ₹${totalCashout.toFixed(2)}`);
    return totalCashout;
};
