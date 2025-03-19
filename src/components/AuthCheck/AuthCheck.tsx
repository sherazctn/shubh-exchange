import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { ReactNode, useEffect, useState } from 'react';

import Loader from '../Loader';
import { AuthCheckApi, CheckAdminApi, fancy_calculatingBets, fn_calculatingBets, getOpenBetsByUserApi, panelColorApi, UpdateUserExposureApi, webColorApi } from '../../api/api';
import { authenticate, updateBookmakerRate, updateExposure, updateFancyRate, updateOddRate, updatePanelMainColor, updatePanelSecColor, updatePendingBets, updateSportPermission, updateUser, updateUsername, updateWallet, updateWebsiteColor, updateWhatsappPhone } from '../../features/features';

import img from "../../assets/block-website.png";
import { FaExclamationTriangle } from 'react-icons/fa';

interface AuthCheckProps {
    children: ReactNode;
}

const AuthCheck: React.FC<AuthCheckProps> = ({ children }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const token = Cookies.get('token');
    const [loader, setLoader] = useState(true);
    const [blockWebsite, setBlockWebsite] = useState(false);
    const pendingBets = useSelector((state: any) => state.pendingBets);
    const websiteColor = useSelector((state: any) => state.websiteColor);
    const panelMainColor = useSelector((state: any) => state.panelMainColor);

    useEffect(() => {
        const fn_pendingBets = async () => {
            if (pendingBets?.length > 0) {
                const groupedBets: { [key: string]: any[] } = {};

                pendingBets.forEach((bet: any) => {
                    let key = bet.marketId;

                    if (bet.marketId.includes("-") && bet?.marketName !== "fancy") {
                        key = bet.marketId.split("-")[0];
                    }

                    if (!groupedBets[key]) {
                        groupedBets[key] = [];
                    }

                    groupedBets[key].push(bet);
                });

                let totalExpSum = 0;
                Object.values(groupedBets).forEach((group) => {
                    if (group?.[0]?.marketName !== "fancy") {
                        const result = fn_calculatingBets(group);
                        if (result?.totalExp) {
                            totalExpSum += result.totalExp;
                        }
                    } else {
                        const result = fancy_calculatingBets(group);
                        if (result?.totalExp) {
                            totalExpSum += result.totalExp;
                        }
                    }
                });
                console.log("totalExpSum ==> ", totalExpSum);
                dispatch(updateExposure(totalExpSum));
                await UpdateUserExposureApi(totalExpSum);
            }
        };
        fn_pendingBets();
    }, [pendingBets]);

    useEffect(() => {
        const currentURL = window.location.href;

        if (currentURL.includes('www.')) {
            const newURL = currentURL.replace('www.', '');
            window.location.href = newURL;
        }
    }, []);

    const fn_checkAuth = async () => {
        const checkAdmin = await CheckAdminApi();
        if (!checkAdmin?.status) {
            setLoader(false);
            setBlockWebsite(true);
        }
        const response: any = await AuthCheckApi(token || "");
        if (websiteColor === "") {
            const colorResponse = await webColorApi();
            if (colorResponse?.status) {
                dispatch(updateWebsiteColor(colorResponse?.data[0].color));
            } else {
                dispatch(updateWebsiteColor("#ff4444"));
            }
        }
        if (panelMainColor === "") {
            const panelColorResponse = await panelColorApi();
            if (panelColorResponse?.status) {
                dispatch(updatePanelMainColor(panelColorResponse?.data[0].mainColor));
                dispatch(updatePanelSecColor(panelColorResponse?.data[0].secColor));
            } else {
                dispatch(updatePanelMainColor("rgb(232, 232, 252)"));
                dispatch(updatePanelSecColor("rgb(61, 61, 158)"));
            }
        }
        dispatch(authenticate(response.status ? true : false));
        if (response?.status) {
            dispatch(updateUser(response?.data?.user))
            dispatch(updateWallet(response?.data?.wallet))
            dispatch(updateExposure(response?.data?.exposure || 0))
            dispatch(updateUsername(response?.data?.username))
            dispatch(updateWhatsappPhone(response?.data?.phone || null));
            dispatch(updateSportPermission(response?.data?.user?.sportPermission || {}));
            dispatch(updateOddRate({ value: response?.data?.user?.oddRate || 0, type: response?.data?.user?.oddRateType || "percentage" }));
            dispatch(updateBookmakerRate({ value: response?.data?.user?.bookmakerRate || 0, type: response?.data?.user?.bookmakerRateType || "percentage" }));
            dispatch(updateFancyRate({ value: response?.data?.user?.fancyRate || 0, type: response?.data?.user?.fancyRateType || "number" }));
            const res = await getOpenBetsByUserApi(token);
            if (res?.status) {
                dispatch(updatePendingBets(res?.data));
            }
        } else {
            dispatch(updateWhatsappPhone(response?.phone || null));
        }
        if (location.pathname.includes("/account")) {
            if (response?.status) {
                setLoader(false);
            } else {
                navigate("/");
            }
        } else {
            setLoader(false);
        }
    }

    useEffect(() => {
        setLoader(true);
        fn_checkAuth();
    }, [location.pathname, token, dispatch, navigate, websiteColor, panelMainColor]);

    if (blockWebsite) {
        return <div className='flex flex-col justify-center items-center min-h-[100vh] gap-[20px]'>
            <img alt='' src={img} className='w-[300px] lg:w-[500px]' />
            <p className='text-[22px] lg:text-[35px] font-[700] text-center'>
                <FaExclamationTriangle className='inline-block text-[32px] md:text-[42px] me-[8px] sm:me-[15px] mt-[-10px] text-[#e00429]' />
                <span className='text-[#2016de]'>This Website is Blocked</span>
            </p>
        </div>
    }
    if (loader) {
        return <div className='flex justify-center items-center min-h-[100vh]'><Loader color='black' size={50} /></div>
    }
    return <>{children}</>;
};

export default AuthCheck;
