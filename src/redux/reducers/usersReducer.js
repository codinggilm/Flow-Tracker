const initialState = {
    // username: '',
    // password: '',
    // email: '',
    users: [],
    user: {},
    allProjectUsers: [], 
    projectUsers:[]
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

        case 'FETCH_ALL_PROJECT_USERS':
            return {...state,
                allProjectUsers: action.payload
            };
        case 'FETCH_PROJECT_USERS':
            return {...state,
                projectUsers: action.payload
            };
        case 'ASSIGN_PROJECT':
            return {...state
                // user: action.payload
            };

        // case 'CREATE_USER':
        //     return action.payload;

        // case 'SAVE_USER_ID':
        //     return {...state, 
        //         projectId: action.payload
        //     };

        case 'EDIT_USER_ROLE': 
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