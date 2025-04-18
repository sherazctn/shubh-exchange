import axios from "axios";
import Cookies from "js-cookie";
// import { messaging, getToken } from "../firebase";

const URL = "https://backend.shubhexchange.com";
// const URL = "https://test-backend.shubhexchange.com";

export const fn_calculatingBets = (pendingBets: any) => {
    if (!pendingBets || pendingBets.length === 0) return;
    if (pendingBets.length === 1) {
        const obj = pendingBets[0];
        console.log("single obj ", obj);
        return {
            totalProfit: obj.profit,
            totalExp: obj.exposure,
            profitableRunner: obj.gameId,
            recentObjDetails: obj,
            side: obj.side,
            marketId: obj.marketId
        };
    }

    const profitArray = [] as any[];
    const profitMap: { profit: number; runner: string; side: string }[] = [];

    let sameGameExposure = 0;
    let totalSamePointsExposure = [] as any;
    let samePointsExposure = 0;
    let isSamePointsExposure = false;

    for (let x = 0; x < pendingBets?.length; x++) {
        const runningBet = pendingBets[x];

        const plusPointSameGame = pendingBets?.filter((bet: any) => bet?.gameId == runningBet?.gameId && bet?.side == runningBet?.side);
        const negativePointSameGame = pendingBets?.filter((bet: any) => bet?.gameId == runningBet?.gameId && bet?.side != runningBet?.side);

        const plusPointDiffGame = pendingBets?.filter((bet: any) => bet?.gameId != runningBet?.gameId && bet?.side != runningBet?.side);
        const negativePointDiffGame = pendingBets?.filter((bet: any) => bet?.gameId != runningBet?.gameId && bet?.side == runningBet?.side);

        if (plusPointDiffGame?.length > 0) {
            totalSamePointsExposure.push(plusPointDiffGame?.[0]);
        }

        const addingPlusPointSameGame = plusPointSameGame.reduce((a: any, p: any) => a + p?.profit, 0);
        sameGameExposure = plusPointSameGame.reduce((acc: number, p: any) => acc + (p?.exposure || 0), 0);
        const addingPlusPointDiffGame = plusPointDiffGame.reduce((a: any, p: any) => a + p?.profit, 0);
        const minusNegativePointSameGame = negativePointSameGame.reduce((a: any, p: any) => a + p?.exposure, 0);
        const minusNegativePointDiffGame = negativePointDiffGame.reduce((a: any, p: any) => a + p?.exposure, 0);

        const numbers = [
            addingPlusPointSameGame,
            addingPlusPointDiffGame,
            minusNegativePointSameGame,
            minusNegativePointDiffGame
        ];

        const profit = numbers?.reduce((a, n) => {
            return a + n
        }, 0);
        profitArray.push(profit);

        profitMap.push({
            profit,
            runner: runningBet?.gameId,
            side: runningBet?.side,
        });
    }

    let checkSameBets = false;
    const firstBet = pendingBets?.[0];
    const sameBets = pendingBets?.filter((bet: any) => bet?.gameId == firstBet?.gameId && bet.side == firstBet.side);

    if (sameBets?.length === pendingBets?.length) {
        console.log("same spot bets ");
        checkSameBets = true;
    };

    if (totalSamePointsExposure?.length === pendingBets?.length) {
        console.log("opposite but same");
        isSamePointsExposure = true;
        samePointsExposure = totalSamePointsExposure?.reduce((acc: any, bet: any) => acc + bet?.exposure, 0)
    };

    const totalProfit = Math.max(...profitArray);
    const totalExp = Math.min(...profitArray);

    const maxProfitEntry = profitMap.find((entry) => entry.profit === totalProfit);

    const recentObjDetails = pendingBets[pendingBets.length - 1];

    return {
        totalProfit: Number(totalProfit?.toFixed(2)),
        totalExp: checkSameBets ? Number(sameGameExposure?.toFixed(2)) : isSamePointsExposure ? Number(samePointsExposure?.toFixed(2)) : Number(totalExp.toFixed(2)),
        profitableRunner: maxProfitEntry?.runner, // Runner with the maximum profit
        side: maxProfitEntry?.side, // Side with the maximum profit
        recentObjDetails,
        marketId: recentObjDetails?.marketId,
    };
};

