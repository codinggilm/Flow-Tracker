const initialState = {
    // username: '',
    // password: '',
    // email: '',
    users: [],
    user: {},
    allProjectUsers: [], 
    projectUsers:[],
    refreshPage: false
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
            return {
                ...state,
                refreshPage: true
            };

        case 'EDIT_USER_ROLE': 
            return {
                ...state,
                refreshPage: true
            };
        
        case 'RESET_REFRESH': 
            return {
                ...state,
                refreshPage: false
            };

        default:
            return state;

    }
}

export default usersReducer; 