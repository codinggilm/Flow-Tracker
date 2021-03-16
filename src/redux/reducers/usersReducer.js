const initialState = {
    // username: '',
    // password: '',
    // email: '',
    users: [],
    user: {}
    // role: '',
    // projectId: '',
    // ticketId: ''
};

const usersReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'FETCH_USERS':
            return {...state,
                users: action.payload
            }; 

        case 'FETCH_USER':
            return {...state,
                user: action.payload
            };

        // case 'CREATE_USER':
        //     return action.payload;

        // case 'SAVE_USER_ID':
        //     return {...state, 
        //         projectId: action.payload
        //     };

        case 'EDIT_USER':
            return {
                ...state
            };
            
        // case 'DELETE_USER':
        //     return {
        //         ...state
        //     };
        default:
            return state;

    }
}

export default usersReducer; 