// export const fn_calculatingBets_cricketcasino = (pendingBets: any) => {
//     if (!pendingBets || pendingBets.length === 0) return;
//     if (pendingBets.length === 1) {
//         const obj = pendingBets[0];
//         return {
//             totalProfit: obj.profit,
//             totalExp: obj.exposure,
//             profitableRunner: obj.gameId,
//             recentObjDetails: obj,
//             side: obj.side,
//             marketId: obj.marketId
//         };
//     }

//     const profitArray = [] as any[];
//     const profitMap: { profit: number; runner: string; side: string }[] = [];

//     let sameGameExposure = 0;
//     let totalSamePointsExposure = [] as any;
//     let samePointsExposure = 0;
//     let isSamePointsExposure = false;

//     for (let x = 0; x < pendingBets?.length; x++) {
//         const runningBet = pendingBets[x];

//         const plusPointSameGame = pendingBets?.filter((bet: any) => bet?.gameId?.split("-")?.[0] == runningBet?.gameId?.split("-")?.[0] && bet?.side == runningBet?.side);
//         const negativePointSameGame = pendingBets?.filter((bet: any) => bet?.gameId?.split("-")?.[0] == runningBet?.gameId?.split("-")?.[0] && bet?.side != runningBet?.side);

//         const plusPointDiffGame = pendingBets?.filter((bet: any) => bet?.gameId?.split("-")?.[0] != runningBet?.gameId?.split("-")?.[0] && bet?.side != runningBet?.side);
//         const negativePointDiffGame = pendingBets?.filter((bet: any) => bet?.gameId?.split("-")?.[0] != runningBet?.gameId?.split("-")?.[0] && bet?.side == runningBet?.side);

//         if (plusPointDiffGame?.length > 0) {
//             totalSamePointsExposure.push(plusPointDiffGame?.[0]);
//         }

//         const addingPlusPointSameGame = plusPointSameGame.reduce((a: any, p: any) => a + p?.profit, 0);
//         sameGameExposure = plusPointSameGame.reduce((acc: number, p: any) => acc + (p?.exposure || 0), 0);
//         const addingPlusPointDiffGame = plusPointDiffGame.reduce((a: any, p: any) => a + p?.profit, 0);
//         const minusNegativePointSameGame = negativePointSameGame.reduce((a: any, p: any) => a + p?.exposure, 0);
//         const minusNegativePointDiffGame = negativePointDiffGame.reduce((a: any, p: any) => a + p?.exposure, 0);

//         const numbers = [
//             addingPlusPointSameGame,
//             addingPlusPointDiffGame,
//             minusNegativePointSameGame,
//             minusNegativePointDiffGame
//         ];

//         console.log(numbers)

//         const profit = numbers?.reduce((a, n) => {
//             return a + n
//         }, 0);
//         profitArray.push(profit);

//         profitMap.push({
//             profit,
//             runner: runningBet?.gameId,
//             side: runningBet?.side,
//         });
//     }

//     let checkSameBets = false;
//     const firstBet = pendingBets?.[0];
//     const sameBets = pendingBets?.filter((bet: any) => bet?.gameId?.split("-")?.[0] == firstBet?.gameId?.split("-")?.[0] && bet.side == firstBet.side);
//     console.log("sameBets ", sameBets);
//     if (sameBets?.length === pendingBets?.length) {
//         console.log("same spot bets ");
//         checkSameBets = true;
//     };

//     if (totalSamePointsExposure?.length === pendingBets?.length) {
//         console.log("opposite but same");
//         isSamePointsExposure = true;
//         samePointsExposure = totalSamePointsExposure?.reduce((acc: any, bet: any) => acc + bet?.exposure, 0)
//     };

