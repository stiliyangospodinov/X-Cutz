import * as request from "../lib/request";

const baseUrl = "https://x-cutz.onrender.com/users";
export const loginUser = async (email, password) => {
    const result = await request.post(`${baseUrl}/login`, {
        email,
        password,
    });

    return result;
};

export const registerUser = async (email, password, username) =>  request.post(`${baseUrl}/register`, {
        email,
        password,
        username,
        
    });


    export const logout = () => request.get(`${baseUrl}/logout`);