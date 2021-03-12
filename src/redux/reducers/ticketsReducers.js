const initialState = {
    tickets: [],
    ticket: {},
    ticketId: ''
};

export default (state=initialState, action) => {
    switch (action.type) {
        case 'FETCH_TICKETS':
            return {...state,
                tickets: action.payload
            };
            
        case 'FETCH_TICKET':
            // console.log('reducer: ok received the data. State was updated')
            return {...state,
                ticket: action.payload
            };

        case 'CREATE_TICKET':
            return action.payload;

        case 'SAVE_TICKET_ID':
            return {...state, 
                ticketId: action.payload};

        case 'EDIT_TICKET':
            // console.log(action.payload)
            return action.payload;
            
        case 'DELETE_TICKET':
            return action.payload;

        default:
            return state;

    }
}