//     const totalProfit = Math.max(...profitArray);
//     const totalExp = Math.min(...profitArray);

//     const maxProfitEntry = profitMap.find((entry) => entry.profit === totalProfit);

//     const recentObjDetails = pendingBets[pendingBets.length - 1];

//     return {
//         totalProfit: Number(totalProfit?.toFixed(2)),
//         totalExp: checkSameBets ? Number(sameGameExposure?.toFixed(2)) : isSamePointsExposure ? Number(samePointsExposure?.toFixed(2)) : Number(totalExp.toFixed(2)),
//         profitableRunner: maxProfitEntry?.runner, // Runner with the maximum profit
//         side: maxProfitEntry?.side, // Side with the maximum profit
//         recentObjDetails,
//         marketId: recentObjDetails?.marketId,
//     };
// };

export const fancy_calculatingBets = (pendingBets: any) => {
    const allBets = [...(pendingBets || [])];

    if (!allBets || allBets.length === 0) return;

    if (allBets.length === 1) {
        const singleBet = allBets[0];
        return {
            totalProfit: singleBet?.side === "Back" ? ((singleBet?.odd / 100) * singleBet?.stake) : singleBet?.stake,
            totalExp: -(singleBet?.side === "Lay" ? ((singleBet?.odd / 100) * singleBet?.stake) : singleBet?.stake),
            profitableRunner: singleBet.gameId,
            recentObjDetails: singleBet,
            side: singleBet.side,
            marketId: singleBet.marketId,
            marketName: "fancy"
        };
    };

    // if (allBets.length === 2) {
    //     const bet1 = allBets[0];
    //     const bet2 = allBets[1];
    //     if (bet1?.side === bet2?.side) {
    //         return {
    //             totalProfit: bet1?.profit + bet2?.profit,
    //             totalExp: bet1?.exposure + bet2?.exposure,
    //             profitableRunner: bet1?.gameId,
    //             recentObjDetails: bet1,
    //             side: bet1?.side,
    //             marketId: bet1?.marketId,
    //             marketName: "fancy"
    //         }
    //     } else {
    //         return {
    //             totalProfit: bet1?.profit > bet2?.profit ? bet1?.profit - bet2?.profit : bet1?.profit <= bet2?.profit ? bet2?.profit - bet1?.profit : 0,
    //             totalExp: bet1?.exposure + bet2?.profit < bet2?.exposure + bet1?.profit ? bet1?.exposure + bet2?.profit : bet2?.exposure + bet1?.profit,
    //             profitableRunner: bet1?.exposure + bet2?.profit > bet2?.exposure + bet1?.profit ? bet2 : bet1,
    //             recentObjDetails: bet1,
    //             side: bet1?.side,
    //             marketId: bet1?.marketId,
    //             marketName: "fancy"
    //         };
    //     }
    // };

    // if (allBets.length === 3) {
    //     const layBet = allBets?.find((bet) => bet?.side === "Lay");
    //     const backBet = allBets?.find((bet) => bet?.side === "Back");
    //     let sameBets = "";
    //     if (layBet && !backBet) {
    //         sameBets = "Lay";
    //     } else if (backBet && !layBet) {
    //         sameBets = "Back";
    //     } else {
    //         sameBets = "";
    //     };
    //     if (sameBets === "Lay" || sameBets === "Back") {
    //         const totalExp = allBets?.reduce((acc, i) => acc + i?.exposure, 0);
    //         const totalProfit = allBets?.reduce((acc, i) => acc + i?.profit, 0);
    //         return {
    //             totalProfit: totalProfit,
    //             totalExp: totalExp,
    //             profitableRunner: layBet?.gameId || backBet?.gameId,
    //             recentObjDetails: layBet || backBet,
    //             side: layBet?.side || backBet?.side,
    //             marketId: layBet?.marketId || backBet?.marketId,
    //             marketName: "fancy"
    //         };
    //     } else {
    //         const totalExp = allBets?.reduce((acc, i) => acc + i?.exposure, 0);
    //         const totalProfit = allBets?.reduce((acc, i) => acc + i?.profit, 0);
    //         return {
    //             totalProfit: totalProfit,
    //             totalExp: totalExp,
    //             profitableRunner: layBet?.gameId || backBet?.gameId,
    //             recentObjDetails: layBet || backBet,
    //             side: layBet?.side || backBet?.side,
    //             marketId: layBet?.marketId || backBet?.marketId,
    //             marketName: "fancy"
    //         };
    //     }
    // };

    const totalExp = allBets?.reduce((acc, i) => acc + i?.exposure, 0);
    const totalProfit = allBets?.reduce((acc, i) => acc + i?.profit, 0);
    return {
        totalProfit: totalProfit,
        totalExp: totalExp,
        profitableRunner: allBets?.[0]?.gameId,
        recentObjDetails: allBets?.[0],
        side: allBets?.[0]?.side,
        marketId: allBets?.[0]?.marketId,
        marketName: "fancy"
    };
};

