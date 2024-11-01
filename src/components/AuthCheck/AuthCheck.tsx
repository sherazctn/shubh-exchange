import Cookies from 'js-cookie';
import React, { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { authenticate, updatePanelMainColor, updatePanelSecColor, updateUsername, updateWallet, updateWebsiteColor } from '../../features/features';
import { AuthCheckApi, panelColorApi, webColorApi } from '../../api/api';
import Loader from '../Loader';

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

    useEffect(() => {
        setLoader(true);
        const fn_checkAuth = async () => {
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
                // dispatch(updateDashboardData({
                //     totalBets: response?.data?.totalBets || 0,
                //     winShots: response?.data?.winShots || 0,
                //     lossesShots: response?.data?.lossesShots || 0,
                //     continueBets: response?.data?.continueBets || 0,
                //     totalDeposit: response?.data?.totalDeposit || 0,
                //     totalWithdraw: response?.data?.totalWithdraw || 0,
                //     totalEarning: response?.data?.totalEarning || 0
                // }))
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

    if (loader) {
        return <div className='flex justify-center items-center min-h-[100vh]'><Loader color='black' size={50} /></div>
    }
    return <>{children}</>;
};

export default AuthCheck;
