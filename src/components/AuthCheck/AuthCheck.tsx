import Cookies from 'js-cookie';
import React, { ReactNode, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { authenticate } from '../../features/features';
import { AuthCheckApi } from '../../api/api';
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

    useEffect(() => {
        setLoader(true);
        const fn_checkAuth = async () => {
            const response = await AuthCheckApi(token || "");
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
    }, [location.pathname, token, dispatch, navigate]);

    if (loader) {
        return <div className='flex justify-center items-center min-h-[100vh]'><Loader color='var(--main-color)' size={50} /></div>
    }
    return <>{children}</>;
};

export default AuthCheck;
