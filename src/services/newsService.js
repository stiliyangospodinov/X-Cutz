import * as request  from "../lib/request";

const baseUrl = "http://localhost:3030/data";

export const getAllNews = async () => {
    try {
        const result = await request.get(`${baseUrl}/news`);

        return Object.values(result);
    } catch (error) {
        console.log('Error fetching data:', error);
    }
}
export const createNews = async (newsData) => {
    try {
        const data = await request.post(`${baseUrl}/news`, newsData);
        return data;
    } catch (error) {
        console.error('Error creating barber:', error);
        throw error;
    }
};

export const deleteNews = async (id) => {
    try {
        const response = await request.remove(`${baseUrl}/news/${id}`);
        if (response) {
            return response;
        } else {
            throw new Error('Failed to delete news');
        }
    } catch (error) {
        console.error('Error deleting news:', error);
        throw error;
    }
};