export const marketOddsFormulation = (obj: any, pendingBets: any) => {
    const allBets = [...(pendingBets || []), obj];

    if (!allBets || allBets.length === 0) return;

    if (allBets.length === 1) {
        const singleBet = allBets[0];
        return {
            totalProfit: singleBet.profit,
            totalExp: singleBet.exposure,
            profitableRunner: singleBet.gameId,
            recentObjDetails: singleBet,
            side: singleBet.side,
            marketId: singleBet.marketId,
        };
    }

    const profitArray = [] as number[];
    const profitMap: { profit: number; runner: string; side: string }[] = [];

    let sameGameExposure = 0;
    let totalSamePointsExposure = [] as any;
    let samePointsExposure = 0;
    let isSamePointsExposure = false;

    for (let x = 0; x < allBets?.length; x++) {
        const runningBet = allBets[x];

        const plusPointSameGame = allBets?.filter((bet: any) => bet?.gameId == runningBet?.gameId && bet?.side == runningBet?.side);
        const negativePointSameGame = allBets?.filter((bet: any) => bet?.gameId == runningBet?.gameId && bet?.side != runningBet?.side);

        const plusPointDiffGame = allBets?.filter((bet: any) => bet?.gameId != runningBet?.gameId && bet?.side != runningBet?.side);
        const negativePointDiffGame = allBets?.filter((bet: any) => bet?.gameId != runningBet?.gameId && bet?.side == runningBet?.side);

        if (plusPointDiffGame?.length > 0) {
            totalSamePointsExposure.push(plusPointDiffGame?.[0]);
        }

        const addingPlusPointSameGame = plusPointSameGame.reduce((a: any, p: any) => a + p?.profit, 0);
        sameGameExposure = plusPointSameGame.reduce((acc: number, p: any) => acc + (p?.exposure || 0), 0);
        const addingPlusPointDiffGame = plusPointDiffGame.reduce((a: any, p: any) => a + p?.profit, 0);
        const minusNegativePointSameGame = negativePointSameGame.reduce((a: any, p: any) => a + p?.exposure, 0);
        const minusNegativePointDiffGame = negativePointDiffGame.reduce((a: any, p: any) => a + p?.exposure, 0);

        const numbers = [
            addingPlusPointSameGame,
            addingPlusPointDiffGame,
            minusNegativePointSameGame,
            minusNegativePointDiffGame
        ];

        const profit = numbers?.reduce((a, n) => {
            return a + n
        }, 0);
        profitArray.push(profit);

        profitMap.push({
            profit,
            runner: runningBet?.gameId,
            side: runningBet?.side,
        });
    };

    let checkSameBets = false;
    const firstBet = allBets?.[0];
    const sameBets = allBets?.filter((bet: any) => bet?.gameId == firstBet?.gameId && bet.side == firstBet.side);

    if (sameBets?.length === allBets?.length) {
        console.log("same spot bets ");
        checkSameBets = true;
    };

    if (totalSamePointsExposure?.length === allBets?.length) {
        console.log("opposite but same");
        isSamePointsExposure = true;
        samePointsExposure = totalSamePointsExposure?.reduce((acc: any, bet: any) => acc + bet?.exposure, 0)
    };

    const totalProfit = Math.max(...profitArray);
    const totalExp = Math.min(...profitArray);

    const maxProfitEntry = profitMap.find((entry) => entry.profit === totalProfit);

    const recentObjDetails = obj;
    return {
        totalProfit: Number(totalProfit.toFixed(2)),
        totalExp: checkSameBets ? Number(sameGameExposure?.toFixed(2)) : isSamePointsExposure ? Number(samePointsExposure?.toFixed(2)) : Number(totalExp.toFixed(2)),
        profitableRunner: maxProfitEntry?.runner,
        side: maxProfitEntry?.side,
        recentObjDetails,
        marketId: obj?.marketId,
        marketName: obj?.marketName
    };
};

