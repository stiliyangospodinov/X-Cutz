import * as request from '../lib/request';

const baseUrl = 'https://x-cutz.onrender.com/data/comments';


export const getAll = async (barberId) => {
    const query = new URLSearchParams({
        where: `barberId="${barberId}"`,
        load: `owner=_ownerId:users`,
    });

    const result = await request.get(`${baseUrl}?${query}`);
    return result;
};
export const create = async (barberId, text,username) => {
    const newComment = await request.post(baseUrl, {
        barberId,
        text,
        username
    });

    return newComment;
};
export const remove = async (commentId) => {
    await request.remove(`${baseUrl}/${commentId}`);
};