import Cookies from 'js-cookie';
import React, { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { authenticate, updatePanelMainColor, updatePanelSecColor, updateWebsiteColor } from '../../features/features';
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
            const response = await AuthCheckApi(token || "");
            if (websiteColor === "") {
                const colorResponse = await webColorApi();
                dispatch(updateWebsiteColor(colorResponse?.data[0].color));
            }
            if (panelMainColor === "") {
                const panelColorResponse = await panelColorApi();
                dispatch(updatePanelMainColor(panelColorResponse?.data[0].mainColor));
                dispatch(updatePanelSecColor(panelColorResponse?.data[0].secColor));    
            }
            dispatch(authenticate(response.status ? true : false));
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
