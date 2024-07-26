import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as authService from "../services/authService";
import Paths from "../paths";

const AuthContext = createContext();
AuthContext.displayName = "AuthContext";
const ADMIN_ID = '60f0cf0b-34b0-4abd-9769-8c42f830dffc';

const isAdmin = (userId) => {
    return userId === ADMIN_ID;
};

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [auth, setAuth] = useState(() => {
        const accessToken = localStorage.getItem('accessToken');
        const userId = localStorage.getItem('userId');
        
        return { accessToken, userId, isAdmin: isAdmin(userId) };
    });

    const loginSubmitHandler = async (values) => {
        console.log("Submitting login with values:", values);
        try {
            const result = await authService.loginUser(values.email, values.password);
            console.log("Login successful:", result);
            setAuth({ ...result, isAdmin: isAdmin(result._id) });
            localStorage.setItem('accessToken', result.accessToken);
            localStorage.setItem('userId', result._id);
            navigate(Paths.Home);
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const registerSubmitHandler = async (values) => {
        console.log("Submitting register with values:", values);
        try {
            const result = await authService.registerUser(values.email, values.password, values.username);
            console.log("Register successful:", result);
            setAuth(result);
            navigate(Paths.Home);
        } catch (error) {
            console.error("Register failed:", error);
        }
    };

    const logoutHandler = () => {
        setAuth({});
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userId');
        navigate(Paths.Home);
    }

    const values = {
        registerSubmitHandler,
        loginSubmitHandler,
        logoutHandler,
        username: auth.username,
        email: auth.email,
        isAuthenticated: !!auth.accessToken,
        isAdmin: auth.isAdmin,
    };

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

export { isAdmin };
export default AuthContext;
