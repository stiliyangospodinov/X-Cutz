import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/authContext";
import * as authService from "../services/authService";
import Paths from "../paths";


export default function Logout() {
    const navigate = useNavigate();
    const { logoutHandler } = useContext(AuthContext);

    useEffect(() => {
        authService.logout()
            .then(() => {
                logoutHandler();
                navigate(Paths.Home);
            })
            .catch(() => {
                logoutHandler();
                navigate(Paths.Home)
            });
    }, []);

    return null;
}