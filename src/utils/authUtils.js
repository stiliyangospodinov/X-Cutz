export const saveAuthData = ({ accessToken, username, userId }) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("username", username);
    localStorage.setItem("userId", userId);
};

export const clearAuthData = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
};

export const getAuthData = () => {
    const accessToken = localStorage.getItem("accessToken");
    const username = localStorage.getItem("username");
    const userId = localStorage.getItem("userId");

    if (!accessToken || !username || !userId) return null;

    return { accessToken, username, userId };
};