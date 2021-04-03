const initialState = {
    totalProjectUsers: null,
    totalProjectTickets: null,
    receivedProps: {}

};

const paginationReducer = (state=initialState, action) => {
// const paginationReducer = (initialState=null, action) => {
    switch (action.type) {
        case 'SAVE_TOTAL_PROJECT_USERS':
            return {...state,
                totalProjectUsers: action.payload
            }; 
        case 'SAVE_TOTAL_PROJECT_TICKETS':
            return {...state,
                totalProjectTickets: action.payload
            }; 
        case 'SEND_PROPS_TO_PARENT':
            return {...state,
                receivedProps: action.payload
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