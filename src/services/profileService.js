
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
