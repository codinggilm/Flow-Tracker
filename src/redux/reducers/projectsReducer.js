export default (state=[], action) => {
    switch (action.type) {
        case 'FETCH_PROJECTS':
            return action.payload;

        case 'ADD_PROJECT':
            return action.payload;
        
        default:
            return state;

    }
}