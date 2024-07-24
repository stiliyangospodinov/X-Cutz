import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import * as authService from "./services/authService";
import AuthContext, {isAdmin}from "./contexts/authContext";
import Paths from "./paths";
import Header from "./components/Core/Header";
import Footer from "./components/Core/Footer";
import VideoModal from "./components/Modals/VideoModal";
import Home from "./components/Home";
import Barber from "./components/Barber";
import BarberDetails from "./components/BarberDetails";
import About from "./components/About";
import Price from "./components/Price";
import Service from "./components/Service";
import Login from "./components/Login";
import Register from "./components/Register";
import Gallery from "./components/Gallery";
import CreateBarber from "./components/CreateBarber";
import EditBarber from "./components/EditBarber";
import DeleteBarber from "./components/DeleteBarber";
import Logout from "./components/Logout";
import Profile from "./components/Profile";


function App() {
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
            <>
                <Header/>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/prices" element={<Price />} />
                    <Route path="/team" element={<Barber />} />
                    <Route path="/barber/:id" element={<BarberDetails />} />
                    <Route path="/service" element={<Service />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/create" element={<CreateBarber />} />
                    <Route path="/edit/:id" element={<EditBarber />} />
                    <Route path="/delete/:id" element={<DeleteBarber />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
                <VideoModal/>
                <Footer/>
            </>
        </AuthContext.Provider>
    );
}

export default App;
