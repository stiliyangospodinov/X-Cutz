import { Route, Routes } from "react-router-dom";
import Header from "./components/Core/Header";
import Footer from "./components/Core/Footer";
import Home from "./components/Home/Home";
import Barber from "./components/Barber/Barber";
import BarberDetails from "./components/BarberDetails/BarberDetails";
import About from "./components/About/About";
import Price from "./components/Price/Price";
import Service from "./components/Service/Service";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Gallery from "./components/Gallery/Gallery";
import CreateBarber from "./components/CreateBarber/CreateBarber";
import EditBarber from "./components/EditBarber/EditBarber";
import DeleteBarber from "./components/DeleteBarber/DeleteBarber";
import Logout from "./components/Logout/Logout";
import Profile from "./components/Profile/Profile";
import { AuthProvider } from "./contexts/authContext";
import AuthGuard from "./guards/AuthGuard";
import GuestGuard from "./guards/GuestGuard";
import AdminGuard from "./guards/AdminGuard";
import NotFound from "./components/404/NotFound";
import CreateNews from "./components/CreateNews/CreateNews";
import Products from "./components/Products/Products";
import AboutCard from "./components/Cards/AboutCard.jsx/AboutCard";
import ProductDetails from "./components/ProductDetails/ProductDetails";

function App() {

    return (
        <AuthProvider>
            <>
                <Header/>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/prices" element={<Price />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:id" element={<ProductDetails />} />
                    <Route path="/team" element={<Barber />} />
                    <Route path="/barber/:id" element={<BarberDetails />} />
                    <Route path="/service" element={<Service />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route element={<AuthGuard />}>
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/profile" element={<Profile />} />
                    </Route>
                    <Route element={<GuestGuard />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    </Route>
                    <Route element={<AdminGuard />} >
                    <Route path="/create" element={<CreateBarber />} />
                    <Route path="/create-news" element={<CreateNews />} />
                    <Route path="/edit/:id" element={<EditBarber />} />
                    <Route path="/delete/:id" element={<DeleteBarber />} />
                   </Route>
                   <Route path="*" element={<NotFound/>} />
                </Routes>
                <Footer/>
            </>
        </AuthProvider>
    );
}

export default App;
