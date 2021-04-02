const initialState = {
    totalEntries: null
    // project: {},
    // projectId: ''
};

const paginationReducer = (state=initialState, action) => {
// const paginationReducer = (initialState=null, action) => {
    switch (action.type) {
        case 'SAVE_TOTAL_ENTRIES':
            return {...state,
                totalEntries: action.payload
            }; 

        // case 'FETCH_PROJECT':
        //     return {...state,
        //         project: action.payload
        //     };

        // case 'CREATE_PROJECT':
        //     return {
        //         ...state
        //     };

        // case 'SAVE_TOTAL_ENTRIES':
        //     return {...state, 
        //         projectId: action.payload
        //     };

        
        default:
            return state;
    

    }
}

export default paginationReducer;