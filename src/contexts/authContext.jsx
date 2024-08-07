import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as authService from "../services/authService";
import Paths from "../paths";

const AuthContext = createContext();
AuthContext.displayName = "AuthContext";
const ADMIN_ID = '60f0cf0b-34b0-4abd-9769-8c42f830dffc';

const isAdmin = (userId) => userId === ADMIN_ID;

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [auth, setAuth] = useState({
        accessToken: null,
        username: null,
        isAdmin: false
    });
    const [authError, setAuthError] = useState('');

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const username = localStorage.getItem('username');

        if (accessToken && username) {
            setAuth({
                accessToken,
                username,
                isAdmin: isAdmin(localStorage.getItem('userId')) 
            });
        }
    }, []);

    const clearAuth = () => {
        setAuth({
            accessToken: null,
            username: null,
            isAdmin: false
        });
        localStorage.removeItem('accessToken');
        localStorage.removeItem('username');
    };

    const loginSubmitHandler = async (values) => {
        try {
            const result = await authService.loginUser(values.email, values.password);
            setAuth({
                accessToken: result.accessToken,
                username: result.username,
                isAdmin: isAdmin(result._id)
            });
            localStorage.setItem('accessToken', result.accessToken);
            localStorage.setItem('username', result.username);
            localStorage.setItem('userId', result._id); // Still needed for isAdmin check
            setAuthError(null); 
            navigate(Paths.Home);
        } catch (error) {
            setAuthError(error.message || "Login failed");
        }
    };

    const registerSubmitHandler = async (values) => {
        try {
            const result = await authService.registerUser(values.email, values.password, values.username);
            setAuth({
                accessToken: result.accessToken,
                username: result.username,
                isAdmin: isAdmin(result._id)
            });
            localStorage.setItem('accessToken', result.accessToken);
            localStorage.setItem('username', result.username);
            localStorage.setItem('userId', result._id); // Still needed for isAdmin check
            setAuthError(null); 
            navigate(Paths.Home);
        } catch (error) {
            setAuthError(error.message || "A user with the same email already exists");
        }
    };

    const logoutHandler = () => {
        clearAuth();
        navigate(Paths.Home);
    };

    const values = {
        registerSubmitHandler,
        loginSubmitHandler,
        logoutHandler,
        username: auth.username,
        isAuthenticated: !!auth.accessToken,
        isAdmin: auth.isAdmin,
        authError,
    };

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
};

export { isAdmin };
export default AuthContext;
