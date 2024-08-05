const buildOptions = (data, isAdmin = false) => {
    const options = {};

    if (data) {
        options.body = JSON.stringify(data);
        options.headers = {
            'content-type': 'application/json'
        };
    }

    const token = localStorage.getItem('accessToken');

    if (token) {
        options.headers = {
            ...options.headers,
            'X-Authorization': token
        };
    }

    if (isAdmin) {
        options.headers = {
            ...options.headers,
            'X-Admin': 'true'
        };
    }

    return options;
};

const request = async (method, url, data) => {
    try {
        const options = buildOptions(data);
        console.log(`Request Method: ${method}`);
        console.log(`Request URL: ${url}`);
        console.log(`Request Options:`, options);

        const response = await fetch(url, {
            ...options,
            method,
        });

        if (response.status === 204) {
            return {};
        }

        const result = await response.json();
        console.log(`Response Status: ${response.status}`);
        console.log(`Response Data:`, result);

        if (!response.ok) {
            throw result;
        } 

        return result;
    } catch (error) {
        console.error('Error making request:', error);
        throw error;
    }
};

export const get = request.bind(null, 'GET');
export const post = request.bind(null, 'POST');
export const put = request.bind(null, 'PUT');
export const remove = request.bind(null, 'DELETE');
export const patch = request.bind(null, 'PATCH');