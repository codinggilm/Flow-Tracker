const initialState = {
    tickets: [],
    ticketHistory: [],
    ticket: {},
    ticketId: '' 

};

const ticketsReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'FETCH_TICKETS':
            return {...state,
                tickets: action.payload
            };

        case 'FETCH_TICKET':
            return {...state,
                ticket: action.payload
            };

        case 'CREATE_TICKET':
            return {
                ...state 
            };

        case 'SAVE_TICKET_ID':
            return {...state, 
                ticketId: action.payload
            };

        case 'EDIT_TICKET':
            return  {
                ...state 
            };

        case 'FETCH_TICKET_HISTORY':
            return  {
                ...state,
                ticketHistory:action.payload
            };

        case 'SAVE_TICKET_HISTORY':
            return  {
                ...state 
            };
            
        case 'DELETE_TICKET':
            return  {
                ...state 
            };

        default: return state;
    }
}

export default ticketsReducer;