export const fancy_marketOddsFormulation = (obj: any, pendingBets: any) => {
    const allBets = [...(pendingBets || []), obj];

    console.log("bets length ==> ", allBets?.length);

    if (!allBets || allBets.length === 0) return;

    if (allBets.length === 1) {
        const singleBet = allBets[0];
        return {
            totalProfit: singleBet?.side === "Back" ? ((singleBet?.odd / 100) * singleBet?.stake) : singleBet?.stake,
            totalExp: -(singleBet?.side === "Lay" ? ((singleBet?.odd / 100) * singleBet?.stake) : singleBet?.stake),
            profitableRunner: singleBet.gameId,
            recentObjDetails: singleBet,
            side: singleBet.side,
            marketId: singleBet.marketId,
            marketName: "fancy"
        };
    };

    // if (allBets.length === 2) {
    //     const bet1 = allBets[0];
    //     const bet2 = allBets[1];
    //     if (bet1?.side === bet2?.side) {
    //         return {
    //             totalProfit: bet1?.profit + bet2?.profit,
    //             totalExp: bet1?.exposure + bet2?.exposure,
    //             profitableRunner: bet1?.gameId,
    //             recentObjDetails: obj,
    //             side: obj?.side,
    //             marketId: obj?.marketId,
    //             marketName: "fancy"
    //         }
    //     } else {
    //         return {
    //             totalProfit: bet1?.profit > bet2?.profit ? bet1?.profit - bet2?.profit : bet1?.profit <= bet2?.profit ? bet2?.profit - bet1?.profit : 0,
    //             totalExp: bet1?.exposure + bet2?.profit < bet2?.exposure + bet1?.profit ? bet1?.exposure + bet2?.profit : bet2?.exposure + bet1?.profit,
    //             profitableRunner: bet1?.exposure + bet2?.profit > bet2?.exposure + bet1?.profit ? bet2 : bet1,
    //             recentObjDetails: obj,
    //             side: obj?.side,
    //             marketId: obj?.marketId,
    //             marketName: "fancy"
    //         };
    //     }
    // };

    // if (allBets.length === 3) {
    //     const layBet = allBets?.find((bet) => bet?.side === "Lay");
    //     const backBet = allBets?.find((bet) => bet?.side === "Back");
    //     let sameBets = "";
    //     if (layBet && !backBet) {
    //         sameBets = "Lay";
    //     } else if (backBet && !layBet) {
    //         sameBets = "Back";
    //     } else {
    //         sameBets = "";
    //     };
    //     if (sameBets === "Lay" || sameBets === "Back") {
    //         const totalExp = allBets?.reduce((acc, i) => acc + i?.exposure, 0);
    //         const totalProfit = allBets?.reduce((acc, i) => acc + i?.profit, 0);
    //         return {
    //             totalProfit: totalProfit,
    //             totalExp: totalExp,
    //             profitableRunner: obj?.gameId,
    //             recentObjDetails: obj,
    //             side: obj?.side,
    //             marketId: obj?.marketId,
    //             marketName: "fancy"
    //         };
    //     } else {
    //         const totalExp = allBets?.reduce((acc, i) => acc + i?.exposure, 0);
    //         const totalProfit = allBets?.reduce((acc, i) => acc + i?.profit, 0);
    //         return {
    //             totalProfit: totalProfit,
    //             totalExp: totalExp,
    //             profitableRunner: obj?.gameId,
    //             recentObjDetails: obj,
    //             side: obj?.side,
    //             marketId: obj?.marketId,
    //             marketName: "fancy"
    //         };
    //     }
    // };

    const totalExp = allBets?.reduce((acc, i) => acc + i?.exposure, 0);
    const totalProfit = allBets?.reduce((acc, i) => acc + i?.profit, 0);
    return {
        totalProfit: totalProfit,
        totalExp: totalExp,
        profitableRunner: obj?.gameId,
        recentObjDetails: obj,
        side: obj?.side,
        marketId: obj?.marketId,
        marketName: "fancy"
    };
};

