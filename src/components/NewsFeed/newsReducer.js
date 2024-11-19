export const newsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_NEWS':
            return action.payload.sort((a,b) => new Date(b.date) - new Date(a.date));
        case 'REMOVE_OLDEST_NEWS':
            return state.slice(0, -1); 
        default:
            return state;
    }
};
