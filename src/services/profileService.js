import * as request from '../lib/request';

const baseUrl = "http://localhost:3030/users";

export const getProfileById = async (id) => {
    try {
        const result = await request.get(`${baseUrl}/${id}`);
        return result;
    } catch (error) {
        console.log('Error fetching profile:', error);
    }
};

export const updateProfile = async (id, profileData) => {
    try {
        const result = await request.put(`${baseUrl}/${id}`, profileData);
        return result;
    } catch (error) {
        console.error('Error updating profile:', error);
        throw error;
    }
};
