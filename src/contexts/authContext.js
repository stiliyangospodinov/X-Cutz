import { createContext } from "react";

const AuthContext = createContext();
AuthContext.displayName = "AuthContext";

const ADMIN_ID = '60f0cf0b-34b0-4abd-9769-8c42f830dffc';

const isAdmin = (userId) => {
    return userId === ADMIN_ID;
};

export { isAdmin };
export default AuthContext;