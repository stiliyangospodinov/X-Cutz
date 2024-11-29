import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as authService from "../services/authService";
import Paths from "../paths";
import { saveAuthData, clearAuthData, getAuthData } from "../utils/authUtils";
import { useDispatch } from "react-redux";
import { clearCart } from "../slices/cartSlice";

const AuthContext = createContext();
AuthContext.displayName = "AuthContext";

const ADMIN_ID = '60f0cf0b-34b0-4abd-9769-8c42f830dffc';

const isAdmin = (userId) => userId === ADMIN_ID;

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [auth, setAuth] = useState({
        accessToken: null,
        username: null,
        isAdmin: false
    });
    const [authError, setAuthError] = useState('');

    useEffect(() => {
        const savedAuthData = getAuthData();
        if (savedAuthData) {
            setAuth({
                ...savedAuthData,
                isAdmin: isAdmin(savedAuthData.userId),
            });
        }
    }, []);

    const handleAuthSuccess = (result) => {
        const authData = {
            accessToken: result.accessToken,
            username: result.username,
            userId: result._id,
            isAdmin: isAdmin(result._id),
        };
        setAuth(authData);
        saveAuthData(authData); 
        setAuthError(null);
        navigate(Paths.Home);
    };

    const loginSubmitHandler = async (values) => {
        try {
            const result = await authService.loginUser(values.email, values.password);
            handleAuthSuccess(result);
        } catch (error) {
            setAuthError(error.message || "Login failed. Please try again.");
        }
    };

    const registerSubmitHandler = async (values) => {
        try {
            const result = await authService.registerUser(
                values.email,
                values.password,
                values.username
            );
            handleAuthSuccess(result);
        } catch (error) {
            setAuthError(error.message || "A user with the same email already exists. Please try again.");
        }
    };

    const logoutHandler = () => {
        clearAuthData();
        setAuth({
            accessToken: null,
            username: null,
            isAdmin: false,
        });

        dispatch(clearCart());

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

export default AuthContext;
