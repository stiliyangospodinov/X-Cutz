import * as request  from "../lib/request";

const baseUrl = "https://x-cutz.onrender.com/data";

export const getAllBarbers = async () => {
    try {
        const result = await request.get(`${baseUrl}/barbers`);

        return Object.values(result);
    } catch (error) {
        console.log('Error fetching data:', error);
    }
}

    export const getAllPrices = async () => {
        try {
            const result = await request.get(`${baseUrl}/prices`);

            return Object.values(result);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    
}
    export const getAllProducts = async () => {
        try {
            const result = await request.get(`${baseUrl}/products`);

            return Object.values(result);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    
}
export const getProductById = async (id) => {
    try {
        const result = await request.get(`${baseUrl}/products/${id}`);
        return result;
    } catch (error) {
        console.log('Error fetching product', error);
    }
};

    export const getAllPictures = async () => {
        try {
            const result = await request.get(`${baseUrl}/gallery`);

            return Object.values(result);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    
}

    export const getAllServices = async () => {
        try {
            const result = await request.get(`${baseUrl}/services`);

            return Object.values(result);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    
}

export const createBarber = async (barberData) => {
    try {
        const data = await request.post(`${baseUrl}/barbers`, barberData);
        return data;
    } catch (error) {
        console.error('Error creating barber:', error);
        throw error;
    }
};


export const getBarberById = async (id) => {
    try {
        const result = await request.get(`${baseUrl}/barbers/${id}`);
        return result;
    } catch (error) {
        console.log('Error fetching barber:', error);
    }
};

export const updateBarber = async (id, barberData) => {
    try {
        const result = await request.put(`${baseUrl}/barbers/${id}`, barberData);
        return result;
    } catch (error) {
        console.error('Error updating barber:', error);
        throw error;
    }
};
export const deleteBarber = async (id) => {
    try {
        const result = await request.remove(`${baseUrl}/barbers/${id}`);
        return result;
    } catch (error) {
        console.error('Error deleting barber:', error);
        throw error;
    }
};
