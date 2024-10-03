import Cookies from 'js-cookie';
import React, { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { authenticate } from '../../features/features';

interface AuthCheckProps {
    children: ReactNode;
}

const AuthCheck: React.FC<AuthCheckProps> = ({ children }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const token = Cookies.get('token');

    useEffect(() => {
        dispatch(authenticate(token ? true : false));
    }, [location.pathname, token, dispatch]);

    return <>{children}</>;
};

export default AuthCheck;
