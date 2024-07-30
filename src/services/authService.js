import * as request from "../lib/request";

const baseUrl = "http://localhost:3030/users";
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

    export const getProfileById = async (id) => {
        try {
            const result = await request.get(`${baseUrl}/${id}`);
            return result;
        } catch (error) {
            console.log('Error fetching barber:', error);
        }
    };
    

export const updateProfile = async (id, profileData) => {
        try {
            const result = await request.put(`${baseUrl}/${id}`, profileData);
            return result;
        } catch (error) {
            console.error('Error updating barber:', error);
            throw error;
        }
    };
    
    
export const logout = () => request.get(`${baseUrl}/logout`);