export const fn_fancyModalCalculation = async (data: any[]) => {
    if (!data || data.length === 0) return null;
    // if one record is coming
    if (data.length === 1) {
        const singleObj = data[0];
        const scoreObj = singleObj.side === "Lay"
            ? [
                { score: singleObj.score - 1, profit: singleObj.stake },
                { score: singleObj.score, profit: singleObj.exposure }
            ]
            : [
                { score: singleObj.score - 1, profit: singleObj.exposure },
                { score: singleObj.score, profit: singleObj.stake }
            ];
        return scoreObj;
    }

    const laysData = data.filter((d) => d.side === "Lay");
    const backData = data.filter((d) => d.side === "Back");

    const minScore = Math.min(...data.map((d) => d.score));
    const maxScore = Math.max(...data.map((d) => d.score));

    // if same side and same score are coming
    // if (backData.length === data.length) {
    //     if (maxScore === minScore) {
    //         return [
    //             {
    //                 score: maxScore - 1,
    //                 profit: backData.reduce((acc, d) => acc + d.exposure, 0),
    //             },
    //             {
    //                 score: maxScore,
    //                 profit: backData.reduce((acc, d) => acc + d.profit, 0),
    //             },
    //         ];
    //     };
    //     const newData = [];
    //     for (let i = minScore - 1; i <= maxScore; i++) {
    //         const addProfit = data?.filter((d: any) => i >= d?.score);
    //         const subtractProfit = data?.filter((d: any) => i < d?.score);
    //         const addProfitValue = addProfit?.reduce((acc: any, d: any) => acc + d?.profit, 0) || 0;
    //         const subtractProfitValue = subtractProfit?.reduce((acc: any, d: any) => acc + d?.exposure, 0) || 0;
    //         const obj = {
    //             score: i,
    //             profit: addProfitValue + subtractProfitValue
    //         };
    //         newData.push(obj);
    //     };
    //     return newData;
    // };
    // if (laysData.length === data.length) {
    //     if (maxScore === minScore) {
    //         return [
    //             {
    //                 score: maxScore - 1,
    //                 profit: laysData.reduce((acc, d) => acc + d.profit, 0),
    //             },
    //             {
    //                 score: maxScore,
    //                 profit: laysData.reduce((acc, d) => acc + d.exposure, 0),
    //             },
    //         ];
    //     }
    //     const newData = [];
    //     for (let i = minScore - 1; i <= maxScore; i++) {
    //         const addProfit = data?.filter((d: any) => i < d?.score);
    //         const subtractProfit = data?.filter((d: any) => i >= d?.score);
    //         const addProfitValue = addProfit?.reduce((acc: any, d: any) => acc + d?.profit, 0) || 0;
    //         const subtractProfitValue = subtractProfit?.reduce((acc: any, d: any) => acc + d?.exposure, 0) || 0;
    //         const obj = {
    //             score: i,
    //             profit: addProfitValue + subtractProfitValue
    //         };
    //         newData.push(obj);
    //     };
    //     return newData;
    // };

    // if multiple objs are those have different sides
    const newData = [];
    for (let i = minScore - 1; i <= maxScore; i++) {
        const obj = { score: i, profit: 0 };
        for (let singleBetIndex = 0; singleBetIndex < data?.length; singleBetIndex++) {
            const singleBet = data[singleBetIndex];
            if (singleBet?.side === "Lay" && singleBet?.score > i) {
                obj.profit = obj.profit + singleBet?.profit;
            } else if (singleBet?.side === "Back" && singleBet?.score > i) {
                obj.profit = obj.profit + singleBet?.exposure;
            } else if (singleBet?.side === "Lay" && singleBet?.score <= i) {
                obj.profit = obj.profit + singleBet?.exposure;
            } else if (singleBet?.side === "Back" && singleBet?.score <= i) {
                obj.profit = obj.profit + singleBet?.profit;
            }
        };
        newData.push(obj);
    };
    return newData;
};

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
        // const fcmToken = await getToken(messaging, { vapidKey: "BDejpOAWOM3yEwFQ9LbqQTpbG8SvOnaMGmNq6nwYISbSD7lhh99aKePX9HVRKg-aREsls8nNRpeHMyETF3cryyQ" });
        // if (fcmToken) {
        //     Cookies.set('userFcmToken', fcmToken);
        // }
        // const response = await axios.post(`${URL}/user`, { ...data, fcmToken: fcmToken || "" });
        const response = await axios.post(`${URL}/user`, data);
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
        // const fcmToken = await getToken(messaging, { vapidKey: "BDejpOAWOM3yEwFQ9LbqQTpbG8SvOnaMGmNq6nwYISbSD7lhh99aKePX9HVRKg-aREsls8nNRpeHMyETF3cryyQ" });
        // if (fcmToken) {
        //     Cookies.set('userFcmToken', fcmToken);
        // }
        // const response = await axios.post(`${URL}/user/login`, { ...data, fcmToken: fcmToken || "" });
        const response = await axios.post(`${URL}/user/login`, data);
        if (response?.status === 200) {
            if (!response?.data?.firstTime) {
                Cookies.set('token', response?.data?.token);
                return { status: true, message: "User Logged In Successfully", data: response?.data?.data, firstTime: response?.data?.firstTime };
            } else {
                return { status: true, message: "User Verified", firstTime: response?.data?.firstTime, id: response?.data?.id };
            }
        }
    } catch (error: any) {
        if (error?.status === 401) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
};

export const fn_getBonusesApi = async () => {
    try {
        const token = Cookies.get('token');
        const response = await axios.get(`${URL}/bonus/user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        if (response?.status === 200) {
            return { status: true, data: response?.data }
        }
    } catch (error: any) {
        if (error?.status === 400) {
            return { status: false, message: error?.response?.data?.message };
        } else {
            return { status: false, message: "Network Error" }
        }
    }
};

export const fn_updatePasswordApi = async (data: any) => {
    try {
        const response = await axios.put(`${URL}/user/updatePassword`, data);
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
};

export const UpdateUserExposureApi = async (exp: any) => {
    try {
        const token = Cookies.get('token');
        await axios.put(`${URL}/user/update`, { exposure: exp }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        return { status: false, message: "Network Error" };
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
            return { status: false, message: error?.response?.data?.message, phone: error?.response?.data?.phone };
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
        const token = Cookies.get('token');
        const response = await axios.get(`${URL}/bank/active`, {
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

export const getBannersApi = async () => {
    try {
        const response = await axios.get(`${URL}/website/banner/website`);
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
        const response = await axios.get(`${URL}/new/games-data`);
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
        const response = await axios.get(`${URL}/new/events-data`);
        return { status: true, data: response?.data }
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