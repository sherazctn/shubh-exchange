import Cookies from 'js-cookie';
import React, { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { authenticate, updatePanelMainColor, updatePanelSecColor, updateUsername, updateWallet, updateWebsiteColor } from '../../features/features';
import { AuthCheckApi, CheckAdminApi, panelColorApi, webColorApi } from '../../api/api';
import Loader from '../Loader';

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
    const websiteColor = useSelector((state: any) => state.websiteColor);
    const panelMainColor = useSelector((state: any) => state.panelMainColor);

    const [blockWebsite, setBlockWebsite] = useState(false);

    const adminId = "671a6ae070daba095fa7e507";

    useEffect(() => {
        setLoader(true);
        const fn_checkAuth = async () => {
            const checkAdmin = await CheckAdminApi(adminId);
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
                dispatch(updateWallet(response?.data?.wallet))
                dispatch(updateUsername(response?.data?.username))
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
