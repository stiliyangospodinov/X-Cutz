
import * as request from '../lib/request';

const baseUrl = "http://localhost:3030/users";

export const getProfile = async () => {
    try {
        console.log('Fetching profile data for the current user');
        const result = await request.get(`${baseUrl}/me`);
        console.log('Profile data from server:', result);
        if (!result || Object.keys(result).length === 0) {
            throw new Error('No profile data found');
        }
        return result;
    } catch (error) {
        console.error('Error fetching profile:', error);
        throw error;
    }
};

export const updateProfile = async (profile, isAdmin = false) => {
    try {
        const response = await request.put(`http://localhost:3030/users/${profile._id}`, profile, isAdmin);
        
        if (Object.keys(response).length === 0) {
            console.log('Profile update was successful, but no data returned.');
        } else {
            console.log('Profile update response:', response);
        }

        return response;
    } catch (error) {
        console.error('Error updating profile:', error);
        throw error;
    }
};