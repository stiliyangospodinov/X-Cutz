const Paths = {
    Home: "/",
    About: "/about",
    Prices: "/prices",
    Products: "/products",
    ProductDetails: (id = ":id") => `/products/${id}`,
    Team: "/team",
    BarberDetails: (id = ":id") => `/barber/${id}`,
    Service: "/service",
    Gallery: "/gallery",
    Cart: "/cart",
    Logout: "/logout",
    Profile: "/profile",
    Payment: "/payment",
    Login: "/login",
    Register: "/register",
    CreateBarber: "/create",
    CreateNews: "/create-news",
    EditBarber: (id = ":id") => `/edit/${id}`,
    DeleteBarber: (id = ":id") => `/delete/${id}`,
    NotFound: "*",
  };
  
  export default Paths;