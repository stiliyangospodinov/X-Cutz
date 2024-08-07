export const newsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_NEWS':
            return action.payload;
        case 'REMOVE_LAST_NEWS':
            return state.slice(0, -1);
        default:
            return state;